import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends CreateProductDto {
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  @IsString({ message: 'Nome deve ser texto' })
  nome: string;

  @IsNotEmpty({ message: 'Tipo não pode ser vazio' })
  @IsString({ message: 'Tipo deve ser texto' })
  tipo: string;

  @IsNotEmpty({ message: 'Valor não pode ser vazio' })
  @IsNumber()
  valor: number;
}
