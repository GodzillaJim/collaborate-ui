export class AuthRoutes {
  public static BASE_URL: string =
    process.env.REACT_APP_BASE_URL ||
    "http://dev-env.eba-a2rv6tdz.us-east-1.elasticbeanstalk.com";
  /* Gets firstName, lastName, email and password, returns success message */
  public static get REGISTER() {
    return this.BASE_URL + "/api/v1/auth/register";
  }

  /* Gets email and password, returns token and expiry */
  public static get LOGIN() {
    return this.BASE_URL + "/api/v1/auth/login";
  }
}
