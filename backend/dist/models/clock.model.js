"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClockModelPERM = exports.ClockModelDS = void 0;
const mongoose_1 = require("mongoose");
const clockModelDS = new mongoose_1.Schema({
    classroom: String,
    early: String,
    subject: String,
    extra: String,
    clock: String,
});
const clockModelPERM = new mongoose_1.Schema({
    classroom: String,
    early: String,
    subject: String,
    extra: String,
    clock: String,
});
exports.ClockModelDS = (0, mongoose_1.model)('modelClockDS', clockModelDS);
exports.ClockModelPERM = (0, mongoose_1.model)('modelClockPERM', clockModelPERM);
//# sourceMappingURL=clock.model.js.map