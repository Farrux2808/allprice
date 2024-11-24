export class UtilityService {
  static async generatorPassword(length: number): Promise<string> {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const passwordLength = length;
    let password = '';

    for (let i = 0; i < passwordLength; i++) {
      const randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber + 1);
    }
    return password;
  }

  static generateOtp(length: number): number {
    const min = Math.pow(10, length - 1); // Minimum value based on length
    const max = Math.pow(10, length) - 1; // Maximum value based on length
    return Number(Math.floor(min + Math.random() * (max - min + 1))); // Generate OTP within range
  }
}
