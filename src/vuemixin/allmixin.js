export const vuemixin = {
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    routerPush (name, params, query) {
      params = params || {}
      query = query || {}
      this.$router.push({ name, params, query })
    },
    routerReplace (name, params, query) {
      params = params || {}
      query = query || {}
      this.$router.replace({ name, params, query })
    },
    goBack () {
      this.$router.go(-1)
    },
    shareToWechat(paramsUrl, wxData) {
      // 微信分享
      // this.axios.post(portUrl.weChat, {url: window.location.href.split('#')[0]})
      //   .then((res) => {
      //     const data = JSON.parse(res.data);
      //     if (data.code === '0000') {
      //       const timestamp = data.weChatShareMassage.timestamp;
      //       const nonceStr = data.weChatShareMassage.noncestr;
      //       const signature = data.weChatShareMassage.signature;
      //       const _this = this
      //       wx.config({  
      //         debug: false, //开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。  
      //         appId: _this.appId, // 必填，公众号的唯一标识  
      //         timestamp, // 必填，生成签名的时间戳  
      //         nonceStr, // 必填，生成签名的随机串  
      //         signature, // 必填，签名，见附录1  
      //         jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ'] // 必填，需要使用的JS接口列表，所有JS接口列表见微信开放平台文档
      //       })
      //        wx.ready(function() {
      //         // 分享到朋友圈
      //         wx.onMenuShareTimeline({  
      //           title: wxData.title, // 分享标题  
      //           link: wxData.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致  
      //           imgUrl: wxData.img, // 分享图标
      //           desc: wxData.desc, //描述
      //           success () {  
      //             // alert('分享朋友圈成功')  
      //             // 用户确认分享后执行的回调函数  
      //           },  
      //           cancel () {  
      //             // 用户取消分享后执行的回调函数  
      //           }  
      //         })  
      //        // 分享到朋友
      //         wx.onMenuShareAppMessage({  
      //           title: wxData.title, // 分享标题  
      //           link: wxData.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致  
      //           imgUrl: wxData.img, // 分享图标
      //           desc: wxData.desc, //描述
      //           success: function () {  
      //             // alert  
      //             // alert(wxData.url)
      //             // alert(wxData.title)

      //             // 用户确认分享后执行的回调函数  
      //           },  
      //           cancel: function () {  
      //             // 用户取消分享后执行的回调函数  
      //           }  
      //         })  
      //         // 分享到qq
      //         wx.onMenuShareQQ({
      //           title: wxData.title, // 分享标题  
      //           link: wxData.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致  
      //           imgUrl: wxData.img, // 分享图标
      //           desc: wxData.desc, //描述
      //           success: function () {
      //              // 用户确认分享后执行的回调函数
      //           },
      //           cancel: function () {
      //              // 用户取消分享后执行的回调函数
      //           }
      //         });

      //         wx.error(function (res) {  
      //           console.log('验证失败返回的信息:',res);  
      //         });
              
      //        });
          }
        }).catch((err) => {
          console.log(err);
        })
    }
  },
  computed: {
  }
}
