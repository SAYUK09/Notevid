import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../api-lib/mongodb";
import VideoHistory from "../../api-lib/models/videoHistory.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  switch (req.method) {
    case "GET":
      return getVideosFromHistory(req, res);

    case "POST":
      return addVideoToHistory(req, res);

    default:
      res.status(400).json({ success: false });
      break;
  }

  async function getVideosFromHistory(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const {
      query: { userId },
    } = req;

    try {
      console.log(userId);
      const videoHistory = await VideoHistory.find({
        user: userId,
      });

      console.log(videoHistory, "jajaj");
      res.status(201).json({ success: true, data: videoHistory });
    } catch (err) {
      console.log(err);
    }
  }

  async function addVideoToHistory(req: NextApiRequest, res: NextApiResponse) {
    try {
      const videoHistoryArr = await VideoHistory.find({
        user: req.body.userId,
        videoId: req.body.videoId,
      });

      if (!videoHistoryArr.length) {
        const addToHistory = await VideoHistory.create({
          user: req.body.userId,
          videoId: req.body.videoId,
        });
        res.status(201).json({ success: true, data: addToHistory });
      } else {
        res.status(204).json({ success: true, data: "Already in History" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, data: "Something went wrong" });
    }
  }
}
