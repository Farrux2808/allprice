import { IdParams, ProductListResponse, RequestStatusEnum } from '../../definitions';
import * as express from 'express';
import { sendError, sendSuccess, sendValidationError } from '../../services';
import { OlchaService, TexnomartService } from '../../extrenal';
import { Types } from 'mongoose';

export async function GetProductListByCategoryController(req: express.Request, res: express.Response) {
  let response: ProductListResponse;
  let idParam: IdParams;
  const baseLang = req.headers['accept-language'];

  try {
    idParam = await new IdParams(req.params).validate();
  } catch (error) {
    return sendValidationError(error, res);
  }

  try {
    response = {
      status: RequestStatusEnum.SUCCESS,
      nexStep: 0,
      products: [],
    };

    const olchaProduct = await OlchaService.getProductsByCategory({ categoryId: new Types.ObjectId(idParam.id), baseLang: baseLang });
    const texnomartProduct = await TexnomartService.getProductsByCategory({ categoryId: new Types.ObjectId(idParam.id), baseLang: baseLang });
    response.products = [...olchaProduct, ...texnomartProduct];

    sendSuccess(response, res);
  } catch (error) {
    sendError(error, res);
  }
}
