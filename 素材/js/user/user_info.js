$(function () {
    var form = layui.form
    var layuer = layui.layuer

    form.verify({
        nikename: function (value) {
            if (value.length > 6) {
                return '长度应在1-6位!'
            }
        }
    })
    initUserinfo()

    // 初始化用户信息

    function initUserinfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layuer.msg('获取用户失败')
                }
                console.log(res);
                // console.log(1234)
                form.val('formUserinfo', res.data)
            }
        })
    }


    // 重置表单数据
    $('#btnReset').on('click', function (e) {
        // console.log(123);
        e.preventDefault()
        initUserinfo()
    })



    // 阻止表单的默认提交行为
    $('.layui-form').on('submit', function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
        // 发起 ajax 数据请求
        $.ajax({
          method: 'POST',
          url: '/my/userinfo',
          data: $(this).serialize(),
          success: function(res) {
            if (res.status !== 0) {
              return layer.msg('更新用户信息失败！')
            }
            layer.msg('更新用户信息成功！')
            // 调用父页面中的方法，重新渲染用户的头像和用户的信息
            window.parent.getUserInfo()
          }
        })
      })
})