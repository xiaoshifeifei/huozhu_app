<template>
  <view class="order-list-wrap">
    <view class="positionCss">
      <search-input
        :searchKey.sync="searchParams.searchKey"
        :searchValue.sync="searchParams.searchValue"
        :selectListWrap="selectListWrap"
        @on-search="searchNow"
        @on-selectChange="clearSearch"
      />

      <scroll-view
        scroll-x
        class="navbar grace-tab-title grace-center"
        :style="{position:headerPosition,top:headerTop}"
      >
        <view
          class="nav-item"
          :class="{current: tabCurrentIndex === index}"
          v-for="(item, index) in navItem"
          :key="index"
          @click="tabClick(item,index)"
        >{{item.name}}</view>
      </scroll-view>
    </view>

    <view class="content">
      <view v-if="list.length == 0">
        <view class="not-find-data">暂无数据</view>
      </view>
      <view v-else>
        <orderContent :orderlist="list" @cancleOrder="handleCancle"></orderContent>
        <graceLoading :loadingType="loadingType"></graceLoading>
      </view>
    </view>
  </view>
</template>

<script>
import URL from "@/api/serverApi";
import { get, post } from "@/utils/request";
import searchInput from "@/components/search-input/search-input.vue";
import graceLoading from "graceUI/components/graceLoading.vue";
import { showToast, showLoading, hideLoading } from "@/utils/show.js";
import orderContent from "./orderContent.vue";
import {
  transporttype,
  status,
  takedeliveryway,
  deliverytype,
  carStatus
} from "@/utils/type.js";

export default {
  components: {
    searchInput,
    graceLoading,
    orderContent
  },
  data() {
    return {
      goodsName: "",
      loadingType: 0,
      searchParams: {
        searchKey: "orderNo",
        searchValue: "",
        pageNo: 1,
        pageSize: 20,
        status: ""
      },
      selectListWrap: {
        index: 0,
        selectList: [
          {
            label: "订单编号",
            value: "orderNo"
          },
          {
            label: "收货人地区",
            value: "receiverAddress"
          },
          {
            label: "发货人地区",
            value: "shipperAddress"
          },
          {
            label: "订单状态",
            value: "status"
          }
        ]
      },

      headerPosition: "fixed",
      headerTop: "60px",
      tabCurrentIndex: 0,
      navItem: [
        {
          name: "全部",
          value: ""
        },
        {
          name: "待修改",
          value: 4
        },
        {
          name: "待接单",
          value: 1
        },
        {
          name: "待派单",
          value: 2
        },
        {
          name: "部分派车",
          value: 8
        },
        {
          name: "运输中",
          value: 9
        },
        {
          name: "已完成",
          value: 12
        }
      ],

      list: [],
      sendOrderVo: {},
      transporttype: transporttype,
      status: status,
      takedeliveryway: takedeliveryway,
      deliverytype: deliverytype,
      carStatus: carStatus
    };
  },
  methods: {
    searchNow(e) {
      console.log("获取的值", e);

      this.searchParams[this.searchParams.searchKey] = e;

      if (e == "待接单") {
        this.searchParams.status = 1;
      } else if (e == "待派单") {
        this.searchParams.status = 2;
      } else if (e == "企业已接单") {
        this.searchParams.status = 3;
      } else if (e == "拒接订单") {
        this.searchParams.status = 4;
      } else if (e == "货主取消订单") {
        this.searchParams.status = 5;
      } else if (e == "调度中") {
        this.searchParams.status = 6;
      } else if (e == "派给下游企业") {
        this.searchParams.status = 7;
      } else if (e == "部分派车") {
        this.searchParams.status = 8;
      } else if (e == "运输中") {
        this.searchParams.status = 9;
      } else if (e == "部分签收") {
        this.searchParams.status = 10;
      } else if (e == "签收") {
        this.searchParams.status = 11;
      } else if (e == "完成") {
        this.searchParams.status = 12;
      }
      console.log("this.searchParams", this.searchParams);

      this.getlist();
    },
    clearSearch() {
      this.searchParams[this.searchParams.searchKey] = "";
      this.searchParams.searchValue = "";
    },
    //筛选点击
    tabClick(e, index) {
      console.log("e", e, index);

      this.tabCurrentIndex = index;
      this.searchParams.status = e.value;
      this.clearSearch();
      this.searchParams.pageSize = 20;
      this.list = [];
      this.getlist();
    },
    getlist() {
      showLoading("正在加载中");
      var _this = this;
      get(URL.order.orderlist, this.searchParams).then(res => {
        console.log("resresres", res);

        this.list = res.data.list.map(item => {
          let shipperAddress = item.shipperAddress.substring(
            0,
            item.shipperAddress.lastIndexOf(",")
          );
          shipperAddress = shipperAddress.replace(
            /[\u5E02\u8F96\u533A\u7701,]*/g,
            ""
          );

          let receiverAddress = item.receiverAddress.substring(
            0,
            item.receiverAddress.lastIndexOf(",")
          );
          receiverAddress = receiverAddress.replace(
            /[\u5E02\u8F96\u533A\u7701,]*/g,
            ""
          );
          let state = this.setData(
            this.status.filter((v, i) => i === item.status)
          );

          let goodsData = JSON.parse(item.goodsEntities);
          goodsData.forEach(item => {
            _this.goodsName = item.goodsName;
            var length = _this.goodsName.length;
            if (length > 9) {
              _this.goodsName = _this.goodsName.substring(0, 8) + "...";
            }
          });

          if (item.deliveryTime == null) {
            item.deliveryTime = "";
          }
          let option = "";
          if (item.status == 1) {
            option = "1"; //待接单可修改
          } else if (item.status == 9 || item.status == 12) {
            option = "2"; //有派车单号
          } else if (item.status == 4) {
            option = "3"; //待修改
          }
          if (item.takeDeliveryWay == 1) {
            item.takeDeliveryWay = "到站装货";
          } else {
            item.takeDeliveryWay = "指定地点装货";
          }

          if (item.deliveryType == 1) {
            item.deliveryType = "上门自取";
          } else {
            item.deliveryType = "送货上门";
          }

          if (item.sendOrderVo != undefined) {
            if (item.sendOrderVo.status == "NEW") {
              item.sendOrderVo.status = "新建";
            } else if (item.sendOrderVo.status == "REFUSE") {
              item.sendOrderVo.status = "拒接派车单";
            } else if (item.sendOrderVo.status == "DISPATCHED") {
              item.sendOrderVo.status = "已派车";
            } else if (item.sendOrderVo.status == "PICKUP_PLACE_OF_DELIVERY") {
              item.sendOrderVo.status = "前往提货地";
            } else if (item.sendOrderVo.status == "ARRIVE_PLACE_OF_DELIVERY") {
              item.sendOrderVo.status = "抵达提货点";
            } else if (item.sendOrderVo.status == "LOADING_FINISHED") {
              item.sendOrderVo.status = "装车完成";
            } else if (item.sendOrderVo.status == "TRANSPORTATIONED") {
              item.sendOrderVo.status = "已发车";
            } else if (
              item.sendOrderVo.status == "ARRIVE_PLACE_OF_DESTINATION"
            ) {
              item.sendOrderVo.status = "抵达目的地";
            } else if (item.sendOrderVo.status == "UNLOADING_FINISHED") {
              item.sendOrderVo.status = "卸货完成";
            } else if (item.sendOrderVo.status == "SIGN_FOR") {
              item.sendOrderVo.status = "签收";
            } else if (item.sendOrderVo.status == "COMPLETED") {
              item.sendOrderVo.status = "完成";
            } else {
              item.sendOrderVo.status = "结束服务";
            }
            _this.sendOrderVo = item.sendOrderVo;
          }

          return {
            goodsName: _this.goodsName,
            orderId: item.orderId,
            transportType: this.setData(
              this.transporttype.filter(v => v.value === item.transportType)
            ),
            shipperAddress: shipperAddress,
            receiverAddress: receiverAddress,
            state: state,
            takeDeliveryWay: item.takeDeliveryWay,
            takeDeliveryTime: item.takeDeliveryTime,
            // takeDeliveryWay: this.setData(
            //   this.takedeliveryway.filter(v => v.value === item.takeDeliveryWay)
            // ),
            deliveryType: item.deliveryType,
            sendOrderVo: _this.sendOrderVo,
            // deliveryType: this.setData(
            //   this.deliverytype.filter(v => v.value === item.deliveryType)
            // ),
            orderNo: item.orderNo,
            receiverPerson: item.receiverPerson,
            receiverTel: item.receiverTel,
            deliveryTime: item.deliveryTime,
            option: option
          };
        });
        console.log(5, this.list);
        this.loadingType = 2;
        hideLoading();
        uni.stopPullDownRefresh();
      });
    },
    setData(arr) {
      if (arr.length == 0) {
        return "";
      } else {
        return arr[0].lable;
      }
    },
    handleCancle(e) {
      console.log("取消e", e);

      post(URL.order.cancleorder, {
        orderId: e
      }).then(res => {
        showToast("取消成功");
        this.getlist();
      });
    }
  },
  onLoad(options) {
    // #ifdef H5
    this.headerTop =
      document.getElementsByTagName("uni-page-head")[0].offsetHeight +
      60 +
      "px";
    // #endif
    this.getlist();
    console.log(7878);
  },
  onShow() {
    get(URL.user.getuserinfo, {}).then(res => {
      this.getlist();
    });
  },
  onPageScroll(e) {
    //兼容iOS端下拉时顶部漂移
    if (e.scrollTop >= 0) {
      this.headerPosition = "fixed";
    } else {
      this.headerPosition = "absolute";
    }
  },
  onPullDownRefresh() {
    if (this.tabCurrentIndex === 0) {
      this.searchParams.pageSize = 20;
    }

    this.getlist();
  },
  onReachBottom() {
    this.loadingType = 1;
    if (this.tabCurrentIndex === 0) {
      this.searchParams.pageSize += 20;
    }
    this.getlist();
    hideLoading();
  }
};
</script>

<style lang="scss">
@import "@/style/index.scss";

page,
.order-list-wrap {
  background: #ffffff;
}

.order-list-wrap {
  padding-top: 90upx;

  .positionCss {
    width: 100%;

    position: fixed;
    top: var(--window-top);
    z-index: 999;
    background: #ffffff;

    .navbar {
      left: 0;
      top: var(--window-top);
      display: flex;
      flex-direction: row;
      width: 100%;
      height: 84upx;
      background: #fff;
      box-shadow: 0 2upx 10upx rgba(0, 0, 0, 0.06);
      z-index: 10;

      .nav-item {
        display: inline-block;
        justify-content: center;
        align-items: center;
        height: 100%;
        font-size: 32upx;
        color: #868686;
        position: relative;

        &.current {
          color: #3e7bff;

          &:after {
            content: "";
            position: absolute;
            left: 50%;
            bottom: 0;
            transform: translateX(-50%);
            width: 120upx;
            height: 0;
            border-bottom: 4upx solid #3e7bff;
          }
        }
      }
    }
  }

  .content {
    margin: 140upx 10upx;
  }
}

.grace-tab-title view {
  margin: 0 !important;
}
</style>
