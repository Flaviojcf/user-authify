import BaseEntity from '../../../@shared/entity/baseEntity.abstract'
import UserValidatorFactory from '../factory/user.validator.factory'
import NotificationError from '../notification/notification.error'

export default class User extends BaseEntity {
  private readonly _name: string
  private readonly _email: string
  private readonly _password: string
  private _register: Date

  constructor (id: string, name: string, email: string, password: string) {
    super()
    this._id = id
    this._name = name
    this._email = email
    this._password = password
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

  isRegistred (): Date {
    return this._register
  }

  register (): void {
    this._register = new Date()
  }

  public validate (): void {
    UserValidatorFactory.create().validate(this)
  }
}
