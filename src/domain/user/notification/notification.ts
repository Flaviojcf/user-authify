export interface NotificationErrorProps {
  message: string
  context: string
}

export default class Notification {
  private readonly errors: NotificationErrorProps[] = []

  public addError (error: NotificationErrorProps): void {
    this.errors.push(error)
  }

  public messages (context?: string): string {
    let message = ''

    this.errors.forEach((error) => {
      if (context === undefined) {
        message += `${error.context}: ${error.message},`
      }
    })

    return message
  }

  public hasErrors (): boolean {
    return this.errors.length > 0
  }

  public getErrors (): NotificationErrorProps[] {
    return this.errors
  }
}
