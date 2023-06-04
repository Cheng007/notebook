## 微信相关

## 微信小程序

微信小程序不能唤起App（从APP拉起小程序场景除外）见官方[通知](https://developers.weixin.qq.com/community/develop/doc/000c04d94c0588744a2cf4d9c5bc09)

## 微信小程序内嵌H5

通过`web-view`组件可以实现小程序内嵌普通H5页面，H5页面会自动铺满整个小程序页面，小程序中导航可以正常的前进和后退，
分享时默认会自动截取当前页面部分作为卡片封面，可以调用部分小程序接口如：导航，获取环境，仅支持部分JSSDK，

图片保存目前官方只能通过长按的形式（网上有通过js来实现，但成本较高，未实践过）

[官方文档](https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html)

## 微信H5

H5 唤起微信小程序或是APP可以使用微信开放标签
