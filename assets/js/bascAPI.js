$(function () {
    var bascURL = 'http://ajax.frontend.itheima.net'
    // ajaxPrefilter 这个函数会在发送请求或者接受请求之前调用一下 可以获得里面的参数
    $.ajaxPrefilter(function (params) {
        params.url = bascURL + params.url
    })
})