import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, ValidateNested } from 'class-validator';

export class Tag {
  @Length(10, 20, {
    message: 'Tag is too short or long',
  })
  name: string;
}

export class Post {
  @ApiProperty()
  @Length(10, 20, {
    message: 'Incorrect length!',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  tags: Tag[];
}
