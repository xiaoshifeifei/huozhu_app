<template>
  <view class="grace-margin login-wrap" style="padding: 35upx">
    <!-- <view style="margin-top:50px; margin-bottom:50px;" class="grace-center">
			<image :src="avator" style="width:200upx; height:200upx; border-radius:8px;"></image>
		</view> -->
    <view class="title">
      你好，欢迎登录！
    </view>
    <form @submit="loginNow" class="grace-form">
      <view class="grace-items topclass">
        <view class="grace-label" style="width: 80upx">
          <view class="icon-img-wrap">
            <image src="/static/image/login/mobile.jpg" mode="widthFix"></image>
          </view>
        </view>
        <input
          type="number"
          name="uname"
          class="input"
          v-model="form.username"
          style="text-align: left; margin-left: 0"
          placeholder="请输入手机号/登录名"
        />
      </view>
      <view class="grace-items">
        <view class="grace-label" style="width: 80upx">
          <view class="icon-img-wrap">
            <image src="/static/image/login/lock.jpg" mode="widthFix"></image>
          </view>
        </view>
        <input
          v-if="isShowPwd"
          type="text"
          @focus="handleFocus"
          name="pw"
          class="input"
          v-model="form.passwordNew"
          style="text-align: left; margin-left: 0"
          placeholder="请输入密码"
        />
        <input
          v-else
          type="password"
          name="pw"
          @focus="handleFocus"
          class="input"
          v-model="form.passwordNew"
          style="text-align: left; margin-left: 0"
          placeholder="请输入密码"
        />
        <switch name="switch" :checked="isShowPwd" @change="handleChange" />
      </view>
      <button
        form-type="submit"
        type="primary"
        style="background:#3688FF; margin-top:30px;"
      >
        登录
      </button>
    </form>
    <view class="grace-space-between" style="margin-top: 60upx">
      <view class="action">
        <navigator url="../register/index" hover-class="none"
          >新用户注册</navigator
        >
      </view>
      <view class="action">
        <navigator url="../findpwd/index" hover-class="none"
          >找回密码</navigator
        >
      </view>
    </view>
  </view>
</template>

<script>
var graceChecker = require('graceUI/graceChecker.js')
import URL from '@/api/serverApi'
import { get, post } from '@/utils/request'
import md5 from 'utils/md5'

export default {
  data() {
    return {
      avator: '/static/image/login/header.png',
      form: {
        // username: "18960418229 18959152137 17359132801 18559057925",
        username: '',
        passwordNew: ''
	  },
	  loginData: {
        brand: '',
        deviceCode: '',
        engVersion: '',
        model: '',
        platform: '',
        system: ''
      },
	  isShowPwd: false,
	  uuid: '' //设备编号
    }
  },
  onShow() {
  
    let _this = this
    this.handleFocus()
    plus.device.getInfo({
      success: function(e) {
        console.log('getDeviceInfo success: ' + JSON.stringify(e))
        _this.uuid = e.uuid //获取设备编号
        uni.setStorageSync('uuid', e.uuid)
      },
      fail: function(e) {
        console.log('getDeviceInfo failed: ' + JSON.stringify(e))
      }
    })
  },
  methods: {
    loginNow(e) {
      var _this = this
      // 表单验证
      var rule = [
        {
          name: 'uname',
          checkType: 'notnull',
          errorMsg: '请输入手机号/登录名'
        },
        {
          name: 'pw',
          checkType: 'notnull',
          errorMsg: '请输入密码'
        }
      ]
      var formData = e.detail.value
      var checkRes = graceChecker.check(formData, rule)
      // 验证通过
      if (checkRes) {
        uni.showLoading({
          title: '登录中',
          mask: true
        })
        const formClone = {
          userLogin: _this.form.username,
		      password: md5(_this.form.passwordNew),
          brand: _this.loginData.brand,
          deviceCode: this.uuid,
          engVersion: this.loginData.engVersion,
          model: _this.loginData.model,
          platform: _this.loginData.platform,
          system: _this.loginData.system,
    }
    console.log('formClone，formClone',formClone);
        post(URL.login, formClone).then(res => {
          uni.setStorageSync('userIdNo',res.data.idNo)
          uni.setStorageSync('userInfoToken',res.data.loginName)
          uni.setStorageSync('sessionId', res.sessionId)
          _this.getLoginInfo()
        })
      } else {
        uni.hideLoading()
        uni.showToast({
          title: graceChecker.error,
          icon: 'none'
        })
      }
    },
    getLoginInfo() {
      get(URL.user.getuserinfo, {}).then(res => {
        uni.showToast({
          title: '登录成功',
          icon: 'none',
          success: () => {
            uni.setStorageSync('userInfo', res.data)
            let isCompany = res.data.isCompany
            let companyId = res.data.companyId
            let flag = false
            if (isCompany) {
              //企业
              if (companyId == null) {
                //需完善
                flag = true
              } else {
                flag = false
              }
            } else {
              //个人
              flag = false
            }
            if (flag) {
              setTimeout(() => {
                uni.navigateTo({
                  url: '/pages/company/index'
                })
              }, 500)
            } else {
              setTimeout(() => {
                uni.switchTab({
                  url: '/pages/index/index'
                })
              }, 500)
            }
          },
          fail: () => {
            uni.showToast({
              title: res.msg,
              icon: 'none'
            })
            uni.hideLoading()
          }
        })
      })
    },
    handleFocus() {
      // if (this.form.username !== '') {
      // 	get(URL.getAvator, { loginName: this.form.username })
      // 	.then(res => {
      // 		if (res.data != null) this.avator = res.data.photo
      // 		else this.avator = '/static/image/login/header.png'
      // 	})
	  // }
	    var _this = this
      uni.getSystemInfo({
        success: function(res) {

          // 上线改为这两句
          _this.loginData.brand = res.brand
          _this.loginData.engVersion = res.version
          _this.loginData.model = res.model
          _this.loginData.platform = res.platform
          _this.loginData.system = res.system
          // 获取设备编号
        }
      })
    },
    handleChange(e) {
      this.isShowPwd = e.detail.value
    }
  }
}
</script>

<style lang="less">
.login-wrap {
  .title {
    margin: 120upx 0 120upx 20upx;
    font-size: 60upx;
    color: #4d4d4d;
  }

  .action {
    width: 50%;
    text-align: center;
    color: #007aff;
  }

  .grace-items {
    background-color: #fff;
    border: #e4e4e4 1px solid;
    border-top: none;
  }

  .topclass {
    border-top: #e4e4e4 1px solid;
  }

  .icon-img-wrap {
    margin: 0 auto;
    margin-top: 16upx;
    width: 40upx;
    height: 40upx;

    image {
      width: 100%;
    }
  }
}
</style>
