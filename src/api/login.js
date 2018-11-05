import request from '@/utils/request'
// 用户登录
export function goLogin(phone,password) {
  return request({
    url: '/lamp/user/loginByPassword.do',
    params: { 'phone': phone,'password':password},
    method: 'GET'
  })
}
// 获取验证码
export function getCode(phone) {
  return request({
    url: '/lamp/user/requireVerifyCode.do',
    method: 'GET',
    params: {
      "phone":phone
    }
  })
}
