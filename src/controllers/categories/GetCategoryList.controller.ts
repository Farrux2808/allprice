import { CategoryListResponse, IdParams } from '../../definitions';
import { sendError, sendSuccess } from '../../services';
import * as express from 'express';
import { Repository } from '../../domain';

export async function GetCategoryListController(req: express.Request, res: express.Response) {
  let response: CategoryListResponse;
  const baseLang = req.headers['accept-language'];

  try {
    const categoryList = await Repository.Category().list({ page: 1, size: 100 }, { status: true });
    response = {
      categories: categoryList.map(category => {
        return {
          id: category.getId(),
          name: category.getName().getByLang(baseLang),
        };
      }),
    };
    sendSuccess(response, res);
  } catch (error) {
    sendError(error, res);
  }
}
