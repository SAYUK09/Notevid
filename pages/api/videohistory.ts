import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../api-lib/mongodb";
import VideoHistory from "../../api-lib/models/videoHistory.model";
import axios from "axios";

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
      const videoHistoryArr = await VideoHistory.find({
        user: userId,
      });

      let finalUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id&key=${process.env.NEXT_PUBLIC_YOUTUBE_API}`;

      videoHistoryArr.map(
        (item) => (finalUrl = finalUrl + `&id=${item.videoId}`)
      );

      try {
        const data = await axios.get(finalUrl);

        res.status(201).json({ success: true, data: data.data.items });
      } catch (err) {
        console.log("err", err);
        res.status(500).json({ success: false, data: "Something went wrong" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, data: "Something went wrong" });
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
        res.status(200).json({ success: true, data: "Already In History" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, data: "Something went wrong" });
    }
  }
}
