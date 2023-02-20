import express from "express"
import routes from "./routes"
import helmet from "helmet"
import mongoose from "mongoose"
import path from "path"
import dotenv from "dotenv"
import cors from "cors"
import socket from 'socket.io'
import http from 'http'

// Create express app
const app = express()

// Create http server
const httpServer = http.createServer(app)

// URI's that are allowed to make requests
const uri = [ "http://localhost:5173", "https://clock-stma.vercel.app", "https://5173-awell00-clockstma-289gwolc6pt.ws-eu85.gitpod.io" ]

// Options for cors middleware
const corsOptions = {
  origin: uri,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// Use cors middleware with the specified options
app.use(cors(corsOptions))

// Use express.json() to parse json requests
app.use(express.json());

// Use helmet to secure the app with various HTTP headers
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
)

// Create the socket.io instance
// @ts-ignore
const io = socket(httpServer, {
  path: '/socket.io',
  cors: {
    origin: uri,
    methods: ["GET", "POST"],
    credentials: true
  }
})

// Array to store connected clients
const clients: Array<any> = []

// Event listener for new connections
io.on('connection', (client) => {
  console.log(`Client connected ${client.id}`)
  // Push the new client to the array of connected clients
  clients.push(client)

  // Event listener for disconnections
  client.on('disconnect', () => {
    // Remove the disconnected client from the array of connected clients
    clients.splice(clients.indexOf(client), 1)
    console.log(`Client disconnected ${client.id}`)
  })

  // Event listener for "clock value DS" messages
  client.on('clock value DS', (value) => {
    console.log(`CLOCK : ${value}`)
    // Emit the received "clock value DS" to all connected clients
    io.emit("clock value DS", value)
  })

  // Event listener for "clock value PERM" messages
  client.on('clock value PERM', (clock) => {
    console.log(`CLOCK : ${clock}`)
    // Emit the received "clock value PERM" to all connected clients
    io.emit("clock value PERM", clock)
  })

  // Event listener for "delete div DS" messages
  client.on('delete div DS', (valueId) => {
    // Emit the received "delete div DS" to all connected clients
    io.emit('delete div DS', valueId)
  })

   // Event listener for "delete div PERM" messages
  client.on('delete div PERM', (valueId) => {
    // Emit the received "delete div PERM" to all connected clients
    io.emit('delete div PERM', valueId)
  })
  
})

// Import the dotenv library to load environment variables
dotenv.config({ path: path.resolve(__dirname, ".env") });

// Define an object `pros` with properties `PORT` and `MONGO_URI`, 
// which will store the value of the environment variables of the same name
const pros: {PORT: number | undefined, MONGO_URI: string | undefined} = {
  PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
  MONGO_URI: process.env.MONGO_URI
};

// Set strictQuery to false in mongoose
mongoose.set("strictQuery", false);

// Destructure the properties of `pros` into separate constants `MONGO` and `PORT`
const MONGO: string = pros.MONGO_URI!;
const PORT: number = pros.PORT!;

// Function to connect to MongoDB
async function connect() {
    try {
      // Connect to MongoDB using the connection string in `MONGO`
      await mongoose.connect(MONGO)
      console.log("connect to mongodb")
    } catch (error) {
      // Log the error if the connection fails
      console.log(error)
    }
  }

// Call the `connect` function to initiate the MongoDB connection
connect();

// Call the `routes` function with `app` as an argument
routes(app);

// Start the HTTP server and listen on the `PORT`
httpServer.listen(PORT, () => {
    console.log(`App listening at ${pros.PORT}`)
});