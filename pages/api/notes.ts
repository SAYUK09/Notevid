import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../api-lib/mongodb";
import Note from "../../api-lib/models/notes.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  switch (req.method) {
    case "GET":
      return getNotes(req, res);

    case "POST":
      return addNotes(req, res);

    default:
      res.status(400).json({ success: false });
      break;
  }

  async function getNotes(req: NextApiRequest, res: NextApiResponse) {
    try {
      const {
        query: { userId, videoId },
      } = req;

      console.log(userId, videoId);

      const notes = await Note.find({
        user: userId,
        "notes.video": videoId,
      });
      res.status(200).json({ success: true, data: notes });
    } catch (err) {
      console.log(err);
    }
  }

  async function addNotes(req: NextApiRequest, res: NextApiResponse) {
    try {
      const note = await Note.create({
        user: req.body.userId,
        notes: {
          video: req.body.videoId,
          note: req.body.note,
          timestamp: req.body.timestamp,
        },
      });

      res.status(201).json({ success: true, data: note });
    } catch (error) {
      console.log("err", error);
      res.status(400).json({ success: false, errMsg: error });
    }
  }
}
