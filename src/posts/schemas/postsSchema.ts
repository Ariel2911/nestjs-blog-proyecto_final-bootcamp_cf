import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop({
    type: String,
    required: true,
    min: [3, 'Must be at least 3 characters'],
    max: [255, 'Must have a maximum of 255 characters'],
  })
  title: string;

  @Prop({
    type: String,
    required: true,
  })
  author: string;

  @Prop({
    type: String,
    required: true,
  })
  userId: string;

  @Prop({
    type: String,
    required: true,
  })
  content: string;

  @Prop({
    type: [String],
  })
  categories: string[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
