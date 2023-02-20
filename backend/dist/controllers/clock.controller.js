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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClockPERM = exports.deleteClockDS = exports.createClockPERM = exports.createClockDS = exports.getClockPERM = exports.getClockDS = void 0;
// import { closeSync } from "fs"
const clock_model_1 = require("../models/clock.model");
const mongoose_1 = require("mongoose");
const getClockDS = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clock = yield clock_model_1.ClockModelDS.find({}).sort({ createdAt: -1 });
    res.status(200).json(clock);
});
exports.getClockDS = getClockDS;
const getClockPERM = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clock = yield clock_model_1.ClockModelPERM.find({}).sort({ createdAt: -1 });
    res.status(200).json(clock);
});
exports.getClockPERM = getClockPERM;
const createClockDS = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { classroom, clock, early, subject, extra } = req.body;
    let emptyFields = [];
    if (!classroom) {
        // @ts-ignore
        emptyFields.push('classroom');
    }
    if (!subject) {
        // @ts-ignore
        emptyFields.push('subject');
    }
    if (!early) {
        // @ts-ignore
        emptyFields.push('early');
    }
    if (!clock) {
        // @ts-ignore
        emptyFields.push('clock');
    }
    if (!extra) {
        // @ts-ignore
        emptyFields.push('extra');
    }
    if (emptyFields.length > 0) {
        return res
            .status(404)
            .json({ error: 'Please fill in all the fields', emptyFields });
    }
    // add to the database
    try {
        const clockValue = yield clock_model_1.ClockModelDS.create({ classroom, subject, early, clock, extra });
        res.status(200).json(clockValue);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(400).json({ error });
        }
    }
});
exports.createClockDS = createClockDS;
const createClockPERM = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { classroom, clock, early, subject, extra } = req.body;
    let emptyFields = [];
    if (!classroom) {
        // @ts-ignore
        emptyFields.push('classroom');
    }
    if (!subject) {
        // @ts-ignore
        emptyFields.push('subject');
    }
    if (!early) {
        // @ts-ignore
        emptyFields.push('early');
    }
    if (!clock) {
        // @ts-ignore
        emptyFields.push('clock');
    }
    if (!extra) {
        // @ts-ignore
        emptyFields.push('extra');
    }
    if (emptyFields.length > 0) {
        return res
            .status(404)
            .json({ error: 'Please fill in all the fields', emptyFields });
    }
    // add to the database
    try {
        const clockValue = yield clock_model_1.ClockModelPERM.create({ classroom, subject, early, clock, extra });
        res.status(200).json(clockValue);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(400).json({ error });
        }
    }
});
exports.createClockPERM = createClockPERM;
const deleteClockDS = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such subject' });
    }
    const clockDS = yield clock_model_1.ClockModelDS.findOneAndDelete({ _id: id });
    if (!clockDS) {
        return res.status(400).json({ error: 'No such subject' });
    }
    res.status(200).json(clockDS);
});
exports.deleteClockDS = deleteClockDS;
const deleteClockPERM = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such subject' });
    }
    const clockPERM = yield clock_model_1.ClockModelPERM.findOneAndDelete({ _id: id });
    if (!clockPERM) {
        return res.status(400).json({ error: 'No such subject' });
    }
    res.status(200).json(clockPERM);
});
exports.deleteClockPERM = deleteClockPERM;
//# sourceMappingURL=clock.controller.js.map