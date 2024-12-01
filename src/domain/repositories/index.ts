import {
  CategoryRepositoryInterface,
  OperatorRepositoryInterface,
  OperatorSessionRepositoryInterface,
  ServicesCategoryRepositoryInterface,
} from '../../definitions';

import { OperatorRepository, OperatorSessionRepository } from './operator';
import { CategoryRepository, ServicesCategoryRepository } from './category';

class RepositoryClass {
  protected _operatorRepository: OperatorRepositoryInterface;
  protected _operatorSessionRepository: OperatorSessionRepositoryInterface;
  protected _categoryRepository: CategoryRepositoryInterface;
  protected _servicesCategoryRepository: ServicesCategoryRepositoryInterface;

  Operator(): OperatorRepositoryInterface {
    if (!this._operatorRepository) this._operatorRepository = new OperatorRepository();
    return this._operatorRepository;
  }

  OperatorSession(): OperatorSessionRepositoryInterface {
    if (!this._operatorSessionRepository) this._operatorSessionRepository = new OperatorSessionRepository();
    return this._operatorSessionRepository;
  }

  Category(): CategoryRepositoryInterface {
    if (!this._categoryRepository) this._categoryRepository = new CategoryRepository();
    return this._categoryRepository;
  }

  ServicesCategory(): ServicesCategoryRepositoryInterface {
    if (!this._servicesCategoryRepository) this._servicesCategoryRepository = new ServicesCategoryRepository();
    return this._servicesCategoryRepository;
  }
}

export * from './base';
export * from './operator';

export const Repository = new RepositoryClass();
