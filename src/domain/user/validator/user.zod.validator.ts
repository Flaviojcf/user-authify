import { ErrorConstants } from '../../@shared/utils/error-constants/error.constants'
import type ValidatorInterface from '../../@shared/validator/validator.interface'
import type User from '../entity/user'
import * as zod from 'zod'

export default class UserZodValidator implements ValidatorInterface<User> {
  public validate (entity: User): void {
    try {
      const userSchema = zod.object({
        id: zod.string().uuid({ message: ErrorConstants.user.id }).trim(),
        name: zod.string().trim().min(1, { message: ErrorConstants.user.name }),
        email: zod.string().trim().min(1, { message: ErrorConstants.user.email }),
        password: zod.string().trim().min(1, { message: ErrorConstants.user.password })
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
