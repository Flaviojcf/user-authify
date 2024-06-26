import { ErrorConstants } from '../../../shared/constants/error-constants/error.constants'
import type ValidatorInterface from '../../@shared/validator/validator.interface'
import type User from '../entity/user'
import * as zod from 'zod'

export default class UserZodValidator implements ValidatorInterface<User> {
  public validate (entity: User): void {
    try {
      const userSchema = zod.object({
        id: zod.string().uuid({ message: ErrorConstants.user.id }),
        name: zod.string({ required_error: ErrorConstants.user.name }).trim().min(1, ErrorConstants.user.name),
        email: zod.string({ required_error: ErrorConstants.user.email }).trim().min(1, ErrorConstants.user.email),
        password: zod.string({ required_error: ErrorConstants.user.password }).trim().min(1, ErrorConstants.user.password)
      })

      userSchema.parse({
        id: entity.id,
        name: entity.name,
        email: entity.email,
        password: entity.password
      })
    } catch (error) {
      if (error instanceof zod.ZodError) {
        error.errors.forEach((validationError) => {
          entity.notification.addError({
            context: 'user',
            message: validationError.message
          })
        })
      }
    }
  }
}
