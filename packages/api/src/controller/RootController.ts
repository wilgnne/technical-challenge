import { Request } from "@hapi/hapi";

class RootController {
  async get(request: Request) {
    return "Hello World";
  }
}

export default RootController;
