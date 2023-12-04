import BaseController from "./BaseController";

class RootController extends BaseController {
  constructor() {
    super("GET", "/", {
      description: "Get Hello World",
      notes: "Returns a string Hello World",
      tags: ["api", "root"],
    });
  }

  async handler() {
    return "Hello World";
  }
}

export default RootController;
