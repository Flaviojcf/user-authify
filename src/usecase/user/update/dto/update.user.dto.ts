export interface InputUpdateUserDTO {
  id: string
  password: string
  name: string
  email: string
  isRegistered: Date
  validationId: string
}

export interface OutputUpdateUserDTO {
  id: string
  password: string
  name: string
  email: string
  isRegistered: Date
  validationId: string
}
