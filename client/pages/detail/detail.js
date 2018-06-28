// pages/detail/detail.js
const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config=require('../../config.js')
const _ = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
      product: {
    }
  },
  onLoad: function (options) {
    this.getProductDetail(options.id)
  },
  getProductDetail(id){
    wx.showLoading({
      title: '商品加载中...',
    })
    let that=this;
      qcloud.request({
        url:config.service.productDetail + id,
        success:function(result)
        {
          wx.hideLoading()
          if(!result.code)
          {
           that.setData({
             product:result.data.data
           })
          }
          else{
            setTimeout(function(){
              wx.navigateBack()
            },2000)
          }
        },
        error:function(result)
        {
          wx.hideLoading()
           wx.showToast({
             title: '商品加载失败',
           })
        }
    })
  },
  buy()
  {
    wx.showLoading({
      title: '商品购买中...',
    })
    let product=Object.assign({
      count:1
    },this.data.product)//设置product的count属性为1，默认只可以购买一个，并将this.data.product覆盖product
    qcloud.request({
      url: config.service.addOrder,
      method:'POST',
      login:true,//是否自动登录以获取对话
      data:{list:[product]},
      success:function(res)
      {
        wx.hideLoading()
        let data=res.data
        if(!data.code)
        {
            wx.showToast({
              title: '商品购买成功',
            })
        }
        else{
          wx.showToast({
            icon:"none",
            title: '商品购买失败',
          })
        }
      },
      fail:function()
      {
        wx.hideLoading()
        wx.showToast({
          icon: "none",
          title: '商品购买失败',
        })
      }
    })
  },
  addToTrolley(){
     wx.showLoading({
       title: '正在添加...',
     })
     let that=this
     qcloud.request({
       url: config.service.addTrolley,
       method: 'PUT',
       login:true,
       data:that.data.product,
       success:function(res){
         wx.hideLoading()
         let data=res.data
         if(!data.code)
         {
            wx.showToast({
               title: '商品添加成功',
             })
         }
         else{
           wx.showToast({
             icon: 'none',
             title: '商品添加失败',
           })
         }
       },
       fail:function(){
         wx.hideLoading()
         wx.showToast({
           icon:'none',
           title: '商品添加失败',
         })
       }
     })
  }
})