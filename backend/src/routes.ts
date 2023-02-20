import { Express } from "express";
import { getClockDS, createClockDS, getClockPERM, createClockPERM, deleteClockDS, deleteClockPERM } from "./controllers/clock.controller";

// Function to create routes for our app
export default function routes(app: Express) {
    app.post('/DS', createClockDS)
    app.get('/DS', getClockDS)
    app.delete('/DS/:id', deleteClockDS)
    app.post('/PERM', createClockPERM)
    app.get('/PERM', getClockPERM)
    app.delete('/PERM/:id', deleteClockPERM)
}

