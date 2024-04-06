import { ErrorConstants } from '../../../shared/utils/error-constants/error.constants'
import Notification from './notification'

describe('Unit test for notification', () => {
  it('should create an error', () => {
    const notification = new Notification()

    const error = {
      message: 'Id is required',
      context: 'user'
    }

    notification.addError(error)

    expect(notification.messages('user')).toBe(`${ErrorConstants.user.id},`)
  })

  it('should create errors', () => {
    const notification = new Notification()

    const error = {
      message: 'Id is required',
      context: 'user'
    }

    notification.addError(error)

    expect(notification.messages('user')).toBe(`${ErrorConstants.user.id},`)

    const error2 = {
      message: 'Email is required',
      context: 'user'
    }
    notification.addError(error2)

    expect(notification.messages('user')).toBe(`${ErrorConstants.user.id},${ErrorConstants.user.email},`)
  })

  it('should check if notification has at least one error', () => {
    const notification = new Notification()

    const error = {
      message: 'Email is required',
      context: 'user'
    }

    notification.addError(error)

    expect(notification.hasErrors()).toBe(true)
  })

  it('should get all errors', () => {
    const notification = new Notification()

    const error = {
      message: 'Email is required',
      context: 'user'
    }

    notification.addError(error)

    expect(notification.getErrors().length).toBe(1)
    expect(notification.getErrors()[0].message).toBe('Email is required')
    expect(notification.getErrors()[0].context).toBe('user')
  })
})
