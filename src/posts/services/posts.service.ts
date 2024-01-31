import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from '../schemas/postsSchema';
import { Model } from 'mongoose';
import { CreatePostDto } from '../dto/create_post.dto';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  /**
   *
   * @param createPostDto
   * @returns Promise<Post>
   */
  async createPost(
    createPostDto: CreatePostDto,
    req: Request & { user: { name: string } },
  ): Promise<Post> {
    try {
      const createdPost = this.postModel.create({
        ...createPostDto,
        author: req.user.name,
      });

      return createdPost;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
