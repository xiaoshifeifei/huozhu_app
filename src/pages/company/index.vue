<template>
	<view class="company-wrap">
		<view class="grace-form">
			<form @submit="formSubmit">
				<view>
					<view class="grace-items">
						<view class="grace-label">
							<text class="write">*</text>
							<text>企业名称</text>
						</view>
						<input type="text" class="input" v-model="form.name" name="name" placeholder="请输入企业名称" placeholder-style="color:#B8B8B8;" />
					</view>
					<view class="grace-items">
						<view class="grace-label">
							<text>企业简称</text>
						</view>
						<input type="text" class="input" v-model="form.shortName" placeholder="请输入企业简称" placeholder-style="color:#B8B8B8;" />
					</view>
					<view class="grace-items">
						<view class="grace-label">
							<text class="write">*</text>
							<text>营业执照号</text>
						</view>
						<input type="text" class="input" v-model="form.businessLicense" name="businessLicense" placeholder="请输入营业执照号"
						 placeholder-style="color:#B8B8B8;" />
					</view>
					<view class="grace-items">
						<view class="grace-label">
							<text class="write">*</text>
							<text>组织机构代码</text>
						</view>
						<input type="text" class="input" v-model="form.organizationCode" name="organizationCode" placeholder="请输入组织机构代码"
						 placeholder-style="color:#B8B8B8;" />
					</view>
					<view class="grace-items">
						<view class="grace-label">
							<text class="write">*</text>
							<text>运输经营许可证</text>
						</view>
						<input type="text" class="input" v-model="form.transportBusinessLicense" name="transportBusinessLicense"
						 placeholder="请输入运输经营许可证" placeholder-style="color:#B8B8B8;" />
					</view>
					<view class="grace-items">
						<view class="grace-label">
							<text class="write">*</text>
							<text>联系人姓名</text>
						</view>
						<input type="text" class="input" v-model="form.contacts" name="contacts" placeholder="请输入联系人姓名" placeholder-style="color:#B8B8B8;" />
					</view>
					<view class="grace-items">
						<view class="grace-label">
							<text class="write">*</text>
							<text>联系人电话</text>
						</view>
						<input type="text" class="input" v-model="form.contactsTel" name="contactsTel" placeholder="请输入联系人电话"
						 placeholder-style="color:#B8B8B8;" />
					</view>
					<view class="grace-items">
						<view class="grace-label">
							<text class="write">*</text>
							<text>社会统一信用代码</text>
						</view>
						<input type="text" class="input" v-model="form.socialUnifiedCode" name="socialUnifiedCode" placeholder="请输入社会统一信用代码"
						 placeholder-style="color:#B8B8B8;" />
					</view>
					<view class="grace-items">
						<view class="grace-label">
							<text class="write">*</text>
							<text>法定代表人</text>
						</view>
						<input type="text" class="input" v-model="form.legalperson" name="legalperson" placeholder="请输入法定代表人"
						 placeholder-style="color:#B8B8B8;" />
					</view>
					<view class="grace-items">
						<view class="grace-label">
							<text class="write">*</text>
							<text>开户名</text>
						</view>
						<input type="text" class="input" v-model="form.accountName" name="accountName" placeholder="请输入开户名"
						 placeholder-style="color:#B8B8B8;" />
					</view>
					<view class="grace-items">
						<view class="grace-label">
							<text class="write">*</text>
							<text>开户行</text>
						</view>
						<input type="text" class="input" v-model="form.openingBank" name="openingBank" placeholder="请输入开户行"
						 placeholder-style="color:#B8B8B8;" />
					</view>
					<view class="grace-items">
						<view class="grace-label">
							<text class="write">*</text>
							<text>银行账号</text>
						</view>
						<input type="text" class="input" v-model="form.bankAccount" name="bankAccount" placeholder="请输入银行账号"
						 placeholder-style="color:#B8B8B8;" />
					</view>
					<view class="grace-items">
						<view class="grace-label">
							<text>纳税人开户行</text>
						</view>
						<input type="text" class="input" v-model="form.taxpayerOpeningBank" placeholder="请输入纳税人开户行" placeholder-style="color:#B8B8B8;" />
					</view>
					<view class="grace-items">
						<view class="grace-label">
							<text>纳税人银行账号</text>
						</view>
						<input type="text" class="input" v-model="form.taxpayerBankAccount" placeholder="请输入纳税人银行账号" placeholder-style="color:#B8B8B8;" />
					</view>
					<view class="grace-items">
						<view class="grace-label">
							<text>纳税人姓名</text>
						</view>
						<input type="text" class="input" v-model="form.taxpayerName" placeholder="请输入纳税人姓名" placeholder-style="color:#B8B8B8;" />
					</view>
					<view class="grace-items">
						<view class="grace-label">
							<text>纳税人地址</text>
						</view>
						<input type="text" class="input" v-model="form.taxpayerAddress" placeholder="请输入纳税人地址" placeholder-style="color:#B8B8B8;" />
					</view>
					<view class="grace-items">
						<view class="grace-label">
							<text>纳税人电话</text>
						</view>
						<input type="text" class="input" v-model="form.taxpayerTel" placeholder="请输入纳税人电话" placeholder-style="color:#B8B8B8;" />
					</view>
					<view class="grace-items">
						<view class="grace-label">
							<text>注册资本</text>
						</view>
						<input type="text" class="input" v-model="form.registeredCapital" placeholder="请输入注册资本" placeholder-style="color:#B8B8B8;" />
					</view>
					<view class="grace-items">
						<view class="grace-label">
							<text class="write">*</text>
							<text>省市区县</text>
						</view>
						<div @click="showPicker" class="input addrStyle" v-if="form.addressName">{{form.addressName}}<text class="icon"></text></div>
						<div @click="showPicker" class="input addrStyle" v-if="!form.addressName">请选择<text class="icon"></text></div>
						<mpvue-city-picker ref="mpvueCityPicker" :pickerValueDefault="pickerValueDefault" @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
					</view>
					<view class="grace-items">
						<view class="grace-label">
							<text class="write">*</text>
							<text>详细地址</text>
						</view>
						<input type="text" class="input" v-model="form.address" name="address" placeholder="请输入详细地址" placeholder-style="color:#B8B8B8;" />
					</view>
					<view class="grace-items">
						<view class="grace-label">
							<text>备注</text>
						</view>
						<input type="text" class="input" v-model="form.remark" placeholder="请输入备注" placeholder-style="color:#B8B8B8;" />
					</view>
					<view class="grace-items">
						<view class="grace-label">
							<text>经营范围</text>
						</view>
						<input type="text" class="input" v-model="form.businessScope" placeholder="请输入经营范围" placeholder-style="color:#B8B8B8;" />
					</view>
					<upload-card des="点击上传营业执照" :showImgUrl="form.blUrl" type="business" @uploadSuccess="handleUploadSuccess($event, 'blUrl')" />
					<upload-card des="点击上传道路运输证" :showImgUrl="form.tblUrl" type="road" @uploadSuccess="handleUploadSuccess($event, 'tblUrl')" />
					<view style="height: 120upx;"></view>
				</view>

				<view class="bottom-button-wrap" v-if="type=='add'">
					<button formType="submit" type="primary">保存</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	import URL from '@/api/serverApi';
	import UploadCard from "@/components/uploadCard/uploadCard";
	import {
		get,
		post
	} from '@/utils/request';
	import mpvueCityPicker from '@/components/mpvue-citypicker';
	var graceChecker = require("@/graceUI/graceChecker.js");

	export default {
		data() {
			return {
				pickerValueDefault: [0, 0, 0],
				form: {
					isRegistered: true,
					isClient: 0,
					name: '',
					shortName: '',
					businessLicense: '',
					organizationCode: '',
					transportBusinessLicense: '',
					contacts: '',
					contactsTel: '',
					socialUnifiedCode: '',
					legalperson: '',
					accountName: '',
					openingBank: '',
					bankAccount: '',
					taxpayerOpeningBank: '',
					taxpayerBankAccount: '',
					taxpayerName: '',
					taxpayerAddress: '',
					taxpayerTel: '',
					registeredCapital: '',
					addressName: '',
					address: '',
					remark: '',
					businessScope: '',
					blUrl: '',
					tblUrl: ''
				},
				type: "add"
			};
		},
		components: {
			mpvueCityPicker,
			UploadCard
		},
		methods: {
			async formSubmit(e) {
				let _this = this;
				uni.hideKeyboard();
				//定义表单规则
				var rule = [{
						name: "name",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请输入企业名称"
					},
					{
						name: "businessLicense",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请输入营业执照号"
					},
					{
						name: "organizationCode",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请输入组织机构代码"
					},
					{
						name: "transportBusinessLicense",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请输入运输经营许可证"
					},
					{
						name: "contacts",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请输入联系人姓名"
					},
					{
						name: "contactsTel",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请输入联系人电话"
					},
					{
						name: "socialUnifiedCode",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请输入社会统一信用代码"
					},
					{
						name: "legalperson",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请输入法定代表人"
					},
					{
						name: "accountName",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请输入户名"
					},
					{
						name: "openingBank",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请输入开户行"
					},
					{
						name: "bankAccount",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请输入银行账号"
					},
					{
						name: "addressName",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请选择省市区"
					},
					{
						name: "address",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请输入详细地址"
					},
					{
						name: "blUrl",
						checkType: "notnull",
						errorMsg: "请上传营业执照"
					},
					{
						name: "tblUrl",
						checkType: "notnull",
						errorMsg: "请上传道路运输证"
					}
				];
				//进行表单检查
				var formData = this.form;
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					let url = "";
					if (this.type == "add") {
						url = URL.company.addcompany;
					} else if (this.type == "edit") {}

					post(url, formData)
						.then(res => {
							_this.getLoginInfo();
						})
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
			getLoginInfo: function() {
				get(URL.user.getuserinfo, {})
					.then(res => {
						uni.showToast({
							title: '填写成功',
							icon: 'none',
							success: () => {
								uni.setStorageSync('userInfo', res.data);

								setTimeout(() => {
									uni.switchTab({
										url: '/pages/index/index'
									});
								}, 500);
							},
							fail: () => {
								uni.showToast({
									title: res.msg,
									icon: 'none'
								});
							}
						})

					});
			},
			handleUploadSuccess(e, name) {
				this.form[name] = e;
			},
			showPicker() {
				this.$refs.mpvueCityPicker.show();
			},
			onCancel(e) {
				this.$refs.mpvueCityPicker.pickerCancel();
			},
			onConfirm(e) {
				this.form.addressCode = e.cityCode.replace(/-/g, ',');
				this.form.addressName = e.label.replace(/-/g, ',');
			},
			getCompany(companyId) {
				let url = URL.company.getCompany;
				let obj = {
					companyId: companyId
				};
				get(url, obj)
					.then(res => {
						if (res.data) {
							let companyInfo = res.data;
							this.form.id = companyInfo.id;
							this.form.isRegistered = companyInfo.isRegistered;
							this.form.isClient = companyInfo.isClient;
							this.form.name = companyInfo.name;
							this.form.shortName = companyInfo.shortName;
							this.form.businessLicense = companyInfo.businessLicense;
							this.form.organizationCode = companyInfo.organizationCode;
							this.form.transportBusinessLicense = companyInfo.transportBusinessLicense;
							this.form.contacts = companyInfo.contacts;
							this.form.contactsTel = companyInfo.contactsTel;
							this.form.socialUnifiedCode = companyInfo.socialUnifiedCode;
							this.form.legalperson = companyInfo.legalperson;
							this.form.accountName = companyInfo.accountName;
							this.form.openingBank = companyInfo.openingBank;
							this.form.bankAccount = companyInfo.bankAccount;
							this.form.taxpayerOpeningBank = companyInfo.taxpayerOpeningBank;
							this.form.taxpayerBankAccount = companyInfo.taxpayerBankAccount;
							this.form.taxpayerName = companyInfo.taxpayerName;
							this.form.taxpayerAddress = companyInfo.taxpayerAddress;
							this.form.taxpayerTel = companyInfo.taxpayerTel;
							this.form.registeredCapital = companyInfo.registeredCapital;
							this.form.addressName = companyInfo.addressName;
							this.form.address = companyInfo.address;
							this.form.remark = companyInfo.remark;
							this.form.businessScope = companyInfo.businessScope;
							this.form.blUrl = companyInfo.blUrl;
							this.form.tblUrl = companyInfo.tblUrl;
						} else {
							uni.showToast({
								title: "企业信息不存在",
								icon: "none"
							});
							setTimeout(() => {
								uni.navigateBack();
							}, 1500);
						}
					})
			}
		},
		onLoad(options) {
			if (options.id !== undefined) {
				this.type = "edit";
				this.getCompany(options.id);
			}
		}
	};
</script>

<style lang="scss">
	@import "@/style/index.scss";

	.company-wrap {
		background: #fff;
		
		.grace-items {
			padding-left: 20upx;

			.grace-label {
				width: 260upx;
				font-size: 30upx;
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

		.addrStyle {
			.icon {
				padding: 0;
			}

			.icon:after {
				content: "\E601";
				padding-left: 5px;
				color: #888;
				font-family: "grace-iconfont" !important;
				font-size: 15px;
			}
		}
	}
</style>
