import Entity from '../../../@shared/entity/entity.abstract'

export default class User extends Entity {
  private readonly _name: string
  private readonly _email: string
  private readonly _password: string
  private readonly _active: boolean

  constructor (id: string, name: string, email: string, password: string) {
    super()
    this._id = id
    this._name = name
    this._email = email
    this._password = password

    // this.validate()
  }
}
