<template>
	<view class="order-content-wrap">
		<view v-for="(item, index) in orderlist" :key="index" class="items">
			<view class="item">
				<view @tap="detail(item.orderId)">
					<view class="first">
						<view class="name">
							<text>{{item.transportType}}</text>
						</view>
						<view class="address">
							<view class="send">
								{{item.shipperAddress}}
							</view>
							<view class="point">
								<image src="../../static/image/order/line.png"></image>
							</view>
							<view class="get">
								{{item.receiverAddress}}
							</view>
						</view>
						<view class="state">
							<text>{{item.state}}</text>
						</view>
					</view>
					<view class="second">
						<view class="goods">
							<view class="img">
								<image src="../../static/image/order/box.png"></image>
							</view>
							<view class="goodsitem">
								<text>{{item.goodsName}}</text>
							</view>
							<view class="gettype">
								<text>{{item.takeDeliveryWay}}</text>
							</view>
							<view class="sendtype">
								<text>{{item.deliveryType}}</text>
							</view>
						</view>

						<view class="msg">
							<view class="title">订单编号
								<text>{{item.orderNo}}</text>
							</view>
							<view class="title">收货信息
								<text>{{item.receiverPerson}}</text>
								<text class="tel">{{item.receiverTel}}</text>
							</view>
							<view class="title">到货日期
								<text>{{item.takeDeliveryTime}}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="btn" v-if="item.option == '1'">
					<button size="mini" type="text" @tap="cancle(item.orderId)">取消订单</button>
				</view>
				<view class="btn" v-if="item.option == '3'">
					<button size="mini" type="text" @tap="edit(item)">修改订单</button>
				</view>
				<view v-if="item.option == '2' && item.sendOrderVo != null">
					<view class="car" >
						<view class="points"></view>
						<view class="note">
							<view>派车单号 {{item.sendOrderVo.sendvehicleNo}}</view>
							<view>{{item.sendOrderVo.actionTime}} {{item.sendOrderVo.status}}</view>
						</view>
						<view class="btnc">
							<button size="mini" type="primary" @tap="logistics(item.sendOrderVo.orderId,item.sendOrderVo.sendvehicleId)">跟踪</button>
						</view>
					</view>
				</view>
			</view>
			<view class="division"></view>
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

	export default {
		props: {
			orderlist: Array
		},
		methods: {
			onShow() {
				console.log('this.orderlist',this.orderlist);
				
			},
			cancle(item) {
				console.log('取消订单',item);
				
				var _this = this;
				uni.showModal({
					title: '提示',
					content: "确定取消该订单",
					success: function(res) {
						if (res.confirm) {
							_this.$emit("cancleOrder", item);
						}
					}
				});
			},
			detail(item) {
				uni.navigateTo({
					url: `/pages/order/orderdetail?id=${item}`
				});
			},
			logistics(orderId, sendvehicleId) {
				console.log('1111111111',orderId,sendvehicleId);
				post(URL.order.gettmsid, {
						orderId: orderId,
						sendvehicleId: sendvehicleId
					})
					.then(res => {
						console.log('跟踪',res);
						
						if (res.data != null) {
							let beginTime = res.data.beginTime;
							let signTime = res.data.signTime;
							let busNum = res.data.vehicleNumber;

							let obj = {
								beginTime: beginTime,
								signTime: signTime,
								// orderNo: orderNo,
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
			edit(item) {
				uni.navigateTo({
					url: `/pages/order/tmsorder?id=${item.orderId}`
				});
			}
		}
	}
</script>

<style lang="scss">
	@import "@/style/index.scss";

	.order-content-wrap {
		overflow-x: hidden;
		background: #FFFFFF;

		.item {
			margin-bottom: 10upx;

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

				.state {
					width: 15%;
					text-align: center;

					text {
						color: #0084ff;
						line-height: 60upx;
					}
				}
			}

			.second {
				width: 100%;
				background: #f1f6fe;
				padding-bottom: 10upx;

				.goods {
					width: 100%;
					height: 70upx;
					display: flex;

					.img {
						width: 10%;
						text-align: center;
						line-height: 80upx;

						image {
							@include size(36upx, 36upx);
						}
					}

					.goodsitem {
						width: 43%;
						display: flex;

						text {
							line-height: 70upx;
							font-size: 32upx;
							color: #2F2F2F;
							padding-right: 20upx;
						}
					}

					.gettype {
						width: 27%;
						text-align: right;
						line-height: 70upx;

						text {
							border: #0084FF 1px solid;
							color: #0084FF;
							border-radius: 10upx;
							padding: 5upx;
						}
					}

					.sendtype {
						width: 20%;
						text-align: center;
						line-height: 70upx;

						text {
							border: #f68452 1px solid;
							color: #f68452;
							border-radius: 10upx;
							padding: 5upx;
						}
					}
				}

				.msg {
					.title {
						margin: 8upx 20upx;
						color: #808080;
						font-size: 30upx;

						text {
							color: #000000;
							font-size: 28upx;
							padding: 0 30upx;
						}

						.tel {
							padding-left: 0;
						}
					}
				}
			}

			.btn {
				margin-top: 15upx;
				margin-left: 68%;
			}
		}

		.car {
			width: 100%;
			display: flex;
			margin-top: 10upx;
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

		.note {
			width: 80%;
			margin-left: 2%;
			color: #888888;
		}

		.btnc {
			width: 20%;
			margin-top: 20upx;
		}

		.division {
			width: 100%;
			height: 20upx;
			background: #eeeeee;
		}
	}
</style>
