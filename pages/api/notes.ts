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
      const notes = await Note.find({
        user: "61b868f36902dae672484bd0",
        "notes.video": "brala",
      });
      res.status(200).json({ success: true, data: notes });
    } catch (err) {}
  }

  async function addNotes(req: NextApiRequest, res: NextApiResponse) {
    try {
      const note = await Note.create({
        user: "61b89dbc3745f474c03b3d5c",
        notes: [{ video: "brala", note: "short String" }],
      });

      res.status(201).json({ success: true, data: note });
    } catch (error) {
      console.log("err", error);
      res.status(400).json({ success: false, errMsg: error });
    }
  }
}
