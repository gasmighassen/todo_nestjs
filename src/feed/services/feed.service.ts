import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';

import { FeedPostEntity } from '../models/post.entity';
import { FeedPost } from '../models/post.interface';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(FeedPostEntity)
    private readonly feedPostRepository: Repository<FeedPostEntity>,
  ) {}

  createPost(feedPost: FeedPost): Observable<FeedPost> {
    return from(this.feedPostRepository.save(feedPost));
  }
  getPost() {
    return this.feedPostRepository.find({});
  }
  findOne(id: number): Promise<FeedPost> {
    return this.feedPostRepository.findOneBy({ id });
  }
  update(id: string, data: any): Promise<any> {
    return this.feedPostRepository
      .createQueryBuilder()
      .update()
      .set({
        body: data.body,
      })
      .where('id = :id', { id })
      .execute();
  }
  delete(id: string): Promise<any> {
    return this.feedPostRepository
      .createQueryBuilder()
      .delete()
      .from(FeedPostEntity)
      .where('id = :id', { id })
      .execute();
  }
}
