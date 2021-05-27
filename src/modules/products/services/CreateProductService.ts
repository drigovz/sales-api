import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ICreateProduct } from '../domain/models/ICreateProduct';
import Product from '../infra/typeorm/entities/Product';
import { ProductsRepository } from '../infra/typeorm/repositories/ProductsRepository';

class CreateProductService {
  public async execute({ name, price, quantity }: ICreateProduct): Promise<Product> {
    const productRepository = getCustomRepository(ProductsRepository);
    const productExists = await productRepository.findByName(name);
    if (productExists) {
      throw new AppError('There is already one product with this name!');
    }

    const redisCache = new RedisCache();

    const product = productRepository.create({
      name,
      price,
      quantity,
    });

    await redisCache.invalidate('sales-api-PRODUCT_LIST');

    await productRepository.save(product);

    return product;
  }
}

export default CreateProductService;
