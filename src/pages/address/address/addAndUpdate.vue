<template>
  <view class="add-and-updata-wrap">
    <view class="content">
      <view class="grace-form">
        <form @submit="formSubmit">
          <view class="grace-items">
            <view class="grace-label">
              <text class="write">*</text>
              <text>单位名称</text>
            </view>
            <input
              type="text"
              class="input"
              name="consigneeUnit"
              v-model="form.addrUnit"
              placeholder="请输入单位名称"
              placeholder-style="color:#B8B8B8;"
            >
          </view>
          <view class="grace-items">
            <view class="grace-label">
              <text class="write">*</text>
              <text>联系人姓名</text>
            </view>
            <input
              type="text"
              class="input"
              name="consigneeName"
              v-model="form.addrName"
              placeholder="请输入联系人姓名"
              placeholder-style="color:#B8B8B8;"
            >
          </view>
          <view class="grace-items">
            <view class="grace-label">
              <text class="write">*</text>
              <text>联系电话</text>
            </view>
            <input
              type="text"
              class="input"
              name="consigneeTel"
              v-model="form.addrTel"
              placeholder="请输入联系电话"
              placeholder-style="color:#B8B8B8;"
            >
          </view>
          <view class="grace-items">
            <view class="grace-label">
              <text class="write">*</text>
              <text>所属地区</text>
            </view>
            <div @click="showPicker" class="input addrStyle" v-if="addrArea">
              {{addrArea}}
              <text class="icon"></text>
            </div>
            <div @click="showPicker" class="input addrStyle" v-if="!addrArea">
              请选择
              <text class="icon"></text>
            </div>
            <mpvue-city-picker
              ref="mpvueCityPicker1"
              :pickerValueDefault="pickerValueDefault"
              @onConfirm="onConfirm"
            ></mpvue-city-picker>
          </view>
          <view class="grace-items">
            <view class="grace-label">
              <text class="write">*</text>
              <text>详细地址</text>
            </view>
            <input
              type="text"
              class="input"
              name="consigneeAddress"
              v-model="form.addrDetail"
              placeholder="请输入详细地址"
              placeholder-style="color:#B8B8B8;"
            >
          </view>

          <view class="fill"></view>
          <view class="bottom-button-wrap">
            <button formType="submit" type="primary">保存</button>
          </view>
        </form>
      </view>
    </view>
  </view>
</template>

<script>
import mpvueCityPicker from "@/components/mpvue-citypicker";
import graceChecker from "@/graceUI/graceChecker.js";
import URL from "@/api/serverApi";
import { get, post } from "@/utils/request.js";
import { showToast } from "@/utils/show.js";

export default {
  components: {
    mpvueCityPicker
  },
  data() {
    return {
      pickerValueDefault: [0, 0, 0],
      type: "add",

      addrArea: "",
      addrCode: "",

      form: {
        addrUnit: "", //收货单位
        addrName: "", //收货人
        addrTel: "", //联系电话
        addrArea: "", //省市区 -
        addrCode: "", //-
        addrDetail: "" //详细地址
      }
    };
  },
  methods: {
    getDetail(id) {
      let url = URL.address.getconsignee;
      let obj = {
        addrId: id
      };
      get(url, obj).then(res => {
        console.log("获取地址", res);
        if (res.data) {
          let data = res.data;
          this.form.addrDetail = data.addrDetail; //+
          this.form.addrName = data.addrName; //+
          this.form.addrTel = data.addrTel; //+
          this.form.addrUnit = data.addrUnit; //+
          this.form.addrId = data.addrId; //+
          this.addrArea = data.addrArea; //+
          this.addrCode = data.addrCode; //+
          this.form.addrArea = data.addrArea;
          this.form.addrCode = data.addrCode;
          this.consigneeAddressName = data.addrArea;
        } else {
          showToast("联系人不存在");
          setTimeout(() => {
            uni.navigateBack();
          }, 1500);
        }
      });
    },
    showPicker() {
      this.$refs.mpvueCityPicker1.show();
    },
    onConfirm(e) {
      console.log("consigneeAddressName", e);

      this.consigneeAddressName = e.label.replace(/-/g, ",");
      this.consigneeAddressCode = e.cityCode.replace(/-/g, ",");
      this.addrArea = this.consigneeAddressName;
      this.addrCode = this.consigneeAddressCode;
      this.form.addrArea = this.consigneeAddressName;
      this.form.addrCode = this.consigneeAddressCode;
      console.log("this.form", this.form);
    },
    async formSubmit(e) {
      let _this = this;
      uni.hideKeyboard();
      // 表单验证
      let rule = [
        {
          name: "consigneeUnit",
          checkType: "notnull",
          errorMsg: "请输入单位名称"
        },
        {
          name: "consigneeName",
          checkType: "notnull",
          errorMsg: "请输入联系人姓名"
        },
        {
          name: "consigneeTel",
          checkType: "notnull",
          errorMsg: "请输入联系电话"
        },
        {
          name: "consigneeTel",
          checkType: "phoneno",
          errorMsg: "请输入正确联系电话"
        },
        {
          name: "consigneeAddress",
          checkType: "notnull",
          errorMsg: "请输入详细地址"
        }
      ];

      let url = "";

      let formData = e.detail.value;
      let addrFlag = false;
      console.log("formData + e:", e);

      console.log("formData", formData);

      if (
        this.consigneeAddressName == null ||
        this.consigneeAddressName == ""
      ) {
        addrFlag = true;
      }
      if (this.type === "add") {
        url = URL.address.addconsignee;
      } else if (this.type === "edit") {
        url = URL.address.editconsignee;
      }

      let checkRes = graceChecker.check(formData, rule);
      if (checkRes) {
        if (addrFlag) {
          showToast("请选择所属地区");
          return;
        }
        uni.showLoading({
          mask: true
        });
        console.log("地址路径", url, _this.form);

        await post(url, _this.form).then(res => {
          uni.hideLoading();
          if (this.type === "add") {
            showToast("添加成功");
          } else if (this.type === "edit") {
            showToast("更新成功");
          }
          //跳转到列表页
          setTimeout(() => {
            uni.navigateBack();
          }, 1500);
        });
      } else {
        showToast(graceChecker.error);
      }
    }
  },
  onLoad(options) {
    console.log("options", options);
    if (options.id !== undefined) {
      this.type = "edit";
      uni.setNavigationBarTitle({
        title: "修改地址"
      });
      this.getDetail(options.id);
    }
  }
};
</script>

<style lang="scss">
@import "@/style/index.scss";

.add-and-updata-wrap {
  background-color: #fff;

  .title {
    background-color: #f8f8f8;
    width: 100%;
    height: 100upx;
    line-height: 100upx;

    .select {
      display: flex;

      .lableStyle {
        margin-left: 80upx;
        display: flex;
      }
    }
  }

  .content {
    .grace-items {
      padding-left: 20upx;

      .grace-label {
        width: 260upx;
        font-size: 32upx;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }

      .input {
        text-align: right;
        padding-right: 40upx;
      }

      .uni-input {
        text-align: right;
        padding-right: 50upx;
      }

      .write {
        color: red;
      }

      .icon {
        float: right;
        padding-right: 50upx;
      }

      .right {
        padding-top: 25upx;
        padding-right: 50upx;

        image {
          @include size(36upx, 36upx);
        }
      }
    }
  }

  .btn {
    background: #fff;
    position: fixed;
    bottom: 5upx;
    width: 100%;
    height: 120upx;

    z-index: 999;

    .btn-style {
      width: 80%;
      margin-top: 20upx;
    }
  }
}
</style>
