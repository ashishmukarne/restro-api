import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, ValidateNested } from 'class-validator';

export class CuisineDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  price: number;
}
export class RestroDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  address: string;

  @ValidateNested({ each: true })
  // @Type(() => CuisineDto)
  cuisines: CuisineDto[];
}
