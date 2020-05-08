<template>
  <view class="address-content-wrap">
    <uni-swipe-action
      v-for="(item, index) in addresslist"
      :key="index"
      :options="options"
      @click="delAddress(item)"
    >
      <view class="outer">
        <view class="card" @tap="detail(item)">
          <view class="center">
            <view class="first">
              <text>{{item.name}}</text>
            </view>
            <view class="second">
              <text>{{item.tel}}</text>
            </view>
          </view>
          <view class="all">
            <view class="first">
              <text>{{item.unit}}</text>
            </view>
          </view>
          <view class="all">
            <view class="first">
              <text>{{item.address}}</text>
            </view>
          </view>
        </view>
      </view>
    </uni-swipe-action>
  </view>
</template>

<script>
import URL from "@/api/serverApi";
import { get, post } from "@/utils/request.js";
import uniSwipeAction from "@/components/uni-swipe-action/uni-swipe-action.vue";

export default {
  components: {
    uniSwipeAction
  },
  props: {
    addresslist: Array
  },
  data() {
    return {
      options: [
        {
          id: "del",
          text: "删除"
        }
      ]
    };
  },
  methods: {
    detail(item) {
      this.$emit("goAddrDetail", item);
    },
    delAddress(item) {
      var _this = this;
      uni.showModal({
        title: "删除",
        content: "确定要删除此条记录？",
        success: function(res) {
          if (res.confirm) {
            _this.$emit("delAddr", item);
          }
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/style/index.scss";

.address-content-wrap {
  .outer {
    margin: 0 auto;
    background-color: #fff;
    // height: 190upx;
    // border: #ececec 1upx solid;
    // border-radius: 20upx;
    // margin-top: 20upx;
    // margin-bottom: 20upx;

    .card {
      width: 90%;
      height: 170upx;
      margin: 0 auto;
      // margin-top: 10upx;

      .center {
        width: 90%;
        display: flex;
        margin-top: 20upx;

        .first {
          margin-right: 30upx;
        }

        text {
          font-size: 30upx;
        }
      }

      .all {
        color: #929292;
        display: flex;
        margin-top: 15upx;
      }
    }
  }
}
</style>
