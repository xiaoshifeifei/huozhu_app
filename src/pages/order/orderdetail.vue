<template>
	<view class="order-detail-wrap">
		<view class="box">
			<view class="msg">
				<view class="orderId">
					<text>订单编号：</text>
					<text>{{form.orderNo}}</text>
				</view>
				<view class="time">
					<text>创建时间：</text>
					<text>{{form.createTime}}</text>
				</view>
			</view>
			<view class="box-con">
				<view class="box-text">{{form.state}}</view>
			</view>
		</view>
		<view class="content">
			<view class="first">
				<view class="name">
					<text>{{form.transportType}}</text>
				</view>
				<view class="address">
					<view class="send">
						{{form.shipperAddress}}
					</view>
					<view class="point">
						<image src="../../static/image/order/line.png"></image>
					</view>
					<view class="get">
						{{form.receiverAddress}}
					</view>
				</view>
			</view>
			<view class="second">
				<view class="goods" v-for="(item, index) in goodsItem" :key="index">
					<view class="title">{{index==0?"货物信息":""}}</view>
					<view class="goodsName">
						<view class="goodsitem">
							<text>{{item.goodsName}}</text>
							<text>【{{item.type}}】</text>
						</view>
						<view class="itemss">
							<text class="itemname">数量</text>
							<text class="itemname">{{item.number}}</text>
							<text class="itemname">|</text>
							<text class="itemname">重量</text>
							<text>{{item.weight}}</text>
							<text class="itemname">吨</text>
							<text class="itemname">|</text>
							<text class="itemname">体积</text>
							<text>{{item.volume}}</text>
							<text>m³</text>
						</view>
					</view>
				</view>
				<view class="type">
					<view class="typename">
						<view class="title">提&nbsp;&nbsp;&nbsp;&nbsp;货</view>
						<view class="itemss">
							<text class="itemname">{{form.takeDeliveryWay}}</text>
							<!-- <text class="itemname">|</text>
							<text class="itemname">2019-11-18 15:00:00</text> -->
						</view>
					</view>
					<view class="typename">
						<view class="title">配&nbsp;&nbsp;&nbsp;&nbsp;送</view>
						<view class="itemss">
							<text class="itemname">{{form.deliveryType}}</text>
							<!-- <text class="itemname">|</text>
							<text class="itemname">2019-11-18 15:00:00</text> -->
						</view>
					</view>
				</view>

				<view class="sendmsg">
					<view class="circle">
						<view class="img">
							<text>发</text>
						</view>
					</view>
					<view class="content11">
						<view class="first11">
							<view class="name11">
								<text>{{form.shipperPerson}}</text>
							</view>
							<view class="tel">
								<text>{{form.shipperTel}}</text>
							</view>
						</view>
						<view class="second11">
							<text>{{form.shipperUnit}}</text>
						</view>
						<view class="third11">
							<text>{{form.shipperAddressDetail}}</text>
						</view>
					</view>
				</view>

				<view class="sendmsg getmsg">
					<view class="circle">
						<view class="img img1">
							<text>收</text>
						</view>
					</view>
					<view class="content11">
						<view class="first11">
							<view class="name11">
								<text>{{form.receiverPerson}}</text>
							</view>
							<view class="tel">
								<text>{{form.receiverTel}}</text>
							</view>
						</view>
						<view class="second11">
							<text>{{form.receiverUnit}}</text>
						</view>
						<view class="third11">
							<text>{{form.receiverAddressDetail}}</text>
						</view>
					</view>
				</view>

				<view class="note" v-if="form.notes!=null">
					<view class="notetitle">【备注】</view>
					<view class="notecontent">{{form.notes}}</view>
				</view>
			</view>

			<view class="car" v-for="(item, index) in form.sendOrderVo" :key="index">
				<view class="points"></view>
				<view class="notes">
					<view>派车单号 {{item.sendvehicleNo}}</view>
					<view>{{item.srvTrackEntity.createTime}} {{item.srvTrackEntity.status}}</view>
				</view>
				<view class="btnc">
					<button size="mini" type="primary" @tap="logistics(item.orderId,item.sendvehicleId)">物流跟踪</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import URL from "@/api/serverApi";
	import {
		get,
		post
	} from "@/utils/request.js";
	import {
		showToast,
		showLoading,
		hideLoading
	} from "@/utils/show.js";
	import {
		transporttype,
		status,
		takedeliveryway,
		deliverytype,
		goodstype,
		units,
		carStatus
	} from "@/utils/type.js";

	export default {
		data() {
			return {
				form: {
					orderNo: "",
					createTime: "",
					state: "",
					transportType: "",
					shipperAddress: "",
					receiverAddress: "",
					takeDeliveryWay: "",
					deliveryType: "",

					shipperPerson: "",
					shipperTel: "",
					shipperUnit: "",
					shipperAddressDetail: "",

					receiverPerson: "",
					receiverTel: "",
					receiverTel: "",
					receiverAddressDetail: "",

					notes: "",

					srvWaybillSendList: []
				},
				goodsItem: [],

				status: status,
				transporttype: transporttype,
				goodstype: goodstype,
				units: units,
				takedeliveryway: takedeliveryway,
				deliverytype: deliverytype,
				carStatus: carStatus
			}
		},
		methods: {
			logistics(orderId, sendvehicleId) {
				get(URL.order.gettmsid, {
						orderId: orderId,
						sendvehicleId: sendvehicleId
					})
					.then(res => {
						if (res.data != null) {
							let beginTime = res.data.beginTime;
							let signTime = res.data.signTime;
							let busNum = res.data.vehicleNumber;

							let obj = {
								beginTime: beginTime,
								signTime: signTime,
								orderNo: orderNo,
								busNum: busNum,
								waybillSendId: sendvehicleId
							};

							uni.setStorageSync("type", obj);

							if (beginTime == null) {
								showToast("暂无物流信息");
							} else {
								uni.navigateTo({
									url: `/pages/order/logistics`
								});
							}
						} else {
							showToast("暂无物流信息");
						}
					})
			},
			getorder(id) {
				let url = URL.order.getorder;
				let obj = {
					orderId: id
				};
				get(url, obj)
					.then(res => {
						console.log("指定订单信息",res);
						this.form.orderNo = res.data.orderNo;
						this.form.createTime = res.data.distributionTime;
						this.form.state = this.setData(this.status.filter(v => v.value === res.data.status));
						this.form.transportType = this.setData(this.transporttype.filter(v => v.value === res.data.transportType));

						let shipperAddress = res.data.shipperAddress.substring(0, res.data.shipperAddress.lastIndexOf(","));
						this.form.shipperAddress = shipperAddress.replace(/[\u5E02\u8F96\u533A\u7701,]*/g, '');

						let receiverAddress = res.data.receiverAddress.substring(0, res.data.receiverAddress.lastIndexOf(","));
						this.form.receiverAddress = receiverAddress.replace(/[\u5E02\u8F96\u533A\u7701,]*/g, '');
						 if (res.data.takeDeliveryWay == 1) {
           					 this.form.takeDeliveryWay = "到站装货";
         					 } else {
           					 this.form.takeDeliveryWay = "指定地点装货";
         				 }
							console.log('res.data.deliveryType',res.data.deliveryType);
							
         				 if (res.data.deliveryType == 1) {
         				   this.form.deliveryType = "上门自取";
          				} else {
           					 this.form.deliveryType = "送货上门";
         				 }
						// this.goodsItem = res.data.goodsList.map(item => {
						// 	return {
						// 		goodsName: item.goodsName,
						// 		type: this.setData(this.goodstype.filter(v => v.value === item.goodsType)),
						// 		number: item.number + this.setData(this.units.filter(v => v.value === item.unit)),
						// 		weight: item.weight,
						// 		volume: item.volume
						// 	}
						// })
						let goodsData = JSON.parse(res.data.goodsEntities)
						console.log('goodsData',goodsData);
						
						this.goodsItem = goodsData.map(item => {
							return {
								goodsName: item.goodsName,
								type: this.setData(this.goodstype.filter(v => v.value === item.goodsType)),
								number: item.number + this.setData(this.units.filter(v => v.value === item.unit)),
								weight: item.weight,
								volume: item.volume
							}
						})
						console.log('this.goodsItem',this.goodsItem);
						
						// this.form.takeDeliveryWay = this.setData(this.takedeliveryway.filter(v => v.value === res.data.takeDeliveryWay));
						// this.form.deliveryType = this.setData(this.deliverytype.filter(v => v.value === res.data.deliveryType));

						this.form.shipperPerson = res.data.shipperPerson;
						this.form.shipperTel = res.data.shipperTel;
						this.form.shipperUnit = res.data.shipperUnit;
						this.form.shipperAddressDetail = res.data.shipperAddress.replace(/,/g, '') + res.data.shipperAddressDetial;

						this.form.receiverPerson = res.data.receiverPerson;
						this.form.receiverTel = res.data.receiverTel;
						this.form.receiverUnit = res.data.receiverUnit;
						this.form.receiverAddressDetail = res.data.receiverAddress.replace(/,/g, '') + res.data.receiverAddressDetial;

						this.form.notes = res.data.notes;
				
						this.form.srvWaybillSendList = res.data.srvWaybillSendList.map(i => {
							let srvTrackEntity = {
								createTime: "",
								status: ""
							};
							if (i.srvTrackEntity != null) {
								let s = this.setData(this.carStatus.filter(v => v.value === i.srvTrackEntity.status));
								srvTrackEntity = {
									createTime: i.srvTrackEntity.createTime,
									status: s
								}
							}
							return {
								sendvehicleId: i.sendvehicleId,
								sendvehicleNo: i.sendvehicleNo,
								srvTrackEntity: srvTrackEntity
							}
						})
					})
			},
			setData(arr) {
				if (arr.length == 0) {
					return "";
				} else {
					return arr[0].lable;
				}
			}
		},
		onLoad(option) {
			let id = option.id;
			console.log('optionoption',option);
			
			this.getorder(id);
		}
	}
</script>

<style lang="scss">
	@import '@/style/index.scss';

	.order-detail-wrap {
		overflow-x: hidden;

		.box {
			width: 100%;
			height: 180upx;
			background: #0084FF;
			position: relative;
			z-index: 90;
		}

		.box .box-con {
			width: 200upx;
			height: 178upx;
			overflow: hidden;
			position: absolute;
			top: -4upx;
			right: -2upx;
		}

		.box .box-text {
			color: #0084FF;
			text-align: center;
			-webkit-transform: rotate(45deg);
			-moz-transform: rotate(45deg);
			-ms-transform: rotate(45deg);
			-o-transform: rotate(45deg);
			position: relative;
			padding: 6upx 0;
			left: 50upx;
			top: 32upx;
			width: 200upx;
			background-color: #FFFFFF;
		}

		.box .box-text:before,
		.box-text:after {
			content: "";
			position: absolute;
			bottom: -6upx;
		}

		.box .box-text:before {
			left: 0;
		}

		.box .box-text:after {
			right: 0;
		}

		.msg {
			color: #FFFFFF;
			position: absolute;
			top: 30%;
			left: 6%;

			.orderId {
				font-size: 34upx;
				font-weight: 600;
			}

			.time {
				font-size: 30upx;
				padding-top: 4upx;
			}
		}

		.content {
			width: 100%;
			margin-top: 20upx;

			.first {
				display: flex;
				margin: 10upx 0;

				.name {
					width: 25%;
					height: 60upx;
					background: #0084ff;
					text-align: center;
					border-radius: 0 30upx 0 0;

					text {
						line-height: 60upx;
						color: #FFFFFF;
						font-size: 32upx;
					}
				}

				.address {
					width: 60%;
					display: flex;

					.send {
						width: 40%;
						padding-top: 8upx;
						text-align: center;
						font-size: 30upx;
					}

					.point {
						width: 12%;

						image {
							@include size(56upx, 11upx);
						}
					}

					.get {
						width: 48%;
						padding-top: 8upx;
						text-align: center;
						font-size: 30upx;
					}
				}
			}

			.second {
				margin-bottom: 20upx;

				.goods {
					width: 100%;
					display: flex;
					margin-bottom: 10px;

					.title {
						text-align: center;
						width: 20%;
						color: #bfbfbf;
					}

					.goodsName {
						color: #808080;

						.itemname {
							margin-right: 10upx;
						}
					}
				}

				.type {
					margin-bottom: 10px;
				}

				.typename {
					display: flex;


					.title {
						text-align: center;
						width: 20%;
						color: #bfbfbf;
					}

					.itemss {
						color: #808080;

						.itemname {
							margin-right: 10upx;
						}
					}
				}
			}

			.sendmsg {
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
						background-color: #0084ff;
						border-radius: 25%;
						-moz-border-radius: 25%;
						-webkit-border-radius: 25%;
						margin-top: 30upx;
						display: flex;

						text {
							color: #FFFFFF;
							font-size: 40upx;
							align-self: center;
							align-items: center;
							margin: 0 auto;
						}
					}

					.img1 {
						background-color: #ff5c4b !important;
					}
				}

				.content11 {
					margin-left: 16upx;
					width: 75%;
					height: 100%;
					padding-bottom: 10upx;

					.first11 {
						margin-top: 10upx;
						display: flex;

						.name11 {
							font-size: 32upx;
						}

						.tel {
							font-size: 32upx;
							margin-left: 20upx;
						}
					}

					.second11 {
						color: #929292;
						margin-top: 6upx;
						font-size: 26upx;
					}

					.third11 {
						color: #929292;
						margin-top: 6upx;
						font-size: 26upx;
					}
				}
			}

			.getmsg {
				border-top: none;
			}

			.note {
				.notetitle {
					margin: 10upx;
					font-size: 30upx;
				}

				.notecontent {
					margin: 10upx;
					color: #999999;
				}
			}
		}

		.btn {
			margin-top: 15upx;
			margin-left: 68%;
		}

		.car {
			width: 100%;
			display: flex;
			margin: 30upx 0 0 2%;
		}

		.points {
			width: 20upx;
			height: 20upx;
			vertical-align: middle;
			background-color: #000000;
			border-radius: 50%;
			-moz-border-radius: 50%;
			-webkit-border-radius: 50%;
			margin-top: 30upx;
			display: flex;
		}

		.notes {
			width: 70%;
			margin-left: 2%;
			color: #888888;
		}

		.btnc {
			width: 30%;
		}
	}
</style>
