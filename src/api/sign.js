import request from '@/utils/request'

/*注册*/

// 用户注册
export function signIn(param) {
  return request({
    url: '/lamp/user/register.do',
    params: param,
    method: 'GET'
  })
}
/*乐器列表*/
export function instruments() {
  return request({
    url: '/lamp/instruments/queryList.do',
    method: 'GET'
  })
}
/*申请成为服务商 */
export function applyForService(info) {
  return request({
    url: '/lamp/applyForOtherRole/applyForAgent.do',
    params:info,
    method: 'GET'
  })
}

/*申请成为培训机构 */
export function applyInstitution(info) {
  console.log(info)
  return request({
    url: '/lamp/applyForOtherRole/applyForTraining.do',
    params:info,
    method: 'GET'
  })
}
/*申请成为代理商 */
export function applyAgent(info) {
  console.log(info)
  return request({
    url: '/lamp/applyForOtherRole/applyForAgent.do',
    params:info,
    method: 'GET'
  })
}