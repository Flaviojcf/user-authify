import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import path from 'path'

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Authify API',
      version: '1.0.0',
      description: 'Authify is an API to create and authenticate a user with 2FA'
    }
  },
  apis: [path.resolve(__dirname, './src/infrastructure/api/routes/*.swagger.route.ts')]
}

const specs = swaggerJsdoc(options)

export const swaggerUiSetup = swaggerUi.setup(specs)
export const swaggerUiServe = swaggerUi.serve