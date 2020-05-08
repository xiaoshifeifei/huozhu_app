<template>
  <view class="address-wrap">
    <view class="positionCss">
      <view class="tab-wrap">
        <view class="tab">
          <view
            class="tab-item"
            v-for="(item, index) in tabList"
            :key="index"
            :class="{ 'active-item': tabCurrentIndex === index }"
            @tap="tabChange(item, index)"
          >
            <view class="title">{{ item.name }}</view>
          </view>
        </view>
      </view>

      <search-input
        :searchKey.sync="searchParams.searchKey"
        :searchValue.sync="searchParams.searchValue"
        :selectListWrap="selectListWrap"
        @on-search="searchNow"
        @on-selectChange="clearSearch"
      />
    </view>

    <view class="divider"></view>

    <view class="content">
      <view v-if="list.length === 0">
        <view class="not-find-data">暂无数据</view>
      </view>
      <view v-else>
        <view v-if="tabCurrentIndex == 0">
          <addressContent
            :addresslist="list"
            @goAddrDetail="handleAddrDetail"
            @delAddr="handleAddrDel"
          ></addressContent>
        </view>
        <view v-if="tabCurrentIndex == 1">
          <goodsContent
            :goodslist="list"
            @goGoodsDetail="handleGoodsDetail"
            @delGoods="handleGoodsDel"
          ></goodsContent>
        </view>
        <graceLoading :loadingType="loadingType"></graceLoading>
      </view>
    </view>

    <view class="fill"></view>
    <view class="bottom-button-wrap">
      <button type="primary" @tap="goToAdd">新增</button>
    </view>
  </view>
</template>

<script>
import URL from "@/api/serverApi";
import { get, post } from "@/utils/request";
import searchInput from "@/components/search-input/search-input.vue";
import addressContent from "./address/addresscontent.vue";
import goodsContent from "./goods/goodscontent.vue";
import graceLoading from "graceUI/components/graceLoading.vue";
import { showToast, showLoading, hideLoading } from "@/utils/show.js";
import { goodstype, units } from "@/utils/type.js";

export default {
  components: {
    searchInput,
    addressContent,
    goodsContent,
    graceLoading
  },
  data() {
    return {
      tabCurrentIndex: 0,
      tabList: [
        {
          name: "地址管理",
          value: "1"
        },
        {
          name: "物品管理",
          value: "2"
        }
      ],

      searchParams: {
        searchKey: "consigneeName",
        searchValue: "",
        pageNo: 1,
        pageSize: 20
      },
      selectListWrap: {
        index: 0,
        selectList: []
      },

      selectAddrList: [
        {
          label: "联系人姓名",
          value: "addrName"
        },
        {
          label: "联系人电话",
          value: "addrTel"
        },
        {
          label: "单位名称",
          value: "addrUnit"
        }
      ],

      selectGoodsList: [
        {
          label: "物品名称",
          value: "goodsName"
        }
      ],

      list: [],
      loadingType: 0,

      goodstype: goodstype,
      units: units
    };
  },
  methods: {
    tabChange(e, index) {
      this.tabCurrentIndex = index;
      if (this.tabCurrentIndex === 0) {
        this.searchParams.searchKey = "consigneeName";
        this.selectListWrap.selectList = this.selectAddrList;
      } else if (this.tabCurrentIndex === 1) {
        this.searchParams.searchKey = "goodsName";
        this.selectListWrap.selectList = this.selectGoodsList;
      }
      this.clearSearch();

      this.searchParams.pageSize = 20;
      this.list = [];
      this.updataList();
    },
    searchNow(e) {
      this.searchParams[this.searchParams.searchKey] = e;
      this.updataList();
    },
    clearSearch() {
      this.searchParams[this.searchParams.searchKey] = "";
      this.searchParams.searchValue = "";
    },
    handleAddrDetail(e) {
      console.log("eeee", e);
      //地址
      uni.navigateTo({
        url: `/pages/address/address/addAndUpdate?id=${e.id}`
      });
    },
    handleAddrDel(e) {
      //删除地址
      post(URL.address.delconsignee, {
        addrId: e.id
      }).then(res => {
        showToast("删除成功");
        this.updataList();
      });
    },
    handleGoodsDetail(e) {
      //货物
      uni.navigateTo({
        url: `/pages/address/goods/addAndUpdate?id=${e.id}`
      });
    },
    handleGoodsDel(e) {
      //删除货物
      post(URL.address.delgoods, {
        goodsId: e.id
      }).then(res => {
        showToast("删除成功");
        this.updataList();
      });
    },
    goToAdd() {
      let url = "";
      if (this.tabCurrentIndex === 0) {
        //地址
        url = `/pages/address/address/addAndUpdate`;
      } else if (this.tabCurrentIndex === 1) {
        //物品
        url = `/pages/address/goods/addAndUpdate`;
      }
      uni.navigateTo({
        url: url
      });
    },
    updataList() {
      let _this = this;
      showLoading("正在加载中");
      let url = "";
      if (this.tabCurrentIndex === 0) {
        url = URL.address.consigneelist;
      } else if (this.tabCurrentIndex === 1) {
        url = URL.address.goodspage;
      }
      post(url, this.searchParams)
        .then(res => {
          // console.log("ressearchParams", res.data.list);
          // console.log("_this.tabCurrentIndex1", _this.tabCurrentIndex);

          if (_this.tabCurrentIndex === 0) {
            console.log("res.data.list", res.data.list);
            _this.list = res.data.list.map(item => {
              return {
                id: item.addrId,
                unit: item.addrUnit,
                name: item.addrName,
                tel: item.addrTel,
                address: item.addrArea.replace(/,/g, "")
              };
            });
          } else if (_this.tabCurrentIndex === 1) {
            _this.list = res.data.list.map(item => {
              return {
                id: item.goodsId,
                goodsName: item.goodsName,
                type: this.setData(
                  this.goodstype.filter(v => v.value === item.goodsType)
                ),
                number:
                  item.number +
                  this.setData(this.units.filter(v => v.value === item.unit)),
                weight: item.weight,
                volume: item.volume
              };
            });
            console.log(3);
          }

          _this.loadingType = 2;
          hideLoading();
          uni.stopPullDownRefresh();
        })
        .catch(res => {
          console.log(2);
          hideLoading();
        });
    },
    setData(arr) {
      if (arr.length == 0) {
        return "";
      } else {
        return arr[0].lable;
      }
    }
  },
  onShow() {
    if (this.tabCurrentIndex === 0) {
      this.selectListWrap.selectList = this.selectAddrList;
    } else if (this.tabCurrentIndex === 1) {
      this.selectListWrap.selectList = this.selectGoodsList;
    }
    this.updataList();
    console.log("this.list.length", this.list.length);
  },
  onPullDownRefresh() {
    this.searchParams.pageSize = 20;

    this.updataList();
  },
  onReachBottom() {
    this.loadingType = 1;
    this.searchParams.pageSize += 20;
    this.updataList();
    hideLoading();
  },
  onPageScroll(e) {
    //兼容iOS端下拉时顶部漂移
    if (e.scrollTop >= 0) {
      this.headerPosition = "fixed";
    } else {
      this.headerPosition = "absolute";
    }
  }
};
</script>

<style lang="scss">
@import "@/style/index.scss";

.address-wrap {
  .positionCss {
    position: fixed;
    top: 0%;
    /* #ifdef H5 */
    top: 7%;
    /* #endif */
    // left:5%;
    z-index: 999;
    background: #ffffff;
    width: 100%;
  }

  .tab-wrap {
    margin: 20upx 0 0 5%;
    width: 90%;

    .tab {
      height: 65upx;
      display: flex;

      .tab-item {
        width: 50%;
        margin: 0 auto;
        border: 1upx solid #0079fe;
        color: #0079fe;
        text-align: center;

        .title {
          margin-top: 10upx;
        }
      }
    }
  }

  .active-item {
    background-color: #0079fe;
    color: #fff !important;
  }

  .content {
    padding: 0 40upx;

    .not-found {
      text-align: center;
      margin-top: 200upx;
      color: #777;
    }
  }

  .divider {
    margin-top: 220upx;
  }
}
</style>
