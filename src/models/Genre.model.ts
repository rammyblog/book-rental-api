import mongoose from 'mongoose';

export interface HookNextFunction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (error?: Error): any;
}

export interface GenreDocument extends mongoose.Document {
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

const GenreSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const Genre = mongoose.model<GenreDocument>('Genre', GenreSchema);

export default Genre;
