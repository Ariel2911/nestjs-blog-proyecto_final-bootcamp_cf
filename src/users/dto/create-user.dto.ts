import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 200)
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsBoolean()
  readonly isAdmin?: boolean;
}
