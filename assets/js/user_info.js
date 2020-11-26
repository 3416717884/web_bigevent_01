$(function () {
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度在 1 ~ 6 位之间'
            }
        }
    })
    var layer = layui.layer
    initUserInfo()
    // 获取用户信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                form.val('formUserInfo', res.data)
            }
        })
    }
    // 重置按钮绑定事件
    $('#btnReset').on('click', function (e) {
        // 阻止默认重置
        e.preventDefault()
        // 重新渲染
        initUserInfo()
    })
    // 提交修改
    $('.layui-form').submit(function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message,{icon : 5})
                } 
                layer.msg(res.message,{icon : 6})
                // 如何调用 父页面上的js 函数
                window.parent.getUSerInof()
            }
        })
    })
})