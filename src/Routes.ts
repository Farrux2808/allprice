import * as express from 'express';
import * as swaggerUi from 'swagger-ui-express';
import { CheckOperatorSessionMiddleware, CheckOperatorTemporarySessionMiddleware } from './middlewares';

import { SwaggerService } from './services';
import {
  CreateOperatorController,
  DeleteOperatorController,
  GetOperatorByIdController,
  GetOperatorListController,
  OperatorInitPasswordController,
  OperatorLoginController,
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

  operators.use(CheckOperatorSessionMiddleware);

  operators.get('/list', CheckOperatorSessionMiddleware, GetOperatorListController);
  operators.get('/:id', CheckOperatorSessionMiddleware, GetOperatorByIdController);
  operators.post('/', CheckOperatorSessionMiddleware, CreateOperatorController);
  operators.delete('/:id', CheckOperatorSessionMiddleware, DeleteOperatorController);
});

export default routes;
