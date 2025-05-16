import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "购物系统 API",
      version: "1.0.0",
      description: "购物系统的API文档",
    },
    servers: [
      {
        url: "http://localhost:3001",
        description: "开发服务器",
      },
    ],
    components: {
      securitySchemes: {
        adminSecret: {
          type: "apiKey",
          in: "header",
          name: "admin-secret",
          description: "管理员密钥，仅用于产品的增删改操作"
        }
      }
    }
  },
  apis: [path.resolve(__dirname, "./routes/*.ts")],
};

const specs = swaggerJsdoc(options);

export default specs;
