<template>
  <view>
    <!-- 跳到地图页 -->
    <web-view :src="srcUrl"></web-view>
  </view>
</template>

<script>
import URL from "@/api/serverApi";
import { get, post } from "@/utils/request";
export default {
  data() {
    return {
      srcUrl: "/hybrid/html/map.html"
    };
  },
  onLoad() {
    let options = uni.getStorageSync("type");
    let sessionId = uni.getStorageSync("sessionId");

    let beginTime = options.beginTime;
    let busNum = options.busNum;
    let orderNo = options.orderNo;
    let signTime = options.signTime;
    let waybillSendId = options.waybillSendId;

    this.srcUrl =
      "/hybrid/html/map.html" +
      "?name=" +
      encodeURIComponent(sessionId) +
      "&beginTime=" +
      encodeURIComponent(beginTime) +
      "&busNum=" +
      encodeURIComponent(busNum) +
      "&orderNo=" +
      encodeURIComponent(orderNo) +
      "&signTime=" +
      encodeURIComponent(signTime) +
      "&waybillSendId=" +
      encodeURIComponent(waybillSendId);
  }
};
</script>
