import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.model';
import { BookResolver } from './book.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  providers: [BookService, BookResolver],
  controllers: [BookController],
})
export class BookModule { }
