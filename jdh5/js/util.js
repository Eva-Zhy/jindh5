// 隐藏显示
var hiddenProperty = 'hidden' in document ? 'hidden' :
    'webkitHidden' in document ? 'webkitHidden' :
        'mozHidden' in document ? 'mozHidden' :
            null;
var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
window.need_show_msg = false;
window.need_show_msg2 = false;
window.need_show_num = 0;
var onVisibilityChange = function () {
    if (!document[hiddenProperty]) {
        console.log('我出现了');
    } else {
        console.log('我隐藏了');
    }
}
document.addEventListener(visibilityChangeEvent, onVisibilityChange)

var u = navigator.userAgent;
window._isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
console.log("_isAndroid",_isAndroid);
function getLaciton() {
// 获得经纬度
    var routerParam = {appid: window.appid};
    console.log("_isAndroid", _isAndroid)
    if (_isAndroid) {
        console.log("_isAndroid调试", _isAndroid)
        const jsonStr = {
            routerURL:
                'router://com.jingdong.app.mall.location.JSLocationManager/getAddress',
            routerParam: _isAndroid ? JSON.stringify(routerParam) : routerParam,
            callBackName: 'getAddressCallback',
            callBackId: new Date().getTime()
        }
        window.JDAppUnite && window.JDAppUnite.callRouterModuleWithParams(JSON.stringify(jsonStr));
    } else {
        console.log("ios调试", _isAndroid)
        const jsonStr = {
            routerURL:
                'router://JDBLBSKitModule/getAddressInfo',
            routerParam: _isAndroid ? JSON.stringify(routerParam) : routerParam,
            callBackName: 'getAsyncAddressInfoCb',
            callBackId: new Date().getTime()
        }
        window.webkit.messageHandlers.JDAppUnite.postMessage({
            // method: 'callSyncRouterModuleWithParams',
            method: 'callRouterModuleWithParams',
            params: JSON.stringify(jsonStr)
        });
    }
}


function getAsyncAddressInfoCb(res) {
    console.log(res);
    var res2 = JSON.parse(res);
    console.log(res2);
    window.srclat = res2.data.srclat;
    window.srclng = res2.data.srclng;
    getJdShop(res2.data.srclat, res2.data.srclng)
}

function getAddressCallback(res) {
    console.log(res);
    var res2 = JSON.parse(res);
    console.log(res2);
    window.srclat = res2.data.srclat;
    window.srclng = res2.data.srclng;
    getJdShop(res2.data.srclat, res2.data.srclng)
}

// 打开小程序
function getJdmpShop(storeId, venderId, skuId = '') {
    let url = `openapp.jdmobile://virtual?params={"category":"jump","des":"jdmp","appId":"${venderId}","vapptype":"1","param":{"storeId":"${storeId}","venderId":"${venderId}","bizType":1, "source":"1","skuId": "${skuId}"}}`
    return url
}

// 获得附近店铺
function getJdShop(srclat, srclng) {
    console.log("srclat", srclat)
    console.log("srclng", srclng)

    $.ajax({
        type: "get",
        url: "https://api.m.jd.com/client.action",//路径
        data: {
            functionId: "qryCompositeMaterials",
            body: '{"qryParam":"[{\\"next\\":[],\\"mapTo\\":\\"data1_1\\",\\"type\\":\\"advertGroup\\",\\"id\\":\\"04769719\\"}]",' +
                '"activityId":"2royoYfkou2NK8cKd8AJm6DcUKcp",' +
                '"pageId":"",' +
                '"reqSrc":"mainActivity",' +
                '"platform":0,' +
                '"geo":{"lng":"' + srclng + '","lat":"' + srclat + '"}}',
            client: "wh5",
            area: "",
            networkType: "4g",
            t: "1598675988086",
            clientVersion: "1.0.0",
            uuid: "1588733072843792621790",
        },
        dataType: "json",
        success: function (res) {
            console.log("到家请求", res);
            // $("#showValue").html("到家请求:" + JSON.stringify(res));

            var list = res.data.data1_1.list;
            if (list.length != 0) {
                var nodeString = '';
                for (var i = 0; i < list.length; i++) {
                    console.log(list[i]);
                    var shopLogo = 'https://m.360buyimg.com' + list[i].extension.shopLogo;
                    var agingType = list[i].extension.agingType;// 送达
                    var initialDeliveryPrice = list[i].extension.initialDeliveryPrice;//起送费
                    var baseFreight = list[i].extension.baseFreight; //基础运费
                    var venderId = list[i].extension.venderId; //基础运费
                    var storeId = list[i].extension.storeId; //基础运费
                    var storeName = list[i].extension.storeName; //基础运费

                    console.log(shopLogo);
                    console.log(agingType);
                    console.log(initialDeliveryPrice);
                    console.log(baseFreight);
                    console.log(venderId);
                    console.log(storeId);

                    var coupon_html = ''
                    if (list[i].extension.joinCouponInfos!=undefined) {
                        for (var e = 0; e < list[i].extension.joinCouponInfos.length; e++) {
                            if (e < 3) {
                                coupon_html += `<div class="coupon-box">
                                <img src="img/quan2.png" alt="" class="coupon-pic">
                                <span class="coupon-text">满${list[i].extension.joinCouponInfos[e].quota}减${list[i].extension.joinCouponInfos[e].discount}</span>
                            </div>`
                            }
                        }
                    }
                    // var shop_url2 = `https://kai.jd.com/client?appId=jzone_crm&functionId=StoreInfoJsfService.storeInfoView&body={"param":{"venderId":${venderId},"storeId":${storeId},"lng":"${srclng}","lat":"${srclat}","storeType":"1"}}`
                    // var shop_url2 = `https://thunder.jd.com/stores/#/?venderId=${venderId}&storeId=${storeId}&source=1&lng=${srclng}&lat=${srclat}`;
                    var shop_url2 = getJdmpShop(storeId, venderId, '');

                    nodeString += `
                <div class="shop-item" data-url='${shop_url2}' >
                    <img src=${shopLogo} alt="" class="shop-pic">
                    <div class="shop-content">
                        <div class="shop-name">${storeName}</div>
                        <div class="coupon-box-v">
                            ${coupon_html}
                        </div>
                        <div class="coupon-info">
                        <span style="display: ${initialDeliveryPrice!=undefined?'block':'none'};float:left;">起送费￥${initialDeliveryPrice}</span>
                         <span style="display: ${baseFreight!=undefined?'block':'none'}; float:left;">/基础运费${baseFreight}</span>
                        </div>
                    </div>
                    <img style="display: ${agingType!=undefined?'block':'none'};" src="img/che.png" alt="" class="time-pic">
                    <span style="display: ${agingType!=undefined?'block':'none'};" class="time-text">${agingType}分钟送达</span>
                </div>`


                }
                $('#shopList2').html(nodeString);
                $(".shop-item").click(function () {
                    var shop_url = $(this).attr("data-url");
                    // jdar.openUrl(shop_url);
                    location.href = shop_url;
                    // jdar.openUrl(shop_url);
                });
            } else {
                $('#shopList2').html('<div class="meidian">新店正在筹备中，敬请期待哦~</div>');
            }
        },
        error: function (error) {
            console.log("Error: " + JSON.stringify(error));
        }
    });

    $.ajax({
        type: "get",
        url: "https://api.m.jd.com/client.action",//路径
        data: {
            functionId: "qryCompositeMaterials",
            body: '{"qryParam":"[{\\"next\\":[],\\"mapTo\\":\\"data1_1\\",\\"type\\":\\"advertGroup\\",\\"id\\":\\"04767476\\"}]",' +
                '"activityId":"2royoYfkou2NK8cKd8AJm6DcUKcp",' +
                '"pageId":"",' +
                '"reqSrc":"mainActivity",' +
                '"platform":0,' +
                '"geo":{"lng":"' + srclng + '","lat":"' + srclat + '"}}',
            client: "wh5",
            area: "",
            networkType: "4g",
            t: "1598675988086",
            clientVersion: "1.0.0",
            uuid: "1588733072843792621790",
        },
        dataType: "json",
        success: function (res) {
            // console.log("无界请求", res);
            // $("#showValue2").html("无界请求:" + JSON.stringify(res));

            console.log("无界请求", res);
            // $("#showValue").html("到家请求:" + JSON.stringify(res));
            var list = res.data.data1_1.list;
            if (list != 0) {
                var nodeString = '';
                for (var i = 0; i < list.length; i++) {
                    console.log(list[i]);
                    var shopLogo = list[i].extension.storeLogo;
                    var storeDistance = list[i].extension.storeDistance;
                    var storeAddress = list[i].extension.storeAddress;
                    var venderId = list[i].extension.venderId;
                    var storeId = list[i].extension.storeId;
                    var storeName = list[i].extension.storeName;

                    console.log(venderId);
                    console.log(storeId);
                    console.log(storeAddress);
                    console.log(storeDistance);
                    console.log(storeName);
                    var shop_url2 = `https://thunder.jd.com/stores/#/?venderId=${venderId}&storeId=${storeId}&source=1&lng=${srclng}&lat=${srclat}`;
                    // https://kai.jd.com/client?appId=jzone_crm&functionId=StoreInfoJsfService.storeInfoView&body={"param":{"venderId":${venderId},"storeId":${storeId},"lng":"${srclng}","lat":"${srclat}","storeType":"1"}}
                    // var shop_url2 = getJdmpShop(storeId, venderId, '');

                    nodeString += `
                <div class="shop-item" data-url='${shop_url2}' >
                    <img src=${shopLogo} alt="" class="shop-pic">
                    <div class="shop-content">
                        <div class="shop-name2">${storeName}</div>
                        <div class="coupon-info2">${storeAddress}</div>
                    </div>
                    <img src="img/dingwei.png" alt="" class="time-pic2">
                    <span class="time-text2">距离${storeDistance}</span>
                </div>`
                }
                $('#shopList1').html(nodeString);
                $(".shop-item").click(function () {
                    var shop_url = $(this).attr("data-url");
                    jdar.openUrl(shop_url);
                    // location.href = shop_url;
                });
            } else {
                $('#shopList1').html('<div class="meidian">新店正在筹备中，敬请期待哦~</div>');
            }
        },
        error: function (error) {
            console.log("Error: " + JSON.stringify(error));
        }
    });
}



// 风控
function jdFengkong() {
    var pin = jdar.getPin();
    var timestamp = Date.parse(new Date()) / 1000;
    var paramsrting = window.activity_id + window.app_id + pin;
    var sign = getSign(paramsrting, timestamp);
    $.ajax({
        type: "get",
        url: "https://arvractivity.jd.com/activity/isRisk.do",//路径
        data: {
            activity_id: window.activity_id,
            app_id: window.app_id,
            pin:pin,
            timestamp:timestamp,
            sign: sign
        },
        xhrFields: {
            withCredentials: true
        },
        dataType: "json",
        success: function (res) {
            if (res.rc == 200) {
                if (res.rv == "true") {
                } else {
                }
            }
        },
        error: function (error) {
            console.log("Error: " + JSON.stringify(error));
        }
    });
}

// 关注店铺
function followShop(shop_id) {
    var timestamp = Date.parse(new Date()) / 1000;
    var op_type = 1;
    var paramsrting = window.activity_id + window.app_id + op_type + shop_id;
    var sign = getSign(paramsrting, timestamp);
    $.ajax({
        type: "get",
        url: "https://arvractivity.jd.com/activity/followShop.do",//路径
        data: {
            activity_id: window.activity_id,
            app_id: window.app_id,
            op_type: op_type,
            shop_id: shop_id,
            timestamp: timestamp,
            sign: sign
        },
        xhrFields: {
            withCredentials: true
        },
        dataType: "json",
        success: function (res) {
            console.log("res", res);
            if (res.rc == 200) {

            } else {

            }
        },
        error: function (error) {
            console.log("Error: " + error);
        }
    });
}

function jdClick(eventId,click_id) {
    var eventId = eventId;                         // 必选参数，填写埋点方案中event_id（想先进行点击位归类，同一个归类的埋点对应同一个event_id）
    var click = new MPing.inputs.Click(eventId);        // 构造click请求
    click.event_param =window.activeid+click_id;         // 必选参数，填写埋点方案中event_param（编写形式见上文埋点上报参数说明）
    click.updateEventSeries();                                   // 更新事件串
    var mping = new MPing();                              // 构造上报实例
    mping.send(click);
}

// 发送京豆
function sendBean(value) {
    var timestamp = Date.parse(new Date()) / 1000;
    var paramsrting = window.activity_id + window.app_id + window.bean_id + value;
    var sign = getSign(paramsrting, timestamp);
    $.ajax({
        type: "post",
        url: "https://arvractivity.jd.com/activity/sendBean.do",//路径
        data: {
            activity_id: window.activity_id,
            app_id: window.app_id,
            bean_id: window.bean_id,
            value: value,
            timestamp: timestamp,
            sign: sign
        },
        xhrFields: {
            withCredentials: true
        },
        dataType: "json",
        success: function (res) {
            console.log("res", res);
            if (res.rc == 200) {
                layer.msg("恭喜你~领取成功！");
            } else {
                layer.msg("活动太火爆，请稍后在试！");
            }
        },
        error: function (error) {
            console.log("Error: " + JSON.stringify(error));
        }
    });
}

// 发优惠券
function sendCoupon(coupon_id) {
    var timestamp = Date.parse(new Date()) / 1000;
    var paramsrting = window.activity_id + window.app_id + coupon_id;
    var sign = getSign(paramsrting, timestamp);
    $.ajax({
        type: "get",
        url: "https://arvractivity.jd.com/activity/sendCoupon.do",//路径
        data: {
            activity_id: window.activity_id,
            app_id: window.app_id,
            coupon_id: coupon_id,
            timestamp: timestamp,
            sign: sign
        },
        xhrFields: {
            withCredentials: true
        },
        dataType: "json",
        success: function (res) {
            console.log("res", res);
            if (res.rc == 200) {
                layer.msg("领取优惠券成功！");
            } else {
                layer.msg("领取优惠券失败！请联系工作人员！");
            }
        },
        error: function (error) {
            console.log("Error: " + JSON.stringify(error));
        }
    });
}
// 添加购物车
function addcart(shop_sku,goods_url) {
    window.AddcartToolObj.addCart({
        commArr: [{skuId: shop_sku, num: "1"}], // SKUId以及加车数量
        source: 'vryxhd',
        isWq: false,
        actId: 0,
        sucFun(data) {
            console.log('ok,接口请求成功,不一定指的加车成功,加车成功需要看返回码');
            console.log(data.errId);
            if (data.errId == 0) {
                layer.msg("添加购物车成功！");
                setTimeout(function () {
                    jdar.openUrl(goods_url);
                }, 500);
            }
            // data属性errId   ---为0 表示加车成功， 其他为加车失败
            // 其中 为 13 则表示未登录，需要自己处理登录逻辑('当然登录前提是actId进行强制登录校验')
            // 属性errMsg  --- 为失败的后台提示，注意请开发自己做兼容判断
        },
        failFun() {
            console.log('加车接口请求失败,无返回值');
        }
    });
}


// 获取加密md5参数
function getSign(paramsrting, timestamp) {
    var sing = md5(window.signKey + paramsrting + timestamp);
    console.log(sing);
    return sing;
}

