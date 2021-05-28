import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { IShowCustomer } from '../domain/models/IShowCustomer';
import Customer from '../infra/typeorm/entities/Customer';
import CustomersRepository from '../infra/typeorm/repositories/CustomersRepository';

class ShowCustomerService {
  public async execute({ id }: IShowCustomer): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const customer = await customersRepository.findById(id);
    if (!customer) {
      throw new AppError('Customer not found!');
    }

    return customer;
  }
}

export default ShowCustomerService;
