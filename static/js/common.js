// global.host = 'http://192.168.1.230:2019';
// global.host = 'http://118.178.232.193:2019';
global.host = 'http://118.178.229.154:2019';
global.imgURl = 'http://image.test.ppmiao.com/Uploads/';
// global.host = 'https://sailsact.ppmiao.com';
// global.imgURl = 'https://image.ppmiao.com/Uploads/';
global.autoplay = '';
var mobile = getQueryString('mobile');
var data = getQueryString('data');
var u = navigator.userAgent;
global.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
global.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
global.token = data;
global.version = getQueryString('version');
global.versionName = getQueryString('versionName');
if(global.versionName == null){
    global.versionName = global.version;
}
global.mobile = mobile;
function getQueryString (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
