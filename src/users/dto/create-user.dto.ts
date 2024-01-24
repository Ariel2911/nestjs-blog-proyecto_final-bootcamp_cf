import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Cody',
    minLength: 3,
    maxLength: 200,
    description: 'User name',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 200)
  readonly name: string;

  @ApiProperty({
    example: 'password',
    minLength: 8,
    maxLength: 16,
    description: 'User password',
  })
  @IsNotEmpty()
  @IsString()
  @Length(8, 16)
  readonly password: string;

  @ApiProperty({ example: 'Cody@test.com', description: 'User email' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: 'true',
    default: false,
    description: 'Optional value',
  })
  @IsOptional()
  @IsBoolean()
  readonly isAdmin?: boolean;
}
