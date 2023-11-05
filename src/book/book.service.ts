import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.model';
import { Repository } from 'typeorm';
import { BookDto } from './book.dto';

@Injectable()
export class BookService {
  constructor(@InjectRepository(Book) private bookRepository: Repository<Book>) {
  }
  createBook(book: BookDto): Promise<Book>{
    return this.bookRepository.save(book);
  }
  findAll(): Promise<Book[]>{
    return this.bookRepository.find();
  }
  findOne(id: string): Promise<Book> {
    return this.bookRepository.findOneBy({id: id});
  }
}
