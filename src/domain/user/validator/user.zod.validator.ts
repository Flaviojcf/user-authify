import type ValidatorInterface from '../../../@shared/validator/validator.interface'
import type User from '../entity/user'
import * as zod from 'zod'

export default class UserZodValidator implements ValidatorInterface<User> {
  public validate (entity: User): void {
    try {
      const userSchema = zod.object({
        id: zod.string().uuid({ message: 'Id is required' }).trim(),
        name: zod.string().trim().min(1, { message: 'Name is required' }),
        email: zod.string().trim().min(1, { message: 'Email is required' }),
        password: zod.string().trim().min(1, { message: 'Password is required' })
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
