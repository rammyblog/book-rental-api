import { Request, Response } from 'express';
import {
  rentBookSchemaInput,
  UpdateRentBookInput,
} from '../schema/rent.schema';
import {
  getBorrowedBooks,
  rentBookService,
  updateRentService,
} from '../service/rent.service';

export const rentBookHandler = async (
  req: Request<{}, {}, rentBookSchemaInput['body']>,
  res: Response
) => {
  try {
    const { book_id: bookId, date_borrowed, date_due } = req.body;
    const borrowedBookData = {
      book: bookId,
      date_borrowed,
      date_due,
      returned: false,
    };
    let borrowedBook;
    const userId = res.locals.user._id;
    const userBorrowedBooks = await getBorrowedBooks(
      { user: userId },
      { lean: true }
    );
    // New  user
    if (!userBorrowedBooks) {
      const payload = {
        user: userId,
        books: [borrowedBookData],
      };
      borrowedBook = await rentBookService(payload);
      return res.send(borrowedBook);
    }
    // check if the user has borrowed this book
    userBorrowedBooks.books.map((book) => {
      if (String(book.book) === bookId) {
        return res.send('You borrowed this book already');
      }
    });

    // old user
    userBorrowedBooks.books = [...userBorrowedBooks.books, borrowedBookData];
    const updatedUserRentedBooks = await updateRentService(
      { _id: userBorrowedBooks._id },
      userBorrowedBooks,
      {
        new: true,
      }
    );
    res.send(updatedUserRentedBooks);
  } catch (error: any) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

export const returnBookHandler = async (
  req: Request<UpdateRentBookInput['params']>,
  res: Response
) => {
  try {
    const bookId = req.params.bookId;
    const userId = res.locals.user._id;
    const borrowedBooks = await getBorrowedBooks(
      { user: userId },
      { lean: true }
    );

    if (!borrowedBooks) {
      return res.status(400).send('You have not borrowed any book');
    }

    borrowedBooks.books.map(async (book) => {
      if (String(book.book) === bookId) {
        book.returned = true;
      }
    });
    const updatedUserRentedBooks = await updateRentService(
      { _id: borrowedBooks._id },
      borrowedBooks,
      {
        new: true,
      }
    );
    return res.send(updatedUserRentedBooks);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};

export const getRentedBookHandler = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user._id;
    const borrowedBooks = await getBorrowedBooks(
      { user: userId },
      { lean: true }
    );

    if (!borrowedBooks) {
      return res.status(400).send('You have not borrowed any book');
    }
    return res.send(borrowedBooks);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};
