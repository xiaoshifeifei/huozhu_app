 // const LOCALURL = "http://192.168.1.87:13100/owner/"
 // const LOCALURL = "http://47.99.107.169:13100/owner/"
 // const LOCALURL = "http://192.168.1.140:13100/owner/"
 //  const LOCALURL = "http://192.168.1.113:13100/owner/"
 const LOCALURL = "http://47.111.127.184:13100/owner/"
     //  const LOCALURL = "http://47.99.141.144:13100/owner/"
     //  const LOCALURL = "http://platform.fjzcht.com/owner/";


 const URL = {
     //上传图片
     uploadImg: LOCALURL + "core/omssrvorder/uploads", //--

     //登录
     login: LOCALURL + "core/login/app", //登录页面 +

     //注册
     register: {
         getsendsmscode: LOCALURL + "core/sms/getsendsmscode", //获取验证码 +
         register: LOCALURL + "core/register/registerOwner" //注册 +
     },

     //忘记密码
     findpwd: {
         checkcode: LOCALURL + "core/login/codeCheck", //验证手机验证码 +
         setpwd: LOCALURL + "core/login/retrievePassword" //设置密码 +
     },

     //我的
     user: {
         getuserinfo: LOCALURL + "core/login/getlogininfos", //获取用户信息 +
         loginout: LOCALURL + "core/login/logout", //退出登录 +
         edituserinfo: LOCALURL + "core/login/modifyUserInfo", //修改用户信息 +
         editpwd: LOCALURL + "core/login/ownerMofifyPassword", //修改密码 +
         addfeedback: LOCALURL + "feedback/sysfeedback/save" //添加反馈 +
     },

     //企业
     company: {
         addcompany: LOCALURL + "basic/orgcompanyaddress/addCompanyAddress", //新增企业 +
         getCompany: LOCALURL + "basic/orgcompany/addOwnerCompany" //获取企业信息 --
     },

     //常用信息
     address: {
         consigneelist: LOCALURL + "basic/orgcompanyaddress/findAddressPage", //地址列表 +
         addconsignee: LOCALURL + "basic/orgcompanyaddress/addCompanyAddress", //新增地址  +
         getconsignee: LOCALURL + "basic/orgcompanyaddress/info", //获取地址 + 
         editconsignee: LOCALURL + 'basic/orgcompanyaddress/modify', //修改地址 + -
         delconsignee: LOCALURL + 'basic/orgcompanyaddress/remove', //删除地址 +

         goodspage: LOCALURL + "order/srvordergoods/queryOrderGoodsPage", //物品列表 +
         addgoods: LOCALURL + "order/srvordergoods/addOrderGoods", //新增物品 +
         editgoods: LOCALURL + "order/srvordergoods/modifyOrderGoods", //修改物品 +
         getgoods: LOCALURL + "order/srvordergoods/getGoodsInfo", //获取物品 +
         delgoods: LOCALURL + "order/srvordergoods/remove" //删除物品 +
     },

     //订单
     order: {
         addtmsorder: LOCALURL + "order/srvorder/cusSave", //新增tms订单  +
         orderlist: LOCALURL + "order/srvorder/findCusOrderList", //订单列表 +
         getorder: LOCALURL + "order/srvorder/cusOrderInfo", //获取订单 +
         cancleorder: LOCALURL + "order/srvorder/cusCancleOrder", //取消订单 +
         editorder: LOCALURL + "basic/orgcompanyaddress/modify", //修改订单  +
         gettmsid: LOCALURL + "order/srvtrack/findTrackList", //获取指定托运单对应TMS订单 跟踪订单  --
         getline: LOCALURL + "core/omssrvorder/queryBusTrack", //获取车辆线路
     },

     //消息
     notice: {

     }
 }

 module.exports = URL