import { Router } from 'express';
import ProductsController from '../controllers/ProductController';

const productRouter = Router();
const productController = new ProductsController();

productRouter.get('/', productController.index);
productRouter.get('/:id', productController.show);
productRouter.post('/', productController.create);
productRouter.put('/:id', productController.update);
productRouter.delete('/:id', productController.delete);

export default productRouter;
