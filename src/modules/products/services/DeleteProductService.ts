import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import IRequest from '../interfaces/IRequest';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productRepository = getCustomRepository(ProductsRepository);
    const product = await productRepository.findOne(id);
    if (!product) {
      throw new AppError('Product not found!');
    }

    await productRepository.remove(product);
  }
}

export default DeleteProductService;
