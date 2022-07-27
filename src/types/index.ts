export interface IContactForm {
    name: string, email: string, message: string, subject: string
}

export interface IRegistrationForm {
    firstName: string, lastName: string, email: string, password: string, confirmPassword: string
}

export interface ILoginForm {
    email: string, password: string
}
