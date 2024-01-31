import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from '../schemas/postsSchema';
import { Model } from 'mongoose';
import { CreatePostDto } from '../dto/create-post.dto';
import { ErrorManager } from 'src/utils/error.manager';
import { UpdatePostDto } from '../dto/update-post.dto';

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

  /**
   *
   * @returns Promise<any>
   */
  async getPosts(): Promise<any> {
    try {
      const posts = this.postModel.find().lean();

      return posts;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async getPost(id: string): Promise<any> {
    try {
      const post = this.postModel.findById(id).lean();

      return post;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async updatePost(id: string, updatePostDto: UpdatePostDto): Promise<any> {
    try {
      const updatedPost = await this.postModel
        .updateOne({ _id: id }, updatePostDto)
        .lean();

      if (!updatedPost.acknowledged) return 'Could not update post';

      return 'Updated post';
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async deletePost(id: string): Promise<any> {
    try {
      const deletedPost = await this.postModel.deleteOne({ _id: id }).lean();

      if (deletedPost.deletedCount === 0) return 'Could not delete post';

      return 'Post deleted';
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
