import exp from "constants";
import { Dispatch, SetStateAction } from "react";

export interface IVideoArr {
  videoId: string;
  channelId: string;
  channelTitle: string;
  description: string;
  publishTime: string;
  thumbnail: string;
  title: string;
}

export interface IVideoContext {
  videos: IVideoArr[];
}

export interface IVideoCard {
  imageUrl: string;
  imageAlt: string;
  title: string;
  channel: string;
  id: string;
}

export interface IAuthUser {
  name: string;
  email: string;
  photo: string;
  uid: string;
  _id: string;
}

export interface IRegisterUser {
  name: string;
  email: string;
  photo: string;
  uid: string;
}

export interface IAuth {
  user: IAuthUser;
  setUser: Dispatch<SetStateAction<IAuthUser>>;
}

export interface INotesData {
  created_at: string;
  notes: INotes;
  user: string;
  _v: number;
  _id: string;
}

export interface INotes {
  video: string;
  note: string;
  timestamp: number;
  created_at: string;
}
