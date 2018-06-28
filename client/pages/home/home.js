const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config=require("../../config.js")
Page({
  data: {
    productList: []
  },
  onLoad: function () {
    this.getProductList()
  },
  //通过API得到商品列表
  getProductList()
  {
    let that = this;
    wx.showLoading({
      title: '商品正在加载中...',
    })
    qcloud.request({
      url: config.service.productList,
      success: function (result) {
        wx.hideLoading()
        if(!result.data.code)
        {
        that.setData({
          productList: result.data.data
        })
        }
        else{
          wx.showToast({
            title: '商品加载失败',
          })
        }
      },
      error: function (result) {
        wx.hideLoading()
        wx.showToast({
          title: '商品加载失败',
        })
      }
    })
  },
  addToTrolley(event) {
    let productId=event.currentTarget.dataset.id   //获取设置的参数ID
    let that = this
    wx.showLoading({
      title: '加载ing',
    })
    if(productId)
    {
    qcloud.request({
      url: config.service.addTrolley,
      method: 'PUT',
      login: true,
      data: {
        id: productId
      },
      success: function (res) {
        wx.hideLoading()
        let data = res.data
        if (!data.code) {
          wx.showToast({
            title: '商品添加成功',
          })
        }
        else {
          wx.showToast({
            icon: 'none',
            title: '商品添加失败',
          })
        }
      },
      fail: function () {
        wx.hideLoading()
        wx.showToast({
          icon: 'none',
          title: '商品添加失败',
        })
      }
    })
  }
  }
})