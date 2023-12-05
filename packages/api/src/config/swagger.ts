import HapiSwagger from "hapi-swagger";

const swaggerOptions: HapiSwagger.RegisterOptions = {
  info: {
    title: "Technical Challenge API Documentation",
    version: "1.1.0",
    contact: {
      name: "Wilgnne Alencar",
      email: "wilgnne.kba@gmail.com",
    },
  },
  OAS: "v3.0",
  documentationPath: "/swagger",
};

export default swaggerOptions;
