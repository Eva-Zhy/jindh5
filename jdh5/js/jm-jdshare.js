!function(e,n){"function"==typeof define&&define.amd?define(function(){return n(e)}):"undefined"!=typeof module&&module.exports?module.exports=n(e):e.jdshare=n(e)}("undefined"!=typeof window?window:this,function(l){var e;setTimeout(function(){try{var e=new MPing.inputs.Click("Mnpm_ComponentApplied");e.event_param="jdshare",e.updateEventSeries(),(new MPing).send(e)}catch(e){}},1500);var n=navigator.userAgent.toLowerCase(),t=n.split(";"),a=-1!=n.indexOf("jdapp"),c=function(){if(a&&t[2])try{return parseInt(t[2].replace(/\./g,""))}catch(e){}}(),r="android"===t[1],i="iphone"===t[1],o=r||i,p=-1!=n.indexOf("ipad"),h=(/MicroMessenger/i.test(n),o&&a&&500<=c),m=o&&a&&440<=c&&c<500,s=p&&a&&360<=c,f=o&&a&&702<=c,d=o&&a&&836<=c,u=o&&a&&c<=840,k=o&&a&&620<=c,y=l.isJDAppNewShareEnable&&1==l.isJDAppNewShareEnable,b=o?"openapp.jdmobile://":p?"openapp.jdipad://":void 0,I="Y",S="N",w="S",g="P",v="O";function C(e){return'openapp.jdmobile://communication?params={"des":"share","type":"111","title":"'+e.title+'","content":"'+e.content+'","shareUrl":"'+e.url+'","iconUrl":"'+e.img+'","shareActionType":"'+e.shareActionType+'","channel":"'+e.channel+'","timeline_title":"'+e.timeline_title+'","qrparam":"'+e.qrparam+'","keyparam":"'+e.keyparam+'","callback":"'+e.callbackSwitcher+'","clickcallback":"'+e.clickcallbackSwitcher+'"}'}function U(e){var n={title:e.title,content:e.content,shareUrl:decodeURIComponent(e.url),iconUrl:decodeURIComponent(e.img),shareActionType:e.shareActionType,channel:e.channel,timeline_title:e.timeline_title,qrparam:e.qrparam,keyparam:e.keyparam,callback:e.callbackSwitcher,clickcallback:e.clickcallbackSwitcher,eventId:""};f&&e.mpId&&e.mpPath&&e.mpIconUrl&&(n.mpId=e.mpId,n.mpPath=e.mpPath,n.mpIconUrl=e.mpIconUrl,n.mpType=e.mpType),k&&e.incentiveBizType&&e.incentiveBizId&&(n.incentiveBizType=e.incentiveBizType,n.incentiveBizId=e.incentiveBizId),shareHelper.initShare(JSON.stringify(n))}function _(e,n){shareHelper[e](n.title,n.content,decodeURIComponent(n.url),decodeURIComponent(n.img),n.callbackSwitcher)}function T(e,n){shareHelper[e](n.title,n.content,decodeURIComponent(n.url),decodeURIComponent(n.img))}function R(e,n){return'openapp.jdmobile://communication?params={"action":"'+n+'","title":"'+e.title+'","content":"'+e.content+'","shareUrl":"'+e.url+'","iconUrl":"'+e.img+'","isCallBack":"'+e.callbackSwitcher+'"}'}function j(e){var n,t={category:"jump",des:"share",type:"111",title:e.title,content:e.content,shareUrl:e.url,imageUrl:e.img,iconUrl:e.img,timeline_title:e.timeline_title,qrparam:e.qrparam,keyparam:e.keyparam,channel:e.channel,isCallBack:e.callbackSwitcher,clickcallback:e.clickcallbackSwitcher,shareActionType:e.shareActionType};if(f&&e.mpId&&e.mpPath&&e.mpIconUrl&&(t.mpId=e.mpId,t.mpPath=encodeURIComponent(e.mpPath),t.mpIconUrl=encodeURIComponent(e.mpIconUrl),t.mpType=e.mpType),d){n=e.keyparam,"[object Object]"===Object.prototype.toString.call(n)&&(function(e,n){for(var t in e)e.hasOwnProperty(t)&&-1<n.indexOf(t)&&(e[t]=encodeURIComponent(e[t]))}(e.keyparam,["keyImg","url","keyId"]),t.keyparam=e.keyparam)}return k&&e.incentiveBizType&&e.incentiveBizId&&(t.incentiveBizType=e.incentiveBizType,t.incentiveBizId=e.incentiveBizId),b+"virtual?params="+JSON.stringify(t)}function A(e){if(!(this instanceof A))return new A(e)}function q(e){this.message=e,this.name="JdShareException",this.toString=function(){return this.name+": "+this.message}}function H(e,n){for(var t in n)n.hasOwnProperty(t)&&void 0!==n[t]&&(e[t]=n[t])}function O(e,n){return""==n?e:(e+"&"+n).replace(/[&?]{1,2}/,"?")}function E(n){l.jdappShareRes=function(e){e.hasOwnProperty("shareResult")?n.callback&&n.callback(e):i&&d&&u&&e.hasOwnProperty("shareEvent")?("CANCEL_SHARE_CONTENT"==e.shareEvent?(e.shareResult="2",e.shareChannel=""):(e.shareResult="0",e.shareChannel={WeChat_Friend:"Wxfriends",WeChat_FriendTimeline:"Wxmoments",Weibo:"Sinaweibo",QQFriend_SHARE_CLIENT:"QQfriends",QQZone_SHARE_CLIENT:"QQzone"}[e.shareEvent]),n.callback&&n.callback(e)):n.clickcallback&&n.clickcallback(e)}}function B(e){var n="";if(e){if(i){if(m){if(n={Wxfriends:"WeChat_Friend",Wxmoments:"WeChat_FriendTimeline",Sinaweibo:"Weibo",QQfriends:"QQFriend_SHARE_CLIENT",QQzone:"QQZone_SHARE_CLIENT",Moreshare:""}[e])return n;throw new q("输入的channel参数在iphone版本中不存在")}return e}return e}return e}function z(e){return void 0!==e.title&&void 0!==e.content&&void 0!==e.url&&void 0!==e.img}function Q(e){if(z(e)){try{var n,t,a,c,r={timeline_title:"",channel:"",qrparam:null,keyparam:null,callback:null,clickcallback:null,mpId:null,mpPath:null,mpIconUrl:null,mpType:null,incentiveBizType:null,incentiveBizId:null};"[object Object]"===Object.prototype.toString.call(e)&&H(r,e),n="function"==typeof r.callback,a="function"==typeof r.clickcallback,t=n?I:S,c=a?I:S,n&&a?E({callback:r.callback,clickcallback:r.clickcallback}):n?E({callback:r.callback}):a&&E({clickcallback:r.clickcallback}),"[object Object]"===Object.prototype.toString.call(r.qrparam)&&(r.qrparam.top_pic=r.qrparam.top_pic?encodeURIComponent(decodeURIComponent(r.qrparam.top_pic)):"",r.qrparam.mid_pic=r.qrparam.mid_pic?encodeURIComponent(decodeURIComponent(r.qrparam.mid_pic)):"",r.qrparam.qr_direct=r.qrparam.qr_direct?encodeURIComponent(decodeURIComponent(r.qrparam.qr_direct)):""),r.callbackSwitcher=t,r.clickcallbackSwitcher=c,r.url=O(r.url,"_ts="+(new Date).getTime()),r.channel=B(r.channel),r.url=encodeURIComponent(r.url),r.img=encodeURIComponent(r.img)}catch(e){throw e}return r}throw new q("调用方法时传入配置对象格式错误，请查看文档")}function P(e){if(!z(e))throw new q("调用方法时传入配置对象格式错误，请查看文档");try{var n,t,a,c,r={category:"jump",des:"share",type:"111",title:e.title,content:e.content,shareUrl:e.url,imageUrl:e.img,iconUrl:e.img,timeline_title:e.timeline_title,qrparam:e.qrparam,keyparam:e.keyparam,channel:e.channel};"[object Object]"===Object.prototype.toString.call(e)&&H(r,e),n="function"==typeof r.callback,a="function"==typeof r.clickcallback,t=n?I:S,c=a?I:S,n&&a?E({callback:r.callback,clickcallback:r.clickcallback}):n?E({callback:r.callback}):a&&E({clickcallback:r.clickcallback}),r.callbackSwitcher=t,r.clickcallbackSwitcher=c,r.url=O(r.url,"_ts="+(new Date).getTime()),r.channel=B(r.channel);var i={method:"configShare",params:JSON.stringify(r)};l.webkit.messageHandlers.JDAppUnite.postMessage(i)}catch(e){throw console.log("error",e),e}}return(q.prototype=Object.create(Error.prototype)).constructor=q,A.prototype.setShareInfo=function(e){try{var n=null;if(a)if((n=Q(e)).shareActionType=w,r)if(l.shareHelper)if("function"==typeof shareHelper.initShare)U(n);else if("function"==typeof shareHelper.setShareInfoCallback)if(n.callbackSwitcher===I)try{_("setShareInfoCallback",n)}catch(e){T("setShareInfoCallback",n)}else try{_("setShareInfoCallback",n)}catch(e){"function"==typeof shareHelper.setShareInfo&&T("setShareInfo",n)}else"function"==typeof shareHelper.setShareInfo&&T("setShareInfo",n);else l.location.href=C(n);else(i||p)&&(h||s?y?(e.shareActionType=w,P(e)):location.href=j(n):i&&(location.href=R(n,"syncShareData")))}catch(e){throw e}},A.prototype.callSharePane=function(e){try{var n=null;(n=Q(e)).shareActionType=g,r?a&&l.shareHelper?"function"==typeof shareHelper.initShare?U(n):"function"==typeof shareHelper.callShare?_("callShare",n):l.location.href=C(n):l.location.href=C(n):(i||p)&&(h||s?y?(e.shareActionType=g,P(e)):location.href=j(n):i&&(location.href=R(n,"share")))}catch(e){throw e}},A.prototype.sendDirectShare=function(e){try{var n,t=null;if((t=Q(e)).shareActionType=v,r)a&&l.shareHelper?"function"==typeof shareHelper.initShare?U(t):"function"==typeof shareHelper.sendShare?shareHelper.sendShare(t.title,t.content,decodeURIComponent(t.url),decodeURIComponent(t.img),t.channel,t.callbackSwitcher):location.href=C(t):l.location.href=C(t);else if(i||p){if(!t.channel)throw new q("分享渠道未设置");h||s?y?(e.shareActionType=v,P(e)):location.href=j(t):i&&(n='openapp.jdmobile://virtual?params={"category":"jump","des":"share","type":"111","title":"'+t.title+'","content":"'+t.content+'","shareUrl":"'+t.url+'","imageUrl":"'+t.img+'","channel":"'+t.channel+'","isCallBack":"'+t.callbackSwitcher+'"}',location.href=n)}}catch(e){throw e}},e=e||A()});