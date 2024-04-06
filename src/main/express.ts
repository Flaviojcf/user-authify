import express, { type Express } from 'express'
import { swaggerUiServe, swaggerUiSetup } from '../../swagger'
import { userRoute } from '../presentation/user/rest/route/user.route'

export const app: Express = express()
app.use(express.json())
app.use('/user', userRoute)
app.use('/api-docs', swaggerUiServe, swaggerUiSetup)
