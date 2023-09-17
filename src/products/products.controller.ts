import { Controller, Post, Body, Res } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/product.dto';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {

  constructor(private productsService: ProductsService) { }

  @Post()
  async createProduct(@Body() product: CreateProductDto, @Res() res: Response) {
    try {
      const productSaved = await this.productsService.createProduct(product);
      res.json(productSaved);

    } catch (error) {
      res.json({ error: 'Ocurrió algo al intentar crear el producto' });
    }
  }
}
