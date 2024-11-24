import * as express from 'express';
import { sendError, sendSuccess, sendValidationError } from '../../services';
import { GetOperatorListParams, GetOperatorListResponse, ListInterface } from '../../definitions';
import { getOperatorListCase } from '../../cases';
import { FilterQuery } from 'mongoose';

export async function GetOperatorListController(req: express.Request, res: express.Response) {
  let params: GetOperatorListParams;
  let response: ListInterface<GetOperatorListResponse> = {
    meta: {
      count: 0,
      currentPage: 1,
      pages: 0,
    },
    items: [],
  };

  try {
    params = await new GetOperatorListParams(req.query).validate();
  } catch (error) {
    return sendValidationError(error, res);
  }

  try {
    const filter: FilterQuery<any> = {};

    if (params.fullName && params.fullName.length > 2) {
      filter.fullName = {
        $regex: '.*' + params.fullName + '.*',
        $options: 'i',
      };
    }

    if (params.status && params.status !== 'all') {
      filter.status = params.status;
    }

    const getOperatorListParams = {
      pagination: {
        size: params.size,
        page: params.page,
      },
      filter: filter,
      sort: { createdAt: -1 },
    };

    const result = await getOperatorListCase.execute(getOperatorListParams);

    response.meta = result.meta;
    response.items = result.items.map(obj => new GetOperatorListResponse(obj));

    sendSuccess(response, res);
  } catch (error) {
    sendError(error, res);
  }
}
