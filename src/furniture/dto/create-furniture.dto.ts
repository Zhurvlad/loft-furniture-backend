import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Max, Min, MinLength } from 'class-validator';


export class CreateFurnitureDto {
  @ApiProperty({ example: 'Динс Velvet Yellow' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  title: string;

  @ApiProperty({ example: 'Диваны' })
  @IsNotEmpty()
  @IsString()
  sub_category: string;

  @ApiProperty({ example: 1 })
  @Max(5)
  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  initialRating: number;

  @ApiProperty({ example: 4690 })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ example: 'Yellow' })
  @IsString()
  color: string;

  @ApiProperty({ example: 56 })
  @IsNumber()
  @IsNotEmpty()
  is_stocks: number;


  @ApiProperty({ example: '218 СМ\n' + '×\n' + '95 СМ\n' + '×\n' + '90 СМ' })
  @IsString()
  @IsNotEmpty()
  size: string[];

  @ApiProperty({ example: 'Лаконичные линии и простые формы, безупречный стиль и индивидуальность – все это диван «Динс»' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({example: 'Динс'})
  @IsString()
  @IsNotEmpty()
  furniture_brand: string

  @ApiProperty({example: 37990})
  @IsNumber()
  oldPrice?: number

}