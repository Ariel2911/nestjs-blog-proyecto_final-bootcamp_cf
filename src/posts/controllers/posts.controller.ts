import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { CreatePostDto } from '../dto/create_post.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createPost(
    @Body() createPostDto: CreatePostDto,
    @Req() req: Request & { user: { name: string } },
  ): Promise<any> {
    return this.postsService.createPost(createPostDto, req);
  }
}
