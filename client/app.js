
//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

let userInfo
App({
  onLaunch: function () {
    qcloud.setLoginUrl(config.service.loginUrl)
  },
  login({ success, error }) {
    let that = this
    qcloud.login({//在小程序和服务器之间建立会话
      success: function (result) {
        if (result)//bindgetuserinfo只能获取用户第一次登录信息，不能再次授权，所以，如果是第二次的话result就不存在
        {
          userInfo = result
          success && success({
            userInfo: userInfo
          })
        }
        else {
          that.getUserInfo({ success, error })
        }
      },
      fail: function () {
        error && error()
      }
    })
  },
  getUserInfo({ success, error }) {
    if (userInfo)
      return userInfo
    qcloud.request
      ({
        url: config.service.user,
        login: true,
        success: function (result) {
          let data = result.data
          if (!data.code) {
            userInfo = data.data
            success && success({
              userInfo: userInfo
            })
          }
          else {
            error && error()
          }
        },
        fail: function () {
          error && error()
        }
      })
  },
  checkSession({ success, error }) {
    if (userInfo) {
      return success && success({
        userInfo
      })
    }
    let that = this
   wx.checkSession({
     success:function(){
      that.getUserInfo({
        seccuss:function(res)
        {
           userInfo=res.userInfo
            success&&success({
              userInfo
            })
        },
        fail:function()
        {
            error&&error()
        }
      })
  
     },
      fail: function () {
        error && error()
      }
    })   
  }
})