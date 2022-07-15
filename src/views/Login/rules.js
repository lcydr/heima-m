export const mobileLogin = [
  { required: true, message: '请填写手机号' }
  // {
  //   pattern: /^1[0-9]$/,
  //   message: '手机号格式不正确'
  // }
]
export const codeLogin = [
  { required: true, message: '请填写验证码' },
  { pattern: /[0-9]{6}/, message: '请输入六位验证码' }
]
