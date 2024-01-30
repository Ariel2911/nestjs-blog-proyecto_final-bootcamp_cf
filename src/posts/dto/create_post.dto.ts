export class CreatePostDto {
  readonly title: string;
  readonly author: string;
  readonly content: string;
  readonly categories: string[];
}
