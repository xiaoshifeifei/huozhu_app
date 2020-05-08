let goodstype = [{
    value: "",
    lable: "请选择"
}, {
    value: "90",
    lable: "电子产品"
}, {
    value: "92",
    lable: "商品汽车"
}, {
    value: "93",
    lable: "冷藏货物"
}, {
    value: "94",
    lable: "大宗货物"
}, {
    value: "95",
    lable: "快速消费"
}, {
    value: "96",
    lable: "农产品"
}, {
    value: "999",
    lable: "其他"
}]

let units = [{
    value: "",
    lable: "请选择"
}, {
    value: "THING",
    lable: "件"
}, {
    value: "PACKAGE",
    lable: "包"
}, {
    value: "BOX",
    lable: "箱"
}, {
    value: "STIPULES",
    lable: "托"
}]

let transporttype = [{
    value: "",
    lable: "请选择"
}, {
    value: "HIGHWAY",
    lable: "公路运输"
}, {
    value: "SHIPPING",
    lable: "海上运输"
}, {
    value: "AIR",
    lable: "航空运输"
}, {
    value: "RAILWAY",
    lable: "铁路运输"
}]

let businesstypelist = [{
    value: "",
    lable: "请选择"
}, {
    value: 'ARTERY_GENERAL_CARGO',
    lable: '干线普货运输'
}, {
    value: 'CONTAINER_TRANSPORTATION',
    lable: '集装箱运输'
}, {

    value: 'CITY',
    lable: '城市配送'
}, {
    value: 'VILLAGE',
    lable: '农村配送'
}, {
    value: 'OTHER',
    lable: '其他'
}]

let transportmode = [{
    value: "",
    lable: "请选择"
}, {
    value: "WHOLE",
    lable: "整车"
}, {
    value: "LTL",
    lable: "零担"
}]

let takedeliveryway = [{
    value: "",
    lable: "请选择"
}, {
    value: "1",
    lable: "到站装货"
}, {
    value: "2",
    lable: "指定地点装货"
}]

let deliverytype = [{
    value: "",
    lable: "请选择"
}, {
    value: "1",
    lable: "上门自取"
}, {
    value: "2",
    lable: "送货上门"
}]

let paytype = [{
    value: "",
    lable: "请选择"
}, {
    value: "1",
    lable: "现金转账"
}, {
    value: "2",
    lable: "承兑汇票"
}]

let paymentMode = [{
    value: "",
    lable: "请选择"
}, {
    value: "1",
    lable: "到付"
}, {
    value: "2",
    lable: "月结"
}, {
    value: "3",
    lable: "现结"
}]

// let status = [{
//     value: "CUS_REFUSE_RECEIVE",
//     lable: "待修改"
// }, {
//     value: "WAIT_RECEIVE",
//     lable: "待接单"
// }, {
//     value: "WAIT_SEND",
//     lable: "待派单"
// }, {
//     value: "SEND_CARREFUSE_RECEIVE",
//     lable: "待派车"
// }, {
//     value: "TMS_WAIT_RECEIVE",
//     lable: "待派车"
// }, {
//     value: "TMS_RECEIVE",
//     lable: "待派车"
// }, {
//     value: "SEND_CAR",
//     lable: "运输中"
// }, {
//     value: "ALREADY_SIGN",
//     lable: "已完成"
// }]

let status = [{
    value: "CUS_REFUSE_RECEIVE",
    lable: "待修改"
}, {
    value: 1,
    lable: "待接单"
}, {
    value: 2,
    lable: "待派单"
}, {
    value: 3,
    lable: "企业已接单"
}, {
    value: 4,
    lable: "拒接订单"
}, {
    value: 5,
    lable: "货主取消订单"
}, {
    value: 6,
    lable: "调度中"
}, {
    value: 7,
    lable: "派给下游企业"
}, {
    value: 8,
    lable: "部分派车"
}, {
    value: 9,
    lable: "运输中"
}, {
    value: 10,
    lable: "部分签收"
}, {
    value: 11,
    lable: "签收"
}, {
    value: 12,
    lable: "完成"
}]

let carStatus = [{
    value: "NEW",
    lable: "新建"
}, {
    value: "REFUSE",
    lable: "拒接派车单"
}, {
    value: "DISPATCHED",
    lable: "已派车"
}, {
    value: "PICKUP_PLACE_OF_DELIVERY",
    lable: "前往提货地"
}, {
    value: "ARRIVE_PLACE_OF_DELIVERY",
    lable: "抵达提货点"
}, {
    value: "LOADING_FINISHED",
    lable: "装车完成"
}, {
    value: "TRANSPORTATIONED",
    lable: "已发车"
}, {
    value: "ARRIVE_PLACE_OF_DESTINATION",
    lable: "抵达目的地"
}, {
    value: "UNLOADING_FINISHED",
    lable: "卸货完成"
}, {
    value: "SIGN_FOR",
    lable: "签收"
}, {
    value: "COMPLETED",
    lable: "完成"
}, {
    value: "FINISH",
    lable: "结束服务"
}]

export {
    goodstype,
    units,
    transporttype,
    businesstypelist,
    transportmode,
    takedeliveryway,
    deliverytype,
    paytype,
    paymentMode,
    status,
    carStatus
};