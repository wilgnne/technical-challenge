import {
  HTTP_METHODS,
  Lifecycle,
  Request,
  ResponseToolkit,
  RouteOptions,
  ServerRoute,
} from "@hapi/hapi";

abstract class BaseController {
  constructor(
    private readonly method: HTTP_METHODS,
    private readonly path: string,
    private readonly routeOptions: Omit<RouteOptions, "handler">,
  ) {}

  abstract handler(
    request: Request,
    h: ResponseToolkit,
    err?: Error | undefined,
  ): Lifecycle.ReturnValue;

  buildRoute(): ServerRoute {
    return {
      method: this.method,
      path: this.path,
      options: this.routeOptions,
      handler: this.handler.bind(this),
    };
  }
}

export default BaseController;
