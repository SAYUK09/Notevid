import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../api-lib/mongodb";
import User from "../../api-lib/models/user.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  switch (req.method) {
    case "GET":
      return getUser(req, res);

    case "POST":
      return addUser(req, res);

    default:
      res.status(400).json({ success: false });
      break;
  }

  async function getUser(req: NextApiRequest, res: NextApiResponse) {
    try {
      const users = await User.find({ uid: req.body.details.uid });
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }

  async function addUser(req: NextApiRequest, res: NextApiResponse) {
    try {
      const userAlreadyExists = await User.findOne({
        uid: req.body.uid,
      });

      if (userAlreadyExists) {
        return res.status(200).json({ success: true, data: userAlreadyExists });
      } else {
        const user = await User.create(req.body);

        res.status(201).json({ success: true, data: user });
      }
    } catch (error) {
      res.status(400).json({ success: false, errMsg: error });
    }
  }
}
