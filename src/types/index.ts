export interface IContactForm {
  name: string;
  email: string;
  message: string;
  subject: string;
}

export interface IRegistrationForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar?: string;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IFacebookProfile {
  first_name: string;
  last_name: string;
  email: string;
  picture: {
    data: {
      height: number;
      is_silhouette: boolean;
      url: string;
      width: number;
    };
  };
  id: string;
}

export interface ITask {
  _id: string;
  name: string;
  owner: string;
  createdAt: Date;
  updatedAt: Date;
  code: string;
  __v: number;
}
