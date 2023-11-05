import { Inject } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './book.model';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { v4 as uuid } from 'uuid';
import { BookDto } from './book.dto';

@Resolver(of => Book)
export class BookResolver {
  constructor(@Inject(BookService) private bookService: BookService) {
  }

  @Query(returns => Book)
  async book(@Args('id') id: string): Promise<Book> {
    return await this.bookService.findOne(id);
  }

  @Query(returns => [Book])
  async books(): Promise<Book[]> {
    return await this.bookService.findAll();
  }

  @Mutation(returns => Book)
  async createBook(@Args('name') name: string, @Args('description') description: string): Promise<Book> {
    return await this.bookService.createBook({ name, description });
  }

  @Mutation(returns => Book)
  async updateBook(@Args('id') id: string, @Args('name') name: string, @Args('description') description: string): Promise<Book> {
    return await this.bookService.updateBook(id, { name, description });
  }

  @Mutation(returns => String)
  async deleteBook(@Args('id') id: string): Promise<String> {
    return await this.bookService.deleteBook(id);
  }
}