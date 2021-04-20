import productRouter from '@modules/products/routes/products.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productRouter);
routes.get('/', (req, res) => {
  return res.json({ message: 'Server is running!' });
});

export default routes;
