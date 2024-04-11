import { urls } from "../Urls";
import { AuthService } from "../http/AuthService";

export class AuthApi {
  static signup(data) {
    return AuthService.post(urls.auth.signup, data);
  }

  static signin(data) {
    return AuthService.post(urls.auth.signin, data);
  }

  static sendOtp(data) {
    return AuthService.post(urls.auth.send_otp, data);
  }

  static verifyOtp(data) {
    return AuthService.post(urls.auth.verify_otp, data);
  }

  static forgotPassword(data) {
    return AuthService.post(urls.auth.forgot_password, data);
  }

  static resetPassword(data) {
    return AuthService.post(urls.auth.reset_password, data);
  }

  static checkEmailExists(data) {
    return AuthService.post(urls.auth.check_email, data);
  }

  static fetchUserDetails() {
    return AuthService.getWithAuth(urls.auth.user_details);
  }
}
