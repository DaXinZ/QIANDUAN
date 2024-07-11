// 假设 'queryButton' 是查询按钮的ID，'userId' 是用户ID输入框的ID
document.getElementById('queryButton').addEventListener('click', function() {
    var userId = document.getElementById('userId').value;
    if (!userId) {
        alert('请输入用户ID');
        return;
    }

    // 发起fetch请求之前，可以添加一个加载提示，例如：
    var userInfoDiv = document.getElementById('userInfo');
    userInfoDiv.innerHTML = '加载中...';

    // 发起fetch请求获取用户信息
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
        // 检查数据并展示用户信息或错误信息
        if (data.status === 200 && data.msg === "OK" && Array.isArray(data.data)) {
            // 隐藏查询表单和按钮
            document.getElementById('queryForm').classList.add('hidden'); // 假设 'queryForm' 是包含输入框和按钮的表单的ID
            displayUserInfo(data.data); // 展示用户信息
        } else {
            // 服务端返回了错误状态或消息
            userInfoDiv.innerHTML = '<p>' + (data.msg || '未知错误') + '</p>';
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        userInfoDiv.innerHTML = '<p>查询失败，请稍后重试！</p>'; // 显示错误信息
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
    // 请注意，这里假设服务器返回的字段名是正确的，如果字段名有误，请修改为正确的字段名
    var userInfoHtml = `
        <div class="user-data"> <!-- 应用新的类，以便在CSS中添加样式 -->
            <strong>ID:</strong> ${user.id}<br>
            <strong>姓名:</strong> ${user.name || '暂无'}<br>
            <strong>昵称:</strong> ${user.nickname || '苍萱'} <!-- 修正字段名 -->
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