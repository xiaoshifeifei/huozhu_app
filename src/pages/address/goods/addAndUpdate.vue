<template>
  <view class="add-and-updata-wrap">
    <view class="content">
      <view class="grace-form">
        <form @submit="formSubmit">
          <view class="grace-items">
            <view class="grace-label">
              <text class="write">*</text>
              <text>物品名称</text>
            </view>
            <input
              type="text"
              class="input"
              name="goodsName"
              v-model="form.goodsName"
              placeholder="请输入物品名称"
              placeholder-style="color:#B8B8B8;"
            >
          </view>
          <view class="grace-items">
            <view class="grace-label">
              <text class="write">*</text>
              <text>物品类型</text>
            </view>
            <picker
              mode="selector"
              name="goodsType"
              :range="goodsTypeListWrap.goodsTypeList"
              range-key="lable"
              @change="handleChange($event, 'goodsType')"
              :value="goodsTypeListWrap.index"
            >
              <view
                class="uni-input"
                v-if="form.goodsType"
              >{{ goodsTypeListWrap.goodsTypeList[goodsTypeListWrap.index].lable }}</view>
              <text class="custom-placeholder" v-else>请选择物品类型</text>
            </picker>
          </view>
          <view class="grace-items">
            <view class="grace-label">
              <text class="write">*</text>
              <text>物品数量</text>
            </view>
            <input
              type="text"
              class="input"
              name="number"
              v-model="form.number"
              placeholder="请输入物品数量"
              placeholder-style="color:#B8B8B8;"
            >
          </view>
          <view class="grace-items">
            <view class="grace-label">
              <text class="write">*</text>
              <text>物品单位</text>
            </view>
            <picker
              mode="selector"
              name="unit"
              :range="unitListWrap.unitList"
              range-key="lable"
              @change="handleChange($event, 'unit')"
              :value="unitListWrap.index"
            >
              <view
                class="uni-input"
                v-if="form.unit"
              >{{ unitListWrap.unitList[unitListWrap.index].lable }}</view>
              <text class="custom-placeholder" v-else>请选择物品单位</text>
            </picker>
          </view>
          <view class="grace-items">
            <view class="grace-label">
              <text class="write">*</text>
              <text>物品重量(吨)</text>
            </view>
            <input
              type="text"
              class="input"
              name="weight"
              v-model="form.weight"
              placeholder="请输入物品重量"
              placeholder-style="color:#B8B8B8;"
            >
          </view>
          <view class="grace-items">
            <view class="grace-label">
              <text class="write">*</text>
              <text>物品体积(m³)</text>
            </view>
            <input
              type="text"
              class="input"
              name="volume"
              v-model="form.volume"
              placeholder="请输入物品体积"
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
import graceChecker from "@/graceUI/graceChecker.js";
import URL from "@/api/serverApi";
import { get, post } from "@/utils/request.js";
import { goodstype, units } from "@/utils/type.js";
import { showToast, showLoading, hideLoading } from "@/utils/show.js";

export default {
  data() {
    return {
      type: "add",

      goodsTypeListWrap: {
        index: 0,
        goodsTypeList: goodstype
      },
      unitListWrap: {
        index: 0,
        unitList: units
      },

      form: {
        goodsId: "",
        goodsName: "",
        goodsType: "",
        number: "",
        unit: "",
        weight: "",
        volume: ""
      }
    };
  },
  methods: {
    handleChange(e, name) {
      let newName = name + "List";
      let listWrap = newName + "Wrap";
      this.form[name] = this[listWrap][newName][e.detail.value].value;
      this[listWrap].index = e.detail.value;
    },
    async formSubmit(e) {
      let _this = this;
      uni.hideKeyboard();
      // 表单验证
      let rule = [
        {
          name: "goodsName",
          checkType: "notnull",
          errorMsg: "请输入物品名称"
        },
        {
          name: "goodsType",
          checkType: "notnull",
          errorMsg: "请选择物品类型"
        },
        {
          name: "number",
          checkType: "notnull",
          errorMsg: "请输入数量"
        },
        {
          name: "number",
          checkType: "reg",
          checkRule: /^[0-9]+([.]{1}[0-9]+){0,1}$/,
          errorMsg: "请输入正确数量"
        },
        {
          name: "unit",
          checkType: "notnull",
          errorMsg: "请选择物品单位"
        },
        {
          name: "weight",
          checkType: "notnull",
          errorMsg: "请输入重量"
        },
        {
          name: "weight",
          checkType: "reg",
          checkRule: /^[0-9]+([.]{1}[0-9]+){0,1}$/,
          errorMsg: "请输入正确重量"
        },
        {
          name: "volume",
          checkType: "notnull",
          errorMsg: "请输入体积"
        },
        {
          name: "volume",
          checkType: "reg",
          checkRule: /^[0-9]+([.]{1}[0-9]+){0,1}$/,
          errorMsg: "请输入正确体积"
        }
      ];

      let url = "";

      let formData = e.detail.value;

      if (this.type === "add") {
        url = URL.address.addgoods;
      } else if (this.type === "edit") {
        url = URL.address.editgoods;
      }

      let checkRes = graceChecker.check(this.form, rule);
      if (checkRes) {
        showLoading("保存中");
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
    },
    getDetail(id) {
      let url = URL.address.getgoods;
      let obj = {
        goodsId: id
      };
      get(url, obj).then(res => {
        console.log("goodsdata", res);

        if (res.data) {
          let data = res.data;
          this.form.goodsId = data.goodsId;
          this.form.goodsName = data.goodsName;
          this.form.goodsType = data.goodsType;
          this.form.number = data.number;
          this.form.unit = data.unit;
          this.form.weight = data.weight;
          this.form.volume = data.volume;

          this.goodsTypeListWrap.goodsTypeList.forEach((item, index) => {
            if (item.value == this.form.goodsType) {
              this.goodsTypeListWrap.index = index;
            }
          });

          this.unitListWrap.unitList.forEach((item, index) => {
            if (item.value == this.form.unit) {
              this.unitListWrap.index = index;
            }
          });
        } else {
          showToast("物品不存在");
          setTimeout(() => {
            uni.navigateBack();
          }, 1500);
        }
      });
    }
  },
  onLoad(options) {
    if (options.id !== undefined) {
      this.type = "edit";
      uni.setNavigationBarTitle({
        title: "修改物品"
      });
      this.form.goodsId = options.id;
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
