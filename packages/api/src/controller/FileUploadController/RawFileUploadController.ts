import { IncomingMessage } from "http";

import { Request, ResponseToolkit } from "@hapi/hapi";
import Joi from "joi";

import BaseController from "../BaseController";
import { FileUploadServiceFactory } from "../../factories";

class RawFileUploadController extends BaseController {
  constructor(
    private readonly fileUploadServiceFactory: FileUploadServiceFactory,
  ) {
    super("POST", "/file-upload/raw", {
      description: "Recebe o arquivo do sistema legado",
      tags: ["api", "upload"],
      payload: {
        output: "stream",
        parse: true,
        allow: "application/octet-stream",
        maxBytes: 2 * 1000 * 1000 * 1000,
      },
      validate: {
        payload: Joi.any().meta({ swaggerType: "file" }).required(),
      },
      plugins: {
        "hapi-swagger": {
          consumes: ["application/octet-stream"],
        },
      },
    });
  }

  async handler(request: Request, h: ResponseToolkit) {
    try {
      const fileUploadService = await this.fileUploadServiceFactory();
      const payload = request.payload as IncomingMessage;
      const response = await fileUploadService.handler(payload);

      return h.response(response);
    } catch (error) {
      if (error instanceof Error) return h.response(error.stack).code(500);

      return h.response().code(500);
    }
  }
}

export default RawFileUploadController;
