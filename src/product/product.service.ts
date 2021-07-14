import { BadRequestException, Injectable } from '@nestjs/common';
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
      ...createProductDto,
      id: uuid(),
    };

    const entities = JSON.parse(
      fs.readFileSync(databaseFilePath, { encoding: 'utf-8' }),
    );

    const hasProduct = entities[PRODUCTS].find((entitie) => {
      return (
        entitie.codigo === createProductDto.codigo ||
        entitie.nome === createProductDto.nome
      );
    });

    if (!hasProduct) {
      entities[PRODUCTS].push(product);

      fs.writeFileSync(databaseFilePath, JSON.stringify(entities));

      return product;
    } else {
      throw new BadRequestException('Código ou nome do produto já cadastrado');
    }
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

  update(id: string, updateProductDto: UpdateProductDto) {
    const entities = JSON.parse(
      fs.readFileSync(databaseFilePath, { encoding: 'utf-8' }),
    );

    const product = entities[PRODUCTS].filter((entitie) => {
      return entitie.id !== id;
    });

    const hasProduct = entities[PRODUCTS].find((entitie) => {
      return entitie.nome === updateProductDto.nome;
    });

    if (!hasProduct) {
      const products = [...product, { ...updateProductDto, id: uuid() }];

      fs.writeFileSync(databaseFilePath, JSON.stringify({ products }));

      return updateProductDto;
    } else {
      throw new BadRequestException('Código ou nome do produto já cadastrado');
    }
  }

  remove(id: string) {
    const dbEntities = JSON.parse(
      fs.readFileSync(databaseFilePath, { encoding: 'utf-8' }),
    );

    const products = dbEntities[PRODUCTS].filter((entitie) => {
      return entitie.id !== id;
    });

    fs.writeFileSync(databaseFilePath, JSON.stringify({ products }));
    return '';
  }
}
