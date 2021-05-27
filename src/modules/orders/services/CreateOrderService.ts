import AppError from '@shared/errors/AppError';
import Order from '../infra/typeorm/entities/Order';
import { getCustomRepository } from 'typeorm';
import { ProductsRepository } from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import OrdersRepository from '../infra/typeorm/repositories/OrdersRepository';
import { ICreateOrder } from '../domain/models/ICreateOrder';

class CreateOrderService {
  public async execute({ customer_id, products }: ICreateOrder): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const customersRepository = getCustomRepository(CustomersRepository);
    const productsRepository = getCustomRepository(ProductsRepository);

    const customerExists = await customersRepository.findById(customer_id);
    if (!customerExists) {
      throw new AppError('Could not find any customer with given id!');
    }

    const existsProducts = await productsRepository.findAllByIds(products);
    if (!existsProducts.length) {
      throw new AppError('Could not find any products with given ids!');
    }

    // verify if products really exists in database
    // get all products ids
    const existsProductsIds = existsProducts.map(product => product.id);
    // get all inexistent products ids
    const checkInexistentProducts = products.filter(product => !existsProductsIds.includes(product.id));
    // if 'checkInexistentProducts' is biger than zero, so have inexistents products ids on this list
    if (checkInexistentProducts.length) {
      throw new AppError(`Could not find product id: ${checkInexistentProducts[0].id}!`);
    }

    // verify if quantity is valid
    const quantityAvaliable = products.filter(product => existsProducts.filter(p => p.id === product.id)[0].quantity < product.quantity);
    if (quantityAvaliable.length) {
      throw new AppError(`The quantity ${quantityAvaliable[0].quantity} is not avaliable for ${quantityAvaliable[0].id}!`);
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price,
    }));

    const order = await ordersRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    const { order_products } = order;

    try {
      // update quantity of products
      const updatedProductQuantity = order_products.map(product => ({
        id: product.product_id,
        quantity: existsProducts.filter(p => p.id === product.product_id)[0].quantity - product.quantity,
      }));

      await productsRepository.save(updatedProductQuantity);
    } catch (error) {
      throw new AppError(`Error when try to register new order: \n ${error}`);
    }

    return order;
  }
}

export default CreateOrderService;
