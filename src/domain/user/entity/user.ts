import BaseEntity from '../../@shared/entity/base.entity.abstract'
import UserValidatorFactory from '../factory/user.validator.factory'
import NotificationError from '../notification/notification.error'

export default class User extends BaseEntity {
  private readonly _name: string
  private readonly _email: string
  private readonly _password: string
  private _register: Date
  private readonly _validation_id: string

  constructor (id: string, name: string, email: string, password: string, register: Date, validationId: string) {
    super()
    this._id = id
    this._name = name
    this._email = email
    this._password = password
    this._register = register
    this._validation_id = validationId
    this.validate()

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors())
    }
  }

  get name (): string {
    return this._name
  }

  get email (): string {
    return this._email
  }

  get password (): string {
    return this._password
  }

  get register (): Date {
    return this._register
  }

  get validationId (): string {
    return this._validation_id
  }

  isRegistered (): Date {
    return this._register
  }

  createRegister (): void {
    this._register = new Date()
  }

  public validate (): void {
    UserValidatorFactory.create().validate(this)
  }
}
