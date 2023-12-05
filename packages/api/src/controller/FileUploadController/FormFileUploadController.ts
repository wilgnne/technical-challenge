import { Readable } from "stream";

import { Request, ResponseToolkit } from "@hapi/hapi";
import Joi from "joi";

import { EIfExist } from "@technical-challenge/app";

import BaseController from "../BaseController";
import { FileUploadServiceFactory } from "../../factories";

class FormFileUploadController extends BaseController {
  constructor(
    private readonly fileUploadServiceFactory: FileUploadServiceFactory,
  ) {
    super("POST", "/file-upload/form", {
      description: "Recebe o arquivo do sistema legado por multipart/form-data",
      tags: ["api", "upload"],
      payload: {
        output: "stream",
        parse: true,
        multipart: { output: "stream" },
        allow: "multipart/form-data",
        maxBytes: 2 * 1000 * 1000 * 1000,
      },
      validate: {
        query: Joi.object({
          ifExist: Joi.string().valid(EIfExist[0], EIfExist[1], EIfExist[2]),
        }),
        payload: Joi.object({
          file: Joi.any().meta({ swaggerType: "file" }).required(),
        }),
      },
      response: {
        schema: Joi.object({
          rowsInserted: Joi.number(),
        }),
      },
      plugins: {
        "hapi-swagger": {
          payloadType: "form",
        },
      },
    });
  }

  async handler(request: Request, h: ResponseToolkit) {
    try {
      const ifExist = EIfExist[request.query.ifExist] as unknown as EIfExist;
      const fileUploadService = await this.fileUploadServiceFactory(ifExist);
      const payload = request.payload as { file: Readable };

      const response = await fileUploadService.handler(payload.file);

      return h.response(response);
    } catch (error) {
      if (error instanceof Error) return h.response(error.stack).code(500);

      return h.response().code(500);
    }
  }
}

export default FormFileUploadController;
