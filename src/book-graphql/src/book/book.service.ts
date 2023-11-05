import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.model';
import { DeepPartial, Repository } from 'typeorm';
import { BookDto } from './book.dto';
import { UpdateBookDto } from './updateBook.dto';

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

  updateBook(id: string, updateBookData: UpdateBookDto): Promise<Book> {
    const book = this.bookRepository.findOne({where:{id}});
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    Object.assign(book, updateBookData);

    try {
      const updatedBook = this.bookRepository.update(id, updateBookData);
      return book;
    } catch (error) {
      throw new Error('Error updating the book');
    }
  }

  deleteBook(id: string) {
    const result = this.bookRepository.delete(id);
    return { message: 'Book successfully deleted' };
  }
}
