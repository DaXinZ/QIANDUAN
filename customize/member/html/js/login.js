// 假设 'queryButton' 是注册按钮的ID，且表单的ID是 'registrationForm'
document.getElementById('enter').addEventListener('click', function(event) {
    event.preventDefault(); // 阻止表单默认提交行为

    var formData = {
        name: document.getElementById('name').value,
        password: document.getElementById('password').value,
    };

    console.log('入参日志', formData);

    // 发送POST请求到后端注册接口
    fetch('http://localhost:8088/Users/login.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) { // 检查响应状态是否成功
            throw new Error('Network response was not ok: ' + response.status);
        }
        return response.json(); // 解析JSON格式的响应体
    })
    .then(data => {
        
        if(data.status === 200 && data.msg === "OK") {
            // 注册成功，跳转到个人中心页面
            // 将用户信息拼接成查询字符串参数
            var userInfo = encodeURIComponent(JSON.stringify(data.data));
            console.log('登录成功，返回数据：', data);
            window.location.href = 'personage.html?id=' + data.data.id;
        } else {
            // 服务端返回了异常数据，但状态码是200
            alert('登录失败：' + data.msg);
            console.log('登录失败，返回数据：', data);
        }
    })
    .catch((error) => {
        console.error('登录过程中发生错误：', error);
        alert('登录失败，请稍后重试！');
    });
});