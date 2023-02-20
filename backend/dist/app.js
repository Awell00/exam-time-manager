"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const helmet_1 = __importDefault(require("helmet"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
// Create express app
const app = (0, express_1.default)();
// Create http server
const httpServer = http_1.default.createServer(app);
// URI's that are allowed to make requests
const uri = "http://localhost:5173";
// Options for cors middleware
const corsOptions = {
    origin: uri,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
// Use cors middleware with the specified options
app.use((0, cors_1.default)(corsOptions));
// Use express.json() to parse json requests
app.use(express_1.default.json());
// Use helmet to secure the app with various HTTP headers
app.use((0, helmet_1.default)({
    contentSecurityPolicy: false,
}));
// Create the socket.io instance
// @ts-ignore
const io = (0, socket_io_1.default)(httpServer, {
    path: '/socket.io',
    cors: {
        origin: uri,
        methods: ["GET", "POST"],
        credentials: true
    }
});
// Array to store connected clients
const clients = [];
// Event listener for new connections
io.on('connection', (client) => {
    console.log(`Client connected ${client.id}`);
    // Push the new client to the array of connected clients
    clients.push(client);
    // Event listener for disconnections
    client.on('disconnect', () => {
        // Remove the disconnected client from the array of connected clients
        clients.splice(clients.indexOf(client), 1);
        console.log(`Client disconnected ${client.id}`);
    });
    // Event listener for "clock value DS" messages
    client.on('clock value DS', (value) => {
        console.log(`CLOCK : ${value}`);
        // Emit the received "clock value DS" to all connected clients
        io.emit("clock value DS", value);
    });
    // Event listener for "clock value PERM" messages
    client.on('clock value PERM', (clock) => {
        console.log(`CLOCK : ${clock}`);
        // Emit the received "clock value PERM" to all connected clients
        io.emit("clock value PERM", clock);
    });
    // Event listener for "delete div DS" messages
    client.on('delete div DS', (valueId) => {
        // Emit the received "delete div DS" to all connected clients
        io.emit('delete div DS', valueId);
    });
    // Event listener for "delete div PERM" messages
    client.on('delete div PERM', (valueId) => {
        // Emit the received "delete div PERM" to all connected clients
        io.emit('delete div PERM', valueId);
    });
});
// Import the dotenv library to load environment variables
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, ".env") });
// Define an object `pros` with properties `PORT` and `MONGO_URI`, 
// which will store the value of the environment variables of the same name
const pros = {
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    MONGO_URI: process.env.MONGO_URI
};
// Set strictQuery to false in mongoose
mongoose_1.default.set("strictQuery", false);
// Destructure the properties of `pros` into separate constants `MONGO` and `PORT`
const MONGO = pros.MONGO_URI;
const PORT = pros.PORT;
// Function to connect to MongoDB
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect to MongoDB using the connection string in `MONGO`
            yield mongoose_1.default.connect(MONGO);
            console.log("connect to mongodb");
        }
        catch (error) {
            // Log the error if the connection fails
            console.log(error);
        }
    });
}
// Call the `connect` function to initiate the MongoDB connection
connect();
// Call the `routes` function with `app` as an argument
(0, routes_1.default)(app);
// Start the HTTP server and listen on the `PORT`
httpServer.listen(PORT, () => {
    console.log(`App listening at ${pros.PORT}`);
});
//# sourceMappingURL=app.js.map