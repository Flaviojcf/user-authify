import UserFactory from './user.factory'

describe('User factory unit test', () => {
  it('should create a user', () => {
    const user = UserFactory.create('Flavio', 'Flavio@gmail.com', 'flaviopassword')

    expect(user.id).toBeDefined()
    expect(user.name).toBe('Flavio')
    expect(user.email).toBe('Flavio@gmail.com')
    expect(user.password).toBe('flaviopassword')
  })
})
