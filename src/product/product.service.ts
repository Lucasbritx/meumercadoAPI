import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import fs from 'fs';
import { resolve } from 'path';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

const databaseFilePath = resolve(
  __dirname,
  '..',
  'data',
  'products',
  'db.json',
);

const PRODUCTS = 'products';
const USER = 'user';

@Injectable()
export class ProductService {
  create(createProductDto: CreateProductDto) {
    const product = {
      codigo: uuid(),
      nome: 'Itaipava',
      tipo: 'Cerveja',
      estoque: '200',
      valor: '1.50',
    };
    const entities = JSON.parse(
      fs.readFileSync(databaseFilePath, { encoding: 'utf-8' }),
    );

    entities[PRODUCTS].push(product);

    fs.writeFileSync(databaseFilePath, JSON.stringify(entities));

    return product;
  }

  findAll() {
    const entities = JSON.parse(
      fs.readFileSync(databaseFilePath, { encoding: 'utf-8' }),
    );

    return {
      entities: entities[PRODUCTS],
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
