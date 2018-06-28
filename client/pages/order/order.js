// pages/order/order.js
const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config = require('../../config.js')
let app = getApp()
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    orderList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  onTapLogin() {
    let that = this
    app.login({
      success: function ({ userInfo }) {
        that.setData({
          userInfo: userInfo
        })
      }
    })
    this.getOrder()
  },
  getOrder() {
    wx.showLoading({
      title: '订单数据加载中...',
    })
    let that = this
    qcloud.request({
      url: config.service.orderList,
      login: true,
      success: function (res) {
        wx.hideLoading()
        let data = res.data
        if (!data.code) {
          that.setData({
            orderList: data.data
          })
        }
        else {
          wx.showToast({
            icon: "none",
            title: '订单数据加载失败',
          })
        }
      },
      fail: function () {
        wx.hideLoading()
        wx.showToast({
          icon: "none",
          title: '订单数据加载失败',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this
    app.checkSession({
      success: function ({ userInfo }) {
        that.setData({
          userInfo: userInfo
        })
        that.getOrder()
      },
      error: function () { }
    })
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})