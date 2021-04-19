import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import IRequest from '../interfaces/IRequest';
import Product from '../typeorm/entities/Product';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';

class UpdateProductService {
  public async execute({ id, name, price, quantity }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductsRepository);
    const product = await productRepository.findOne(id);
    if (!product) {
      throw new AppError('Product not found!');
    }

    const productExists = await productRepository.findByName(name);
    if (productExists) {
      throw new AppError('There is already one product with this name!');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
