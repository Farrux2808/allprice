import { OperatorRepositoryInterface, OperatorSessionRepositoryInterface } from '../../definitions';

import { OperatorRepository, OperatorSessionRepository } from './operator';

class RepositoryClass {
  protected _operatorRepository: OperatorRepositoryInterface;
  protected _operatorSessionRepository: OperatorSessionRepositoryInterface;

  Operator(): OperatorRepositoryInterface {
    if (!this._operatorRepository) this._operatorRepository = new OperatorRepository();
    return this._operatorRepository;
  }

  OperatorSession(): OperatorSessionRepositoryInterface {
    if (!this._operatorSessionRepository) this._operatorSessionRepository = new OperatorSessionRepository();
    return this._operatorSessionRepository;
  }
}

export * from './base';
export * from './operator';

export const Repository = new RepositoryClass();
