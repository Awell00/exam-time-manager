import { Schema, model, Document, Model } from "mongoose"

export interface Clock extends Document {
    classroom: string,
    early: string,
    subject: string,
    extra: string,
    clock: string,
}

const clockModelDS = new Schema({
    classroom: String,
    early: String,
    subject: String,
    extra: String,
    clock: String,
})

const clockModelPERM = new Schema({
    classroom: String,
    early: String,
    subject: String,
    extra: String,
    clock: String,
})

export const ClockModelDS: Model<Clock> = model<Clock>('modelClockDS', clockModelDS)
export const ClockModelPERM: Model<Clock> = model<Clock>('modelClockPERM', clockModelPERM)