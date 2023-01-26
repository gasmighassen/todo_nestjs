import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FeedService } from '../services/feed.service';
import { FeedPost } from '../models/post.interface';
import { Observable } from 'rxjs';

@Controller('feed')
export class FeedController {
  constructor(private feedService: FeedService) {}
  @Post()
  create(@Body() post: FeedPost): Observable<FeedPost> {
    return this.feedService.createPost(post);
  }
  @Get('all')
  find() {
    return this.feedService.getPost();
  }
  @Get('/:id')
  getOne(@Param() params: { id: number }): Promise<FeedPost> {
    return this.feedService.findOne(params.id);
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    await this.feedService.update(id, body);
    return 'post updated';
  }
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.feedService.delete(id);
    return 'post deleted';
  }
}
