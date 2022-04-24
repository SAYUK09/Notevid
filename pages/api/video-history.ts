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
      console.log("llala");
      return getVideoHistory(req, res);

    case "POST":

    default:
      res.status(400).json({ success: false });
      break;
  }

  async function getVideoHistory(req: NextApiRequest, res: NextApiResponse) {
    try {
      const {
        query: { userId },
      } = req;

      console.log("userId");

      const videoHistory = await Note.find({
        user: userId,
      });

      console.log(videoHistory, "data");
      res.status(200).json({ success: true, data: videoHistory });
    } catch (err) {
      console.log(err);
    }
  }
}


