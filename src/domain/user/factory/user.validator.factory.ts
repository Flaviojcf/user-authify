import type ValidatorInterface from '../../../@shared/validator/validator.interface'
import type User from '../entity/user'
import UserZodValidator from '../validator/user.zod.validator'

export default class UserValidatorFactory {
  public static create (): ValidatorInterface<User> {
    return new UserZodValidator()
  }
}
