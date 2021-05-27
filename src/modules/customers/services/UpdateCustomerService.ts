import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { IUpdateCustomer } from '../domain/models/IUpdateCustomer';
import Customer from '../infra/typeorm/entities/Customer';
import CustomersRepository from '../infra/typeorm/repositories/CustomersRepository';

class UpdateCustomerService {
  public async execute({ id, name, email }: IUpdateCustomer): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(id);
    if (!customer) {
      throw new AppError('Customer not found!');
    }

    const customerExists = await customersRepository.findByEmail(email);
    if (customerExists && email !== customerExists.email) {
      throw new AppError('There already customer with this email!');
    }

    customer.name = name;
    customer.email = email;

    await customersRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
