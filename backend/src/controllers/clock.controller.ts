import { Request, Response } from "express"
// import { closeSync } from "fs"
import { ClockModelDS, ClockModelPERM } from "../models/clock.model"
import { Types } from 'mongoose'

export const getClockDS = async (req: Request, res: Response) => {
  const clock = await ClockModelDS.find({}).sort({createdAt: -1})
  res.status(200).json(clock)
}

export const getClockPERM = async (req: Request, res: Response) => {
  const clock = await ClockModelPERM.find({}).sort({createdAt: -1})
  res.status(200).json(clock)
}

export const createClockDS = async (req: Request, res: Response) => {
  const {classroom, clock, early, subject, extra} = req.body

  let emptyFields = []

  if(!classroom) {
    // @ts-ignore
    emptyFields.push('classroom')
  }
  if(!subject) {
    // @ts-ignore
    emptyFields.push('subject')
  }
  if(!early) {
    // @ts-ignore
    emptyFields.push('early')
  }
  if(!clock) {
    // @ts-ignore
    emptyFields.push('clock')
  }
  if(!extra) {
    // @ts-ignore
    emptyFields.push('extra')
  }
  if(emptyFields.length > 0) {
    return res
      .status(404)
      .json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add to the database
  try {
    const clockValue = await ClockModelDS.create({ classroom, subject, early, clock, extra })
    res.status(200).json(clockValue)
  } catch (error: Error | unknown) {
      if (error instanceof Error) {
          res.status(400).json({ error: error.message })
      } else {
          res.status(400).json({ error })
      }
}}

export const createClockPERM = async (req: Request, res: Response) => {
  const {classroom, clock, early, subject, extra} = req.body

  let emptyFields = []

  if(!classroom) {
    // @ts-ignore
    emptyFields.push('classroom')
  }
  if(!subject) {
    // @ts-ignore
    emptyFields.push('subject')
  }
  if(!early) {
    // @ts-ignore
    emptyFields.push('early')
  }
  if(!clock) {
    // @ts-ignore
    emptyFields.push('clock')
  }
  if(!extra) {
    // @ts-ignore
    emptyFields.push('extra')
  }
  if(emptyFields.length > 0) {
    return res
      .status(404)
      .json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add to the database
  try {
    const clockValue = await ClockModelPERM.create({ classroom, subject, early, clock, extra })
    res.status(200).json(clockValue)
  } catch (error: Error | unknown) {
      if (error instanceof Error) {
          res.status(400).json({ error: error.message })
      } else {
          res.status(400).json({ error })
      }
}}

export const deleteClockDS = async (req, res) => {
  const { id } = req.params

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such subject'})
  }

  const clockDS = await ClockModelDS.findOneAndDelete({_id: id})

  if(!clockDS) {
    return res.status(400).json({error: 'No such subject'})
  }

  res.status(200).json(clockDS)
}

export const deleteClockPERM = async (req, res) => {
  const { id } = req.params

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such subject'})
  }

  const clockPERM = await ClockModelPERM.findOneAndDelete({_id: id})

  if(!clockPERM) {
    return res.status(400).json({error: 'No such subject'})
  }

  res.status(200).json(clockPERM)
}