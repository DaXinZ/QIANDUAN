document.getElementById('queryButton').addEventListener('click', function(event) {
    event.preventDefault(); // 阻止表单默认提交行为
    console.log("aaaaa",event);
    var formData = {
        name: document.getElementById('name').value,
        nickname: document.getElementById('nickname').value, // 修改字段名称
        password: document.getElementById('password').value,
        confirmpassword: document.getElementById('confirmpassword').value // 修改字段名称
    };

    if (formData.password !== formData.confirmpassword) { // 修改字段名称
        alert('密码和确认密码不匹配！');
        return;
    }

    // 发送POST请求到后端
    fetch('http://localhost:8088/Users/regist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) { // 如果响应状态码不是200-299之间，认为请求失败
            throw new Error('Network response was not ok: ' + response.status);
        }
        return response.json(); // 解析JSON格式的响应体
    })
    .then(data => {
        console.log('Success:', data);
        if(data.status === 200 && data.msg === "OK") { // 根据实际返回数据结构调整
            alert('注册成功！您的id为' + data.data.id); // 根据实际返回数据结构调整
        } else {
            // 服务端返回了异常数据，但状态码是200
            alert('注册失败：' + data.msg); // 根据实际返回数据结构调整
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('注册失败，请稍后重试！'); // 提供具体错误信息
    });
});