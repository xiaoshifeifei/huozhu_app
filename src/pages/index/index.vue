<template>
  <view class="index-wrap">
    <!-- 头部轮播 -->
    <view class="grace-bg-white">
      <graceSwiper swiperId="garce-swiper-1" :items="swiperItems"></graceSwiper>
    </view>
    <!-- 公告轮播 -->
    <view class="grace-bg-white" style="margin: 28upx 0;">
      <graceSpeaker :icon="speakerIconImg" :msgs="speakerMsgs"></graceSpeaker>
    </view>
    <!-- 菜单 -->
    <view class="menu">
      <view class="nav-item">
        <view class="item item1" @tap="goToMenu('../order/tmsorder')">
          <text>TMS下单</text>
        </view>
        <!-- target:'': '../order/mulorder' -->
        <view class="item item2" @tap="goToMenu('')">
          <text>多式联运下单</text>
        </view>
      </view>
      <view class="addr-item">
        <view
          class="item"
          v-for="(item, index) in menuList1"
          :key="index"
          @tap="goToMenu(item.target)"
        >
          <text>{{ item.text }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import graceSwiper from "graceUI/components/graceSwiper.vue";
import graceSpeaker from "graceUI/components/graceSpeaker.vue";

import URL from "@/api/serverApi";
import { get, post } from "@/utils/request";

export default {
  components: {
    graceSwiper,
    graceSpeaker
  },
  data() {
    return {
      /**
       * @swiperItems 头部数据
       * @speakerIconImg 公告小喇叭
       * @speakerMsgs 公告内容
       */
      swiperItems: [
        {
          pic: "/static/image/index/banner.jpg"
        }
      ],
      speakerIconImg: "/static/image/index/speaker.png",
      speakerMsgs: [],
      menuList1: [
        {
          imgUrl: "/static/image/index/insurance.png",
          text: "常用信息管理",
          target: "../address/index"
        }
      ]
    };
  },
  methods: {
    goToMenu(item) {
      if (!item) {
        uni.showToast({
          title: "暂未开通此服务",
          icon: "none"
        });
        return;
      }
      uni.navigateTo({
        url: item
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/style/index.scss";

page {
  background: #f5f5f5;
}

.index-wrap {
  .menu {
    background: #fff;

    .nav-item {
      @include flex-bw;
      justify-content: space-start;

      .item {
        @include flex-column;
        width: 48%;
        height: 220upx;
        margin: 10upx 1%;
        // background: #D6EBF3;

        image {
          @include size(92upx, 92upx);
        }

        text {
          font-size: 32upx;
          font-weight: 800;
          color: #ffffff;
          margin-left: 40upx;
          // margin-top: 20upx;
        }
      }

      .item1 {
        background: url(../../static/image/index/tmsorder.png) no-repeat;
        background-size: 100% 100%;
      }

      .item2 {
        background: url(../../static/image/index/mulorder.png) no-repeat;
        background-size: 100% 100%;
      }
    }

    .addr-item {
      @include flex-bw;
      justify-content: space-start;

      .item {
        background: url(../../static/image/index/address.png) no-repeat;
        background-size: 100% 100%;
        @include flex-column;
        width: 98%;
        height: 220upx;
        margin: 10upx 1%;

        image {
          @include size(92upx, 92upx);
        }

        text {
          font-size: 32upx;
          font-weight: 800;
          color: #ffffff;
          margin-left: 120upx;
        }
      }
    }
  }
}
</style>
