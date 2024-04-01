import type ValidatorInterface from '../../../@shared/validator/validator.interface'
import type User from '../entity/user'

export default class UserZodValidator implements ValidatorInterface<User> {
  validate (entity: User): void {

  }
}
