import HapiSwagger from "hapi-swagger";

export const swaggerOptions: HapiSwagger.RegisterOptions = {
  info: {
    title: 'Technical Challenge API Documentation',
    version: "1.0.0",
    contact: {
      name: "Wilgnne Alencar",
      email: "wilgnne.kba@gmail.com"
    },
  },
  documentationPath: "/swagger"
};
