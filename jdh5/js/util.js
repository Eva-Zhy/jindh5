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
window.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
console.log("isIOS",isIOS);

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

