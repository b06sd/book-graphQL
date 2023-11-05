import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.model';
import { Repository } from 'typeorm';
import { BookDto } from './book.dto';

@Injectable()
export class BookService {
  constructor(@InjectRepository(Book) private bookRepository: Repository<Book>) {
  }

  createBook(book: BookDto): Promise<Book> {
    return this.bookRepository.save(book);
  }

  findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  findOne(id: string): Promise<Book> {
    return this.bookRepository.findOneBy({ id: id });
  }

  updateBook(id: string, updateBookDto: BookDto): Promise<Book> {
    const book = this.findOne(id);
    if (!book) {
      throw new Error('Book not found');
    }
    Object.assign(book, updateBookDto);
    try {
      const updatedBook = this.bookRepository.save({ id: id, book });
      return updatedBook;
    } catch (error) {
      throw new Error('Error updating the book');
    }
  }

  deleteBook(id: string) {
    const result = this.bookRepository.delete(id);
    return { message: 'Book successfully deleted' };
  }
}
