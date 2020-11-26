$(function () {
    var form = layui.form
    // 设置表单规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '不能和原密码一致哦'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致'
            }
        }
    })
    // 重置密码
    $('.layui-form').submit(function (e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg('更新密码失败！', { icon: 5 })
                }
                layui.layer.msg('更新密码成功！', { icon: 6 })
                window.parent.location.href = '/login.html'
                $('.layui-form')[0].reset()
            }
        })
    })
})