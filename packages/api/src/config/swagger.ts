import HapiSwagger from "hapi-swagger";

const swaggerOptions: HapiSwagger.RegisterOptions = {
  info: {
    title: "Technical Challenge API Documentation",
    version: "1.0.0",
    contact: {
      name: "Wilgnne Alencar",
      email: "wilgnne.kba@gmail.com",
    },
  },
  documentationPath: "/swagger",
};

export default swaggerOptions;
