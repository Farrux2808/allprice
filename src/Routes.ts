import * as express from 'express';
import * as swaggerUi from 'swagger-ui-express';
import { CheckOperatorSessionMiddleware, CheckOperatorTemporarySessionMiddleware } from './middlewares';

import { SwaggerService } from './services';
import {
  CreateCategoryController,
  CreateOperatorController,
  CreateServiceCategoryController,
  DeleteCategoryByIdController,
  DeleteOperatorController,
  DeleteServiceCategoryByIdController,
  GetCategoryByIdController,
  GetCategoryListController,
  GetOperatorByIdController,
  GetOperatorListController,
  GetProductListByCategoryController,
  GetServiceCategoryByIdController,
  GetServiceCategoryListController,
  OperatorInitPasswordController,
  OperatorLoginController,
  UpdateCategoryController,
  UpdateServiceCategoryController,
} from './controllers';

function nestedRoutes(path, configure) {
  const router = express.Router({ mergeParams: true });
  this.use(path, router);
  configure(router);
  return router;
}

express.application['prefix'] = nestedRoutes;
express.Router['prefix'] = nestedRoutes;

const routes = express.Router({ mergeParams: true });
const swagger = new SwaggerService();

routes.use('/doc', swaggerUi.serve, swaggerUi.setup(swagger.specs));

routes.prefix('/operator', operators => {
  operators.post('/login', OperatorLoginController);
  operators.post('/init-password', CheckOperatorTemporarySessionMiddleware, OperatorInitPasswordController);

  operators.get('/list', CheckOperatorSessionMiddleware, GetOperatorListController);
  operators.get('/:id', CheckOperatorSessionMiddleware, GetOperatorByIdController);
  operators.post('/', CheckOperatorSessionMiddleware, CreateOperatorController);
  operators.delete('/:id', CheckOperatorSessionMiddleware, DeleteOperatorController);
});

routes.prefix('/category', category => {
  category.get('/list', GetCategoryListController);
  category.get('/:id', GetCategoryByIdController);
  category.post('/', CheckOperatorSessionMiddleware, CreateCategoryController);
  category.delete('/:id', CheckOperatorSessionMiddleware, DeleteCategoryByIdController);
  category.put('/:id', CheckOperatorSessionMiddleware, UpdateCategoryController);
});

routes.prefix('/service-category', category => {
  category.get('/list', CheckOperatorSessionMiddleware, GetServiceCategoryListController);
  category.get('/:id', CheckOperatorSessionMiddleware, GetServiceCategoryByIdController);
  category.post('/', CheckOperatorSessionMiddleware, CreateServiceCategoryController);
  category.delete('/:id', CheckOperatorSessionMiddleware, DeleteServiceCategoryByIdController);
  category.put('/:id', CheckOperatorSessionMiddleware, UpdateServiceCategoryController);
});

routes.prefix('/product', products => {
  products.get('/list/:id', GetProductListByCategoryController);
});

export default routes;
