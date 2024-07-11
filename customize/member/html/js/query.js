document.getElementById('queryinfo').addEventListener('click', function() {
    var userId = document.getElementById('id').value;
    if (!userId) {
        alert('请输入用户ID');
        return;
    }

    fetch('http://localhost:8088/User/queryUserInfo.json?id=' + encodeURIComponent(userId), {
        method: 'GET',
    })
    .then(response => {
        if (!response.ok) { // 检查响应状态是否成功
            throw new Error('Network response was not ok: ' + response.status);
        }
        return response.json(); // 解析JSON
    })
    .then(data => {
        if (data.status === 200 && data.msg === "OK" && Array.isArray(data.data)) {
            displayUserInfo(data.data); // 展示用户信息
        } else {
            // 服务端返回了错误状态或消息
            throw new Error(data.status !== 200 );
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('查询失败，请稍后重试！');
    });
});

function displayUserInfo(userList) {
    var userInfoDiv = document.getElementById('userInfo');
    userInfoDiv.innerHTML = ''; // 清空之前的内容

    if (userList.length === 0) {
        userInfoDiv.innerHTML = '<p>未找到用户信息。</p>';
        return;
    }



    // 服务端返回的是一个数组，但根据描述，这里我们只取第一个用户的信息
    var user = userList[0];
    var userInfoHtml = `
        <div>
            <strong>ID:</strong> ${user.id}<br>
            <strong>姓名:</strong> ${user.name || '暂无'}<br>
            <strong>昵称:</strong> ${user.nicknema}<br>
            <strong>年龄:</strong> ${user.age}岁<br>
            <strong>个性签名:</strong> ${user.personalizedsignature || '暂无'}<br>
            <strong>性别:</strong> ${user.gender}<br>
            <strong>头像:</strong> ${user.chatheads ? `<img src="${user.chatheads}" alt="用户头像" style="width:100px;height:auto;">` : '暂无头像'}<br>
            <strong>创建时间:</strong> ${new Date(user.creationTime).toLocaleString()}<br>
            <strong>更新时间:</strong> ${new Date(user.updateTime).toLocaleString()}
        </div>
    `;
    userInfoDiv.innerHTML = userInfoHtml;
}