enum ErrorCode
{
    NoError = 0,
    Exception = 1,
    Undefined = 2,
    DuplicateUserName = 101, // ثبت نام: نام کاربری تکراری
    CreateUserProblem = 102, // ثبت نام: خطا در ایجاد کاربر
    NoExistUserName = 103, // نام کاربری موجود نیست
    NoExistUserId = 104,
    WrongPassword = 105, // ورود به سیستم: رمز عبور اشتباه
    InvalidGiftCode = 301 // کد تخفیف هدیه نامعتبر
}

export default ErrorCode