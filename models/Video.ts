import mongoose, { Schema, model, models } from "mongoose";

export interface IVideo {
  title: string;
  description: string;
  url: string;       // ImageKit video URL
  createdAt?: Date;
}

const videoSchema = new Schema<IVideo>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true }, // Only store ImageKit URL
  createdAt: { type: Date, default: Date.now },
});

const Video = models.Video || model<IVideo>("Video", videoSchema);
export default Video;
