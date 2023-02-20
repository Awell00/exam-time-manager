"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clock_controller_1 = require("./controllers/clock.controller");
// Function to create routes for our app
function routes(app) {
    app.post('/DS', clock_controller_1.createClockDS);
    app.get('/DS', clock_controller_1.getClockDS);
    app.delete('/DS/:id', clock_controller_1.deleteClockDS);
    app.post('/PERM', clock_controller_1.createClockPERM);
    app.get('/PERM', clock_controller_1.getClockPERM);
    app.delete('/PERM/:id', clock_controller_1.deleteClockPERM);
}
exports.default = routes;
//# sourceMappingURL=routes.js.map