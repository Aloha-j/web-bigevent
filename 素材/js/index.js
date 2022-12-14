$(function () {
    getUserInfo()
    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        // console.log('ok');
        layer.confirm('确定退出?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // console.log('ok');
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
        });
    })
})


function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // Header: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取信息失败')
            }
            renderAvatar(res.data)
        },
        // Complete: function (res) {
        //     // console.log('执行了complete回调');
        //     // console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败!') {
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }
    })

}

function renderAvatar(user) {
    var name = user.nickname || user.username
    $('welcome').html('欢迎&nbsp;欢迎&nbsp;' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text.-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}


