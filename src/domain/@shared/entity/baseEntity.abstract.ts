import Notification from '../../domain/user/notification/notification'

export default abstract class BaseEntity {
  protected _id: string
  public notification: Notification

  constructor () {
    this.notification = new Notification()
  }

  get id (): string {
    return this._id
  }
}
