import exp from "constants";
import { Dispatch, SetStateAction } from "react";

export interface IVideo{
  videoId: string;
  channelId: string;
  channelTitle: string;
  description: string;
  publishTime: string;
  thumbnail: string;
  title: string;
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
  setUser: React.Dispatch<React.SetStateAction<IAuthUser>>;
}
export interface INoteData {
  created_at: string;
  notes: INote;
  user: string;
  _v: number;
  _id: string;
}

export interface INote {
  video: string;
  note: string;
  timestamp: number;
  created_at: string;
}

export interface IVideoHistoryItem {
  id: string;
  snippet: any;
  video: string;
}

export interface ISliceState {
  notesArr: INote[];
  status: "Idle" | "Pending" | "Complete";
}

export interface IVideoHistorySliceState {
  videoHistoryArr: IVideoHistoryItem[];
  status: "Idle" | "Pending" | "Complete";
}