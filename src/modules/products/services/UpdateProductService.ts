import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { IUpdateProduct } from '../domain/models/IUpdateProduct';
import Product from '../infra/typeorm/entities/Product';
import { ProductsRepository } from '../infra/typeorm/repositories/ProductsRepository';

class UpdateProductService {
  public async execute({ id, name, price, quantity }: IUpdateProduct): Promise<Product> {
    const productRepository = getCustomRepository(ProductsRepository);
    const product = await productRepository.findOne(id);
    if (!product) {
      throw new AppError('Product not found!');
    }

    const productExists = await productRepository.findByName(name);
    if (productExists?.name !== name) {
      throw new AppError('There is already one product with this name!');
    }

    const redisCache = new RedisCache();
    await redisCache.invalidate('sales-api-PRODUCT_LIST');

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
