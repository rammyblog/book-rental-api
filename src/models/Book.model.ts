import mongoose from 'mongoose';
import { GenreDocument } from './Genre.model';

export interface HookNextFunction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (error?: Error): any;
}

export interface BookDocument extends mongoose.Document {
  isbn: string;
  title: string;
  genre: GenreDocument['_id'];
  description: string;
  image: string;
  released: Date;
  available: Boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BookSchema = new mongoose.Schema(
  {
    isbn: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    genre: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre' },
    description: { type: String, required: true },
    image: { type: String, required: true },
    released: { type: Date, required: true },
    available: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model<BookDocument>('Book', BookSchema);

export default Book;
