import * as express from 'express';
import { sendSuccess, sendError, sendValidationError } from '../../services';
import { OperatorLoginParams, OperatorLoginResponse } from '../../definitions/';
import { createOperatorSessionByEmailCase } from '../../cases';

export async function OperatorLoginController(req: express.Request, res: express.Response) {
  let params: OperatorLoginParams;
  let response: OperatorLoginResponse;

  try {
    params = await new OperatorLoginParams(req.body).validate();
  } catch (error) {
    return sendValidationError(error, res);
  }

  try {
    const result = await createOperatorSessionByEmailCase.execute({
      email: params.email,
      password: params.password,
      useragent: req.headers['user-agent'],
    });

    response = new OperatorLoginResponse(result.session, result.operator);
    sendSuccess(response, res);
  } catch (error) {
    sendError(error, res);
  }
}

/**
 * @swagger
 * /operator/login:
 *  post:
 *    tags:
 *      - Operator
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/definitions/OperatorLoginParams'
 *
 *    responses:
 *      '200':
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: object
 *                  default: null
 *                data:
 *                  $ref: '#/definitions/OperatorLoginResponse'
 *      '401':
 *        description: Unauthorized error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/definitions/UnauthorizedError'
 *      '400':
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/BadRequestError'
 */
