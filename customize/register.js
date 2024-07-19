document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // 阻止表单默认提交行为

    var formData = {
        name: document.getElementById('name').value,
        nicknema: document.getElementById('nickName').value,
        password: document.getElementById('password').value,
        confirmpassword: document.getElementById('confirmPassword').value
    };



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
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json(); // 解析JSON格式的响应体
    })
    .then(data => {
        console.log('Success:', data);
        if(data.status === 200 && data.msg === "OK"){ // 假设服务端返回的数据包含一个success字段，表示操作是否成功
            alert('注册成功！您的id为' + data.data.id);
        } else {
            // 服务端返回了异常数据，但状态码是200
            alert('注册失败：' + data.msg); // 假设服务端返回的数据包含错误信息message字段
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('注册失败，请稍后重试！');
    });
});