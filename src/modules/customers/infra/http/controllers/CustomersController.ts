import { Request, Response } from 'express';
import CreateCustomerService from '../../../services/CreateCustomerService';
import DeleteCustomerService from '../../../services/DeleteCustomerService';
import ListCustomerService from '../../../services/ListCustomerService';
import ShowCustomerService from '../../../services/ShowCustomerService';
import UpdateCustomerService from '../../../services/UpdateCustomerService';

class CustomerController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listCustomers = new ListCustomerService();
    const customers = await listCustomers.execute();
    return res.json(customers);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const showCustomers = new ShowCustomerService();
    const customer = await showCustomers.execute({ id });

    return res.json(customer);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;
    const createCustomerService = new CreateCustomerService();

    const customer = await createCustomerService.execute({ name, email });

    return res.json(customer);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, email } = req.body;
    const updateCustomerService = new UpdateCustomerService();

    const customer = await updateCustomerService.execute({ id, name, email });

    return res.json(customer);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleteCustomer = new DeleteCustomerService();

    await deleteCustomer.execute({ id });

    return res.json({ message: 'Customer deleted!' });
  }
}

export default CustomerController;
