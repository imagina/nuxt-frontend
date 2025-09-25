export interface ResetPasswordForm {
  email: string
  password: string
  confirmPassword: string
  token: string
}

export interface ResetPasswordFormErrors {
  email?: string
  password?: string
  confirmPassword?: string
}

export interface ResetPasswordMessage {
  text: string
  type: 'success' | 'error'
}
