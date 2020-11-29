$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
    // 
    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    })
    var layer = layui.layer
    // 上传图片
    $('#file').change(function (e) {
        var file = e.target.files[0]
        // 非空效验
        if (file === undefined) {
            return layer.msg('请上传文件！')
        }
        // 根据选择的文件，创建一个对应的 URL 地址：
        var newImgURL = URL.createObjectURL(file)
        // 先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域：
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)
    })
    // 给上传图片 确定按钮设置点击事件
    $('#btnUpload').on('click', function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        $.ajax({
            method: "POST",
            url: '/my/update/avatar',
            data: {
                avatar : dataURL
            },
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('更新头像失败', { icon: 5 })
                }
                layer.msg('恭喜你更新头像成功', { icon: 6 });
                // 调用父级的 js函数
                window.parent.getUSerInof()
            }
        })
    })
})