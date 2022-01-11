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
}

export interface IAuth {
  user: IAuthUser;
  setUser: Dispatch<SetStateAction<IAuthUser>>;
}
