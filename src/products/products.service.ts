import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {

  constructor(@InjectRepository(Product) private productsRepository: Repository<Product>) { }

  createProduct(product: CreateProductDto) {

    const newProduct = this.productsRepository.create(product)

    return this.productsRepository.save(newProduct)
  }

}
