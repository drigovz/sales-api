import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import IRequest from '../interfaces/IRequest';
import Product from '../typeorm/entities/Product';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';

class ShowProductService {
  public async execute({ id }: IRequest): Promise<Product | undefined> {
    const productRepository = getCustomRepository(ProductsRepository);
    const product = productRepository.findOne(id);
    if (product) {
      throw new AppError('Product not found!');
    }

    return product;
  }
}

export default ShowProductService;
