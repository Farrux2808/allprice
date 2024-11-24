import { BaseCaseInterface, BaseListParams, ListInterface } from '../../definitions';
import { OperatorEntity, Repository } from '../../domain';

export class GetOperatorListCase implements BaseCaseInterface<BaseListParams, ListInterface<OperatorEntity>> {
  async execute(params: BaseListParams): Promise<ListInterface<OperatorEntity>> {
    const data: ListInterface<OperatorEntity> = {
      items: [],
      meta: {
        count: 0,
        currentPage: params.pagination.page,
        pages: 0,
      },
    };

    data.meta.count = await Repository.Operator().countDocumentsByFilter(params.filter);
    data.meta.pages = Math.ceil(data.meta.count / params.pagination.size);
    if (data.meta.pages < data.meta.currentPage) data.meta.currentPage = data.meta.pages;
    data.items = await Repository.Operator().list(params.pagination, params.filter, params.sort);
    return data;
  }
}

export const getOperatorListCase: BaseCaseInterface<BaseListParams, ListInterface<OperatorEntity>> = new GetOperatorListCase();
