var text = "";
(function () {
    var timeCode;
    var size = -1;
    var type = 0;//0���� 1����
    function resize() {
        console.log("xxx", 123);

        var sUserAgent = navigator.userAgent.toLowerCase();
        console.log("sUserAgent", sUserAgent);
        var isHuawei = sUserAgent.match(/huawei/i) == "huawei";
        var isHonor = sUserAgent.match(/honor/i) == "honor";

        var isAndroid = window.navigator.appVersion.match(/android/gi);
        var isIPhone = window.navigator.appVersion.match(/iphone/gi);

        var scale = 1.0;
        var ratio = 1;
        if (isIPhone) {
            if (window.devicePixelRatio == 2) {
                scale *= 0.5;
                ratio *= 2;
            }
            if (window.devicePixelRatio == 3) {
                scale *= (1 / 3);
                ratio *= 3;
            }
        }


        if (text == "") {
            text = '<meta name="viewport" content="initial-scale=' + scale + ', maximum-scale=' + scale + ',' + ' minimum-scale=' + scale + ', width=device-width,' + ' user-scalable=no" />';
            console.log(text);
            // document.write(text);
        }

        var docEl = document.documentElement;
        var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
        //var recalc = function () {
        var clientWidth = docEl.clientWidth;
        console.log(".fontSize2", clientWidth)
        if (!clientWidth) return;
        if (clientWidth <= 750) {
            docEl.style.fontSize = clientWidth / 40 + 'px';
        } else {
            // document.documentElement.style.fontSize='18px';
            docEl.style.fontSize = clientWidth / 40 + 'px';
        }
        console.log(".fontSize", docEl.style.fontSize)
        // 解决部分rem特别大的问题
        var docElFontSize = docEl.style.fontSize.replace(/px/gi, '');
        var computedFontSize = window.getComputedStyle(docEl)['font-size'].replace(/px/gi, '');
        docElFontSize != computedFontSize && (docEl.style.fontSize = docElFontSize * docElFontSize / computedFontSize + 'px');
        //}


        //if (isHuawei || isHonor) {
        //}else {
        //var clientLength=type==0?document.documentElement.clientWidth:document.documentElement.clientHeight;
        //    console.log("clientLength",clientLength);
        //if(clientLength<=750) {
        //    document.documentElement.style.fontSize = clientLength/40+'px';
        //    console.log("fontSize1", clientLength/40+'px');
        //    console.log("fontSize2", 100 * (clientLength / 750) + 'px');
        //} else if(size>0) {
        //    document.documentElement.style.fontSize=size/40+'px';
        //} else {
        //    document.documentElement.style.fontSize='18px';
        //}

        console.log(" document.documentElement.style.fontSize", document.documentElement.style.fontSize)
        //}
    }

    resize();
    window.addEventListener("resize", function () {
        //clearTimeout(timeCode);
        //timeCode = setTimeout(resize, 100);
        console.log(123);
        resize();
    }, false);

    //window.resize=function(s,t){
    //    size=s;
    //    type=t;
    //    resize();
    //};

})();