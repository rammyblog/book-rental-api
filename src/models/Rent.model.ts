import mongoose from 'mongoose';
import { BookDocument } from './Book.model';
import { UserDocument } from './User.model';

export interface HookNextFunction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (error?: Error): any;
}

export interface BorrowedBook {
  book: BookDocument['_id'];
  date_borrowed: Date;
  date_due: Date;
  returned: boolean;
}

export interface RentDocument extends mongoose.Document {
  user: UserDocument['_id'];
  books: BorrowedBook[];
  createdAt: Date;
  updatedAt: Date;
}

const RentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'User',
    },
    books: [
      {
        book: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Book',
        },
        date_borrowed: {
          type: Date,
          required: true,
        },
        date_due: {
          type: Date,
          required: true,
        },
        returned: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Rent = mongoose.model<RentDocument>('Rent', RentSchema);

export default Rent;
