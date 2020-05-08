<template>
  <view class="order-wrap">
    <view class="grace-form">
      <form @submit="formSubmit">
        <view class="person">
          <view class="send">
            <view class="circle">
              <view class="img">
                <text>发</text>
              </view>
            </view>
            <view class="content">
              <view class="first">
                <view class="name">
                  <text v-if="form.shipperPerson">{{form.shipperPerson}}</text>
                  <text v-else>发货人</text>
                </view>
                <view class="tel">
                  <text v-if="form.shipperTel">{{form.shipperTel}}</text>
                  <text v-else>联系电话</text>
                </view>
              </view>
              <view class="second">
                <text v-if="form.shipperUnit">{{form.shipperUnit}}</text>
                <text v-else>发货单位</text>
              </view>
              <view class="third">
                <text v-if="form.shipperAddressDetial">{{shipperAddress}}</text>
                <text v-else>发货地址</text>
              </view>
            </view>

            <view class="select">
              <picker
                mode="selector"
                name="shipperId"
                :range="shipperIdListWrap.shipperIdList"
                range-key="shipperPerson"
                @change="handleChange($event, 'shipperId')"
              >
                <view class="point"></view>
              </picker>
            </view>
          </view>

          <view class="send get">
            <view class="circle">
              <view class="img img1">
                <text>收</text>
              </view>
            </view>
            <view class="content">
              <view class="first">
                <view class="name">
                  <text v-if="form.receiverPerson">{{form.receiverPerson}}</text>
                  <text v-else>收货人</text>
                </view>
                <view class="tel">
                  <text v-if="form.receiverTel">{{form.receiverTel}}</text>
                  <text v-else>联系电话</text>
                </view>
              </view>
              <view class="second">
                <text v-if="form.receiverUnit">{{form.receiverUnit}}</text>
                <text v-else>收货单位</text>
              </view>
              <view class="third">
                <text v-if="form.receiverAddressDetial">{{receiverAddress}}</text>
                <text v-else>收货地址</text>
              </view>
            </view>
            <view class="select">
              <picker
                mode="selector"
                name="receiverId"
                :range="receiverIdListWrap.receiverIdList"
                range-key="receiverPerson"
                @change="handleChange1($event, 'receiverId')"
              >
                <view class="point"></view>
              </picker>
            </view>
          </view>
        </view>

        <view class="division"></view>

        <view class="grace-items">
          <view class="grace-label">
            <text class="write">*</text>
            <text>运输类型</text>
          </view>
          <picker
            mode="selector"
            name="transportType"
            :range="transportTypeListWrap.transportTypeList"
            range-key="lable"
            @change="handleChange2($event, 'transportType')"
            class="pickerClass"
            :value="transportTypeListWrap.index"
          >
            <view
              class="uni-input"
              v-if="form.transportType"
            >{{ transportTypeListWrap.transportTypeList[transportTypeListWrap.index].lable }}</view>
            <text class="custom-placeholder" v-else>请选择运输类型</text>
          </picker>
        </view>

        <view class="division"></view>

        <view class="goods">
          <view v-for="(item, i) in goodsEntities" :key="item.key">
            <view>
              <view class="title">
                <view class="name">
                  <text>货物</text>
                  <view class="del" @tap="delGoods(i)" v-if="i != 0">
                    <view class="img">
                      <text>-</text>
                    </view>
                  </view>
                </view>

                <view class="select">
                  <picker
                    mode="selector"
                    name="goodsId"
                    :range="goodsIdListWrap.goodsIdList"
                    range-key="goodsName"
                    @change="handleChange3($event, 'goodsId',i,item)"
                  >
                    <view class="point"></view>
                  </picker>
                </view>
              </view>

              <view class="content">
                <view class="grace-items items itemsb">
                  <view class="grace-label label">
                    <text class="write">*</text>
                    <text>货物名称</text>
                  </view>
                  <input
                    type="text"
                    class="input inputclass"
                    name="goodsName"
                    v-model="goodsEntities[i].goodsName"
                    placeholder="请输入货物名称"
                    placeholder-style="color:#B8B8B8;padding-left: 2px;font-size:14px"
                  >
                </view>
                <view class="grace-items items">
                  <view class="grace-label label">
                    <text class="write">*</text>
                    <text>货物类型</text>
                  </view>
                  <picker
                    mode="selector"
                    name="goodsType"
                    :range="goodsTypeListWrap.goodsTypeList"
                    :value="goodsEntities[i].goodsTypeIndex"
                    range-key="lable"
                    @change="handleChange4($event, 'goodsType',i)"
                  >
                    <view
                      class="uni-input"
                      v-if="goodsEntities[i].goodsType"
                    >{{ goodsEntities[i].goodsTypeName }}</view>
                    <text class="custom-placeholder" v-else>请选择类型</text>
                  </picker>
                </view>
              </view>
              <view class="content">
                <view class="grace-items items itemsb">
                  <view class="grace-label label">
                    <text class="write">*</text>
                    <text>包装单位</text>
                  </view>
                  <picker
                    mode="selector"
                    name="unit"
                    :range="unitListWrap.unitList"
                    :value="goodsEntities[i].unitIndex"
                    range-key="lable"
                    @change="handleChange4($event, 'unit',i)"
                  >
                    <view
                      class="uni-input"
                      v-if="goodsEntities[i].unit"
                    >{{ goodsEntities[i].unitName }}</view>
                    <text class="custom-placeholder" v-else>请选择单位</text>
                  </picker>
                </view>
                <view class="grace-items items">
                  <view class="grace-label label">
                    <text class="write">*</text>
                    <text>数量</text>
                  </view>
                  <input
                    type="text"
                    class="input inputclass"
                    name="number"
                    v-model="goodsEntities[i].number"
                    placeholder="请输入数量"
                    placeholder-style="color:#B8B8B8;padding-left: 2px;font-size:14px"
                  >
                </view>
              </view>
              <view class="content">
                <view class="grace-items items itemsb">
                  <view class="grace-label label">
                    <text class="write">*</text>
                    <text>重量(吨)</text>
                  </view>
                  <input
                    type="text"
                    class="input inputclass"
                    name="weight"
                    v-model="goodsEntities[i].weight"
                    placeholder="请输入重量"
                    placeholder-style="color:#B8B8B8;padding-left: 2px;font-size:14px"
                  >
                </view>
                <view class="grace-items items">
                  <view class="grace-label label">
                    <text class="write">*</text>
                    <text>体积(m3)</text>
                  </view>
                  <input
                    type="text"
                    class="input inputclass"
                    name="volume"
                    v-model="goodsEntities[i].volume"
                    placeholder="请输入体积"
                    placeholder-style="color:#B8B8B8;padding-left: 2px;font-size:14px"
                  >
                </view>
              </view>

              <view class="division"></view>
            </view>
          </view>

          <view class="add">
            <text @tap="addGoods">+ 添加货物</text>
          </view>

          <view class="division"></view>

          <view class="grace-items">
            <view class="grace-label">
              <text class="write">*</text>
              <text>派车时间</text>
            </view>
            <picker
              class="pickerClass"
              mode="date"
              name="distributionTime"
              @change="handleChangePicker($event, 'form', 'distributionTime', false)"
            >
              <view class="uni-input" v-if="form.distributionTime">{{ form.distributionTime }}</view>
              <text class="custom-placeholder" v-else>请选择派车时间</text>
            </picker>
          </view>
          <view class="grace-items">
            <view class="grace-label">
              <text class="write">*</text>
              <text>业务类型</text>
            </view>
            <picker
              class="pickerClass"
              mode="selector"
              name="businessType"
              :range="businessTypeListWrap.businessTypeList"
              range-key="lable"
              @change="handleChange2($event, 'businessType')"
              :value="businessTypeListWrap.index"
            >
              <view
                class="uni-input"
                v-if="form.businessType"
              >{{ businessTypeListWrap.businessTypeList[businessTypeListWrap.index].lable }}</view>
              <text class="custom-placeholder" v-else>请选择业务类型</text>
            </picker>
          </view>
          <view class="grace-items">
            <view class="grace-label">
              <text class="write">*</text>
              <text>运输模式</text>
            </view>
            <picker
              class="pickerClass"
              mode="selector"
              name="transportMode"
              :range="transportModeListWrap.transportModeList"
              range-key="lable"
              @change="handleChange2($event, 'transportMode')"
              :value="transportModeListWrap.index"
            >
              <view
                class="uni-input"
                v-if="form.transportMode"
              >{{ transportModeListWrap.transportModeList[transportModeListWrap.index].lable }}</view>
              <text class="custom-placeholder" v-else>请选择运输模式</text>
            </picker>
          </view>
          <view class="grace-items">
            <view class="grace-label">
              <text class="write">*</text>
              <text>提货方式</text>
            </view>
            <picker
              class="pickerClass"
              mode="selector"
              name="takeDeliveryWay"
              :range="takeDeliveryWayListWrap.takeDeliveryWayList"
              range-key="lable"
              @change="handleChange2($event, 'takeDeliveryWay')"
              :value="takeDeliveryWayListWrap.index"
            >
              <view
                class="uni-input"
                v-if="form.takeDeliveryWay"
              >{{ takeDeliveryWayListWrap.takeDeliveryWayList[takeDeliveryWayListWrap.index].lable }}</view>
              <text class="custom-placeholder" v-else>请选择提货方式</text>
            </picker>
          </view>
          <view class="grace-items">
            <view class="grace-label">
              <text class="write">*</text>
              <text>配送方式</text>
            </view>
            <picker
              class="pickerClass"
              mode="selector"
              name="deliveryType"
              :range="deliveryTypeListWrap.deliveryTypeList"
              range-key="lable"
              @change="handleChange2($event, 'deliveryType')"
              :value="deliveryTypeListWrap.index"
            >
              <view
                class="uni-input"
                v-if="form.deliveryType"
              >{{ deliveryTypeListWrap.deliveryTypeList[deliveryTypeListWrap.index].lable }}</view>
              <text class="custom-placeholder" v-else>请选择配送方式</text>
            </picker>
          </view>
          <view class="grace-items">
            <view class="grace-label">
              <text class="write">*</text>
              <text>到货日期</text>
            </view>
            <picker
              class="pickerClass"
              mode="date"
              name="takeDeliveryTime"
              @change="handleChangePicker($event, 'form', 'takeDeliveryTime', false)"
            >
              <view class="uni-input" v-if="form.takeDeliveryTime ">{{ form.takeDeliveryTime }}</view>
              <text class="custom-placeholder" v-else>请选择到货日期</text>
            </picker>
          </view>
          <view class="grace-items text">
            <view class="grace-label">
              <text>备注</text>
            </view>
            <textarea
              class="text-input"
              placeholder-style="color:#B8B8B8;"
              placeholder="点击输入备注"
              v-model="form.orderNotes"
            ></textarea>
          </view>

          <view class="division"></view>

          <view class="grace-items">
            <view class="grace-label">
              <text class="write">*</text>
              <text>运费</text>
            </view>
            <input
              type="text"
              class="input"
              name="freightRevenue"
              v-model="form.freightRevenue"
              placeholder="请输入运费"
              placeholder-style="color:#B8B8B8;padding-left: 2px;font-size:14px"
            >
          </view>
          <view class="grace-items">
            <view class="grace-label">
              <text class="write">*</text>
              <text>付款方式</text>
            </view>
            <picker
              class="pickerClass"
              mode="selector"
              name="payType"
              :range="payTypeListWrap.payTypeList"
              range-key="lable"
              @change="handleChange2($event, 'payType')"
              :value="payTypeListWrap.index"
            >
              <view
                class="uni-input"
                v-if="form.payType"
              >{{ payTypeListWrap.payTypeList[payTypeListWrap.index].lable }}</view>
              <text class="custom-placeholder" v-else>请选择付款方式</text>
            </picker>
          </view>
          <view class="grace-items">
            <view class="grace-label">
              <text class="write">*</text>
              <text>结算方式</text>
            </view>
            <picker
              class="pickerClass"
              mode="selector"
              name="paymentMode"
              :range="paymentModeListWrap.paymentModeList"
              range-key="lable"
              @change="handleChange2($event, 'paymentMode')"
              :value="paymentModeListWrap.index"
            >
              <view
                class="uni-input"
                v-if="form.paymentMode"
              >{{ paymentModeListWrap.paymentModeList[paymentModeListWrap.index].lable }}</view>
              <text class="custom-placeholder" v-else>请选择结算方式</text>
            </picker>
          </view>
          <view class="grace-items">
            <view class="grace-label">
              <text class="write">*</text>
              <text>结算天数</text>
            </view>
            <input
              type="text"
              class="input"
              name="settleDays"
              v-model="form.settleDays"
              placeholder="请输入结算天数"
              placeholder-style="color:#B8B8B8;padding-left: 2px;font-size:14px"
            >
          </view>

          <view class="division"></view>

          <upload-card
            des="点击上传照片"
            :showImgUrl="form.attachmentUrl"
            type="business"
            @uploadSuccess="handleUploadSuccess($event, 'attachmentUrl')"
          />

          <view class="fill"></view>
          <view class="bottom-button-wrap">
            <button formType="submit" type="primary" v-if="type=='add'">下单</button>
            <button formType="submit" type="primary" v-else>重新提交</button>
          </view>
        </view>
      </form>
    </view>
  </view>
</template>

<script>
var graceChecker = require("graceUI/graceChecker.js");
import URL from "@/api/serverApi";
import { get, post } from "@/utils/request";
import {
  goodstype,
  units,
  transporttype,
  businesstypelist,
  transportmode,
  takedeliveryway,
  deliverytype,
  paytype,
  paymentMode
} from "@/utils/type.js";
import UploadCard from "@/components/uploadCard/uploadCard";
import { showToast } from "@/utils/show.js";

export default {
  components: {
    UploadCard
  },
  data() {
    return {
      type: "add",
      orderId: "",

      shipperIdListWrap: {
        index: 0,
        shipperIdList: [
          {
            shipperId: "",
            shipperPerson: "请选择"
          }
        ]
      },
      receiverIdListWrap: {
        index: 0,
        receiverIdList: [
          {
            receiverId: "",
            receiverPerson: "请选择"
          }
        ]
      },
      transportTypeListWrap: {
        index: 0,
        transportTypeList: transporttype
      },
      goodsIdListWrap: {
        index: 0,
        goodsIdList: [
          {
            goodsId: "",
            goodsName: "请选择"
          }
        ]
      },
      goodsTypeListWrap: {
        index: 0,
        goodsTypeList: goodstype
      },
      unitListWrap: {
        index: 0,
        unitList: units
      },
      businessTypeListWrap: {
        index: 0,
        businessTypeList: businesstypelist
      },
      transportModeListWrap: {
        index: 0,
        transportModeList: transportmode
      },
      takeDeliveryWayListWrap: {
        index: 0,
        takeDeliveryWayList: takedeliveryway
      },
      deliveryTypeListWrap: {
        index: 0,
        deliveryTypeList: deliverytype
      },
      payTypeListWrap: {
        index: 0,
        payTypeList: paytype
      },
      paymentModeListWrap: {
        index: 0,
        paymentModeList: paymentMode
      },

      form: {
        shipperId: "", //发货人id
        shipperPerson: "", //发货人 +
        shipperTel: "", //发货人电话 +
        shipperUnit: "", //发货人单位 +
        shipperAddressCode: "", //发货人地区编码 +
        shipperAddress: "",
        shipperAddressDetial: "",

        receiverId: "", //收获地址
        receiverPerson: "", //收货人 +
        receiverTel: "",
        receiverUnit: "", //收获单位 +
        receiverAddressCode: "", //收货人地区编码 +
        receiverAddress: "",
        receiverAddressDetial: "", //收货人详细地址 +
        takeDeliveryTime: "", //到货日期--
        transportType: "", //运输类型 +

        distributionTime: "", //派车日期
        businessType: "", //业务类型 +
        transportMode: "", //运输模式
        takeDeliveryWay: "", //提货方式+
        deliveryType: "", //配送方式+
        // deliveryTime: "",//到货日期
        orderNotes: "",

        freightRevenue: "", //运费成本+
        payType: "", //付款方式 +
        paymentMode: "", //结算方式
        settleDays: "",

        goodsName: "",
        attachmentUrl: "",

        carAsk: "1", // 车辆要求,
        carType: "1" //车辆类型
      },

      shipperAddress: "",
      receiverAddress: "",

      goodsEntities: [
        {
          goodsId: "",
          goodsName: "",
          goodsType: "",
          unit: "",
          number: "",
          weight: "",
          volume: ""
        }
      ]
    };
  },
  methods: {
    formSubmit(e) {
      console.log("提交");
      let _this = this;
      uni.hideKeyboard();

      // 表单验证
      let rule = [
        {
          name: "shipperId",
          checkType: "notnull",
          errorMsg: "请选择发货人"
        },
        {
          name: "receiverId",
          checkType: "notnull",
          errorMsg: "请选择收货人"
        },
        {
          name: "transportType",
          checkType: "notnull",
          errorMsg: "请选择运输类型"
        }
      ];
      let formData = this.form;

      let rule2 = [
        {
          name: "distributionTime",
          checkType: "notnull",
          errorMsg: "请选择派车时间"
        },
        {
          name: "businessType",
          checkType: "notnull",
          errorMsg: "请选择业务类型"
        },
        {
          name: "transportMode",
          checkType: "notnull",
          errorMsg: "请选择运输模式"
        },
        {
          name: "takeDeliveryWay",
          checkType: "notnull",
          errorMsg: "请选择提货方式"
        },
        {
          name: "deliveryType",
          checkType: "notnull",
          errorMsg: "请选择配送方式"
        },
        {
          name: "takeDeliveryTime",
          checkType: "notnull",
          errorMsg: "请选择到货日期"
        },
        {
          name: "freightRevenue",
          checkType: "notnull",
          errorMsg: "请输入运费"
        },
        {
          name: "payType",
          checkType: "notnull",
          errorMsg: "请选择付款方式"
        },
        {
          name: "paymentMode",
          checkType: "notnull",
          errorMsg: "请选择结算方式"
        },
        {
          name: "settleDays",
          checkType: "notnull",
          errorMsg: "请输入结算天数"
        },
        {
          name: "settleDays",
          checkType: "reg",
          checkRule: /^[0-9]+([.]{1}[0-9]+){0,1}$/,
          errorMsg: "请输入正确结算天数"
        }
      ];

      let formData1 = this.goodsEntities;
      let rule1 = [
        {
          name: "goodsName",
          checkType: "notnull",
          errorMsg: "请输入货物名称"
        },
        {
          name: "goodsType",
          checkType: "notnull",
          errorMsg: "请选择货物类型"
        },
        {
          name: "unit",
          checkType: "notnull",
          errorMsg: "请选择单位"
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

      let checkRes2 = graceChecker.check(formData, rule2);

      let checkRes1 = false;

      this.goodsEntities.forEach(item => {
        checkRes1 = graceChecker.check(item, rule1);
      });
      let checkRes = graceChecker.check(formData, rule);

      if (checkRes && checkRes1 && checkRes2) {
        let obj = this.form;

        let goods = this.goodsEntities.map(i => {
          return {
            goodsName: i.goodsName,
            goodsType: i.goodsType,
            unit: i.unit,
            number: i.number,
            weight: i.weight,
            volume: i.volume
          };
        });
        obj.goodsEntities = JSON.stringify(goods);
        // obj.paymentMode = obj.settleType;
        let url = ";";
        console.log("obj发送参数", obj);

        if (this.type == "add") {
          url = URL.order.addtmsorder;
        } else if (this.type == "edit") {
          url = URL.order.editorder;
          obj.orderId = this.orderId;
        }
        console.log("obj", obj);

        post(url, obj).then(res => {
          if (this.type == "add") {
            showToast("下单成功");
          } else if (this.type == "edit") {
            showToast("修改成功");
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
    getShipper() {
      console.log("进来1");
      let obj = {
        pageNo: 1,
        pageSize: 100
      };
      let _this = this;
      post(URL.address.consigneelist, obj).then(res => {
        console.log("rresreses", res);

        let list = res.data.list.map(item => {
          return {
            shipperId: item.addrId, //发货id
            shipperPerson: item.addrName, //发货人
            shipperTel: item.addrTel, //发货人电话
            shipperUnit: item.addrUnit,
            shipperAddressCode: item.addrCode, //发货人地区编码
            shipperAddress: item.addrArea,
            shipperAddressDetial: item.addrDetail //发货人详细地址
          };
        });
        console.log("发货人信息", list);
        let data = _this.shipperIdListWrap.shipperIdList;
        _this.shipperIdListWrap.shipperIdList = data.concat(list);
        let list1 = res.data.list.map(item => {
          return {
            receiverId: item.addrId, //收获id
            receiverPerson: item.addrName, //收货人
            receiverTel: item.addrTel, //收货人电话
            receiverUnit: item.addrUnit,
            receiverAddressCode: item.addrCode, //收货人地区编码
            receiverAddress: item.addrArea,
            receiverAddressDetial: item.addrDetail //收货人详细地址
          };
        });
        console.log("收货人信息", list1);
        let data1 = _this.receiverIdListWrap.receiverIdList;
        _this.receiverIdListWrap.receiverIdList = data1.concat(list1);
      });
    },
    handleChange(e, name) {
      let newName = name + "List";
      let listWrap = newName + "Wrap";
      this.form[name] = this[listWrap][newName][e.detail.value][name];
      this[listWrap].index = e.detail.value;

      let arr = [
        name,
        "shipperPerson",
        "shipperTel",
        "shipperUnit",
        "shipperAddressCode",
        "shipperAddress",
        "shipperAddressDetial",
        "shipperAddress"
      ];
      this.changeData(e.detail.value, arr, listWrap, newName);
    },
    handleChange1(e, name) {
      let newName = name + "List";
      let listWrap = newName + "Wrap";

      this.form[name] = this[listWrap][newName][e.detail.value][name];
      this[listWrap].index = e.detail.value;

      let arr = [
        name,
        "receiverPerson",
        "receiverTel",
        "receiverUnit",
        "receiverAddressCode",
        "receiverAddress",
        "receiverAddressDetial",
        "receiverAddress"
      ];
      this.changeData(e.detail.value, arr, listWrap, newName);
    },
    handleChange2(e, name) {
      let newName = name + "List";
      let listWrap = newName + "Wrap";
      this.form[name] = this[listWrap][newName][e.detail.value].value;
      this[listWrap].index = e.detail.value;
    },
    changeData(index, arr, listWrap, newName) {
      let length = arr.length;
      let address = arr[length - 1];
      let detail = arr[length - 2];
      if (index != 0) {
        arr.forEach((item, i) => {
          this.form[item] = this[listWrap][newName][index][item];
          if (i == length - 1) {
            this[item] =
              this[listWrap][newName][index][address].replace(/,/g, "") +
              this[listWrap][newName][index][detail];
          }
        });
      } else {
        arr.forEach(item => {
          this.form[item] = "";
          if (i == length - 1) {
            this[item] = "";
          }
        });
      }
    },
    getGoods() {
      console.log("进来2");

      let _this = this;
      let obj = {
        pageNo: 1,
        pageSize: 100
      };

      post(URL.address.goodspage, obj).then(res => {
        let list = res.data.list.map(item => {
          return {
            goodsId: item.goodsId,
            goodsName: item.goodsName,
            goodsType: item.goodsType,
            number: item.number,
            unit: item.unit,
            volume: item.volume,
            weight: item.weight
          };
        });
        let data = _this.goodsIdListWrap.goodsIdList;
        _this.goodsIdListWrap.goodsIdList = data.concat(list);
      });
    },
    handleChange3(e, name, num, item) {
      // console.log("this.form.goodsName", this.form.goodsName);

      let newName = name + "List";
      let listWrap = newName + "Wrap";
      let arr = [
        "goodsId",
        "goodsName",
        "goodsType",
        "unit",
        "number",
        "weight",
        "volume"
      ];
      if (e.detail.value != 0) {
        let selectGoods = this.goodsIdListWrap.goodsIdList[e.detail.value];
        let selectGoodsType = selectGoods.goodsType;
        let selectUnit = selectGoods.unit;
        arr.forEach((item, i) => {
          if (i == 2 || i == 3) {
            let showName = item + "Name";
            let showIndex = item + "Index";
            let index = item + num;

            let itemList = item + "List";
            let itemListWrap = itemList + "Wrap";
            this[itemListWrap].index = e.detail.value;

            let value = "";
            if (i == 2) {
              value = selectGoodsType;
            } else if (i == 3) {
              value = selectUnit;
            }

            this[itemListWrap][itemList].forEach((it, j) => {
              if (it.value == value) {
                this.goodsEntities[num][showName] = it.lable;
                this.goodsEntities[num][showIndex] = j;
              }
            });
          }
          this.goodsEntities[num][item] = this[listWrap][newName][
            e.detail.value
          ][item];
        });
      } else {
        arr.forEach((item, i) => {
          this.goodsEntities[num][item] = "";
          if (i == 2 || i == 3) {
            let showIndex = item + "Index";
            this.goodsEntities[num][showIndex] = 0;
          }
        });
      }
    },
    handleChange4(e, name, num) {
      let newName = name + "List";
      let listWrap = newName + "Wrap";

      this.goodsEntities[num][name] = this[listWrap][newName][
        e.detail.value
      ].value;

      let index = name + num;
      this[listWrap][index] = e.detail.value;

      let showName = name + "Name";
      this.goodsEntities[num][showName] = this[listWrap][newName][
        e.detail.value
      ].lable;
    },
    addGoods() {
      let obj = {
        goodsId: "",
        goodsName: "",
        goodsType: "",
        unit: "",
        number: "",
        weight: "",
        volume: ""
      };

      this.goodsEntities.push(obj);
    },
    delGoods(index) {
      this.goodsEntities.splice(index, 1);
    },
    handleChangePicker(e, formName, name, isChange) {
      if (isChange) {
        let newName = name + "List";
        this[formName][name] = this[newName][e.detail.value].label;
      } else {
        this[formName][name] = e.detail.value + " 00:00:00";
      }
    },
    handleUploadSuccess(e, name) {
      this.form[name] = e;
    },
    getdetail(id) {
      let url = URL.order.getorder;
      let obj = {
        orderId: id,
        pageNo: 1,
        pageSize: 50
      };
      get(url, obj).then(res => {
        console.log("res获取", res);

        this.form.shipperId = res.data.shipperId; //发货方ID
        this.shipperIdListWrap.shipperIdList.forEach((item, index) => {
          if (item.shipperId == this.form.shipperId) {
            this.shipperIdListWrap.index = index;
          }
        });

        this.form.shipperPerson = res.data.shipperPerson; //发货人
        this.form.shipperTel = res.data.shipperTel; //发货人电话
        this.form.shipperUnit = res.data.shipperUnit; //发货人单位
        this.form.shipperAddressCode = res.data.shipperAddressCode; //发货人地区编码
        this.form.shipperAddress = res.data.shipperAddress; //发货人地区
        this.form.shipperAddressDetial = res.data.shipperAddressDetial; //发货人详细地址

        this.shipperAddress =
          res.data.shipperAddress.replace(/,/g, "") +
          res.data.shipperAddressDetial;

        this.form.receiverId = res.data.receiverId; //发货方id
        this.receiverIdListWrap.receiverIdList.forEach((item, index) => {
          if (item.receiverId == this.form.receiverId) {
            this.receiverIdListWrap.index = index;
          }
        });
        this.form.receiverPerson = res.data.receiverPerson; //收货人
        this.form.receiverTel = res.data.receiverTel; //收货人联系电话
        this.form.receiverUnit = res.data.receiverUnit; //收获单位
        this.form.receiverAddressCode = res.data.receiverAddressCode;
        this.form.receiverAddress = res.data.receiverAddress; //收货人地区
        this.form.receiverAddressDetial = res.data.receiverAddressDetial;

        this.receiverAddress =
          res.data.receiverAddress.replace(/,/g, "") +
          res.data.receiverAddressDetial;

        this.form.transportType = res.data.transportType;
        this.transportTypeListWrap.transportTypeList.forEach((item, index) => {
          if (item.value == this.form.transportType) {
            this.transportTypeListWrap.index = index;
          }
        });

        this.form.distributionTime = res.data.distributionTime; //派车时间

        this.form.businessType = res.data.businessType;
        this.businessTypeListWrap.businessTypeList.forEach((item, index) => {
          if (item.value == this.form.businessType) {
            this.businessTypeListWrap.index = index;
          }
        });

        this.form.transportMode = res.data.transportMode;
        this.transportModeListWrap.transportModeList.forEach((item, index) => {
          if (item.value == this.form.transportMode) {
            this.transportModeListWrap.index = index;
          }
        });

        this.form.takeDeliveryWay = res.data.takeDeliveryWay; //提货方式
        this.takeDeliveryWayListWrap.takeDeliveryWayList.forEach(
          (item, index) => {
            if (item.value == this.form.takeDeliveryWay) {
              this.takeDeliveryWayListWrap.index = index;
            }
          }
        );

        this.form.deliveryType = res.data.deliveryType;
        this.deliveryTypeListWrap.deliveryTypeList.forEach((item, index) => {
          if (item.value == this.form.deliveryType) {
            this.deliveryTypeListWrap.index = index;
          }
        });

        this.form.takeDeliveryTime = res.data.takeDeliveryTime; //到货日期
        if (res.data.notes == null) {
          this.form.orderNotes = "";
        } else {
          this.form.orderNotes = res.data.notes;
        }

        this.form.freightRevenue = res.data.freightRevenue;

        this.form.payType = res.data.payType + "";
        this.payTypeListWrap.payTypeList.forEach((item, index) => {
          if (item.value == this.form.payType) {
            this.payTypeListWrap.index = index;
          }
        });

        this.form.paymentMode = res.data.paymentMode;
        this.paymentModeListWrap.paymentModeList.forEach((item, index) => {
          if (item.value == this.form.paymentMode) {
            this.paymentModeListWrap.index = index;
          }
        });

        this.form.settleDays = res.data.settleDays; //结算天数

        this.form.attachmentUrl = res.data.attachmentUrl;

        let aa = JSON.parse(res.data.goodsEntities);
        this.goodsEntities = aa.map(item => {
          console.log("iteitemitemitemm", item);
          let goodsTypeName = "";
          let goodsTypeIndex = 0;
          // 商品选择
          this.goodsTypeListWrap.goodsTypeList.forEach((v, i) => {
            console.log("vvvvvvvvv", v, i);

            if (v.value == item.goodsType) {
              goodsTypeName = v.lable;
              goodsTypeIndex = i;
            }
          });

          let unitName = "";
          let unitIndex = 0;
          this.unitListWrap.unitList.forEach((v, i) => {
            if (v.value == item.unit) {
              unitName = v.lable;
              unitIndex = i;
            }
          });

          return {
            goodsId: item.goodsId,
            goodsName: item.goodsName,
            goodsType: item.goodsType,
            number: item.number,
            weight: item.weight,
            volume: item.volume,
            unit: item.unit,
            orderId: item.orderId,
            goodsTypeIndex: goodsTypeIndex,
            goodsTypeName: goodsTypeName,
            unitIndex: unitIndex,
            unitName: unitName
          };
        });
      });
    }
  },
  onLoad(option) {
    this.getShipper();
    this.getGoods();
    if (option.id != undefined) {
      this.type = "edit";
      uni.setNavigationBarTitle({
        title: "修改订单"
      });
      this.orderId = option.id;
      this.getdetail(option.id);
    }
  }
};
</script>

<style lang="scss">
@import "@/style/index.scss";

.order-wrap {
  overfow-x: hidden;

  .pickerClass {
    padding-right: 8upx;
  }

  .person {
    margin-top: 5upx;
    width: 100%;

    .send {
      width: 94%;
      margin: 0 auto;
      border-top: 1px solid #e4e4e4;
      border-bottom: 1px solid #e4e4e4;
      display: flex;

      .circle {
        width: 15%;

        .img {
          width: 80upx;
          height: 80upx;
          vertical-align: middle;
          background-color: #cccccc;
          border-radius: 50%;
          -moz-border-radius: 50%;
          -webkit-border-radius: 50%;
          margin-top: 30upx;
          display: flex;

          text {
            font-size: 40upx;
            align-self: center;
            align-items: center;
            margin: 0 auto;
          }
        }

        .img1 {
          background-color: #9fcfff !important;
        }
      }

      .content {
        margin-left: 16upx;
        width: 75%;
        height: 100%;
        padding-bottom: 10upx;

        .first {
          margin-top: 10upx;
          display: flex;

          .name {
            font-size: 32upx;
          }

          .tel {
            font-size: 32upx;
            margin-left: 20upx;
          }
        }

        .second {
          color: #929292;
          margin-top: 6upx;
          font-size: 26upx;
        }

        .third {
          color: #929292;
          margin-top: 6upx;
          font-size: 26upx;
        }
      }

      .select {
        border-left: #cccccc 1px solid;
        width: 10%;
        height: 120upx;
        align-self: center;
        align-items: center;
        position: relative;

        .point {
          width: 26upx;
          height: 26upx;
          border-top: 2px solid #555555;
          border-right: 2px solid #555555;
          transform: rotate(45deg);

          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          margin: auto;
        }
      }
    }

    .get {
      border-top: none;
    }
  }

  .division {
    width: 100%;
    height: 20upx;
    background: #eeeeee;
  }

  .grace-items {
    background: #fff;
    padding: 0 10upx;
    margin-right: 100upx;

    .grace-label {
      width: 260upx;
    }

    .uni-input {
      margin-right: 25upx;
    }

    .input {
      padding-right: 20upx;
    }

    .write {
      color: #ff0000;
    }

    .custom-placeholder {
      color: #bababa;
    }

    .test {
      line-height: 80upx;
      margin-right: 25upx;
    }
  }

  .goods {
    .title {
      width: 94%;
      height: 70upx;
      margin: 0 auto;
      border-bottom: 1px solid #e4e4e4;
      display: flex;

      .name {
        width: 90%;
        display: flex;

        text {
          align-self: center;
          align-items: center;
          font-size: 30upx;
          font-weight: 700;
        }

        .del {
          margin-left: 20upx;
          display: flex;

          .img {
            width: 40upx;
            height: 40upx;
            vertical-align: middle;
            background-color: #0099ff;
            border-radius: 50%;
            -moz-border-radius: 50%;
            -webkit-border-radius: 50%;

            align-self: center;
            align-items: center;
            display: flex;

            text {
              color: #ffffff;
              font-size: 60upx;
              line-height: 30upx;
              align-self: center;
              align-items: center;
              margin: 0 auto;
              margin-top: -10upx;
            }
          }
        }
      }

      .select {
        border-left: #cccccc 1px solid;
        width: 10%;
        height: 40upx;
        align-self: center;
        align-items: center;
        position: relative;

        .point {
          width: 22upx;
          height: 22upx;
          border-top: 2px solid #555555;
          border-right: 2px solid #555555;
          transform: rotate(45deg);

          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          margin: auto;
        }
      }
    }

    .content {
      display: flex;

      .items {
        width: 50%;
        border-bottom: #e4e4e4 1px solid;
        margin-right: 0upx;

        .label {
          width: 38%;
          align-self: center;
          align-items: center;
        }

        .inputclass {
          color: #000000;
          margin: 20upx 0upx;
          padding-right: 10upx;
          font-size: 28upx;
        }
      }

      .itemsb {
        border-right: #e4e4e4 1px solid;
      }
    }

    .add {
      width: 100%;
      height: 60upx;
      text-align: center;

      text {
        color: #0079fe;
        line-height: 60upx;
      }
    }
  }
}
</style>
