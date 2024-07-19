function fetchUserInfoFromUrl() {
    // 使用URLSearchParams解析当前页面的URL查询参数
    var urlParams = new URLSearchParams(window.location.search);
    var userId = urlParams.get('id'); // 从查询参数中获取用户ID

    if (!userId) {
        alert('用户ID参数缺失');
        return;
    }

    // 使用获取到的用户ID发起fetch请求
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
            displayUserInfo(data.data[0]); // 展示用户信息，使用data数组的第一个元素
        } else {
            // 服务端返回了错误状态或消息
            alert('查询失败：' + data.msg || '未知错误');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('查询失败，请稍后重试！');
    });
}

function displayUserInfo(user) {
    var userInfoDiv = document.getElementById('userInfo');
    if (!userInfoDiv) {
        console.error('Element with id "userInfo" not found.');
        return;
    }
    userInfoDiv.innerHTML = ''; // 清空之前的内容

    // 构建用户信息的HTML
    var userInfoHtml = `
        <div class="user-profile">
            <div class="profile-avatar">
                <img id="userAvatar" src="${user.chatheads || 'default-avatar.jpg'}" alt="用户头像" class="avatar-image">
            </div>
            <ul class="info-list">
                <li><strong>ID:</strong> ${user.id}</li>
                <li><strong>姓名:</strong> ${user.name || '暂无'}</li>
                <li><strong>昵称:</strong> ${user.nickname || '  '}</li>
                <li><strong>年龄:</strong> ${user.age}</li>
                <li><strong>个性签名:</strong> ${user.personalizedsignature || '暂无'}</li>
                <li><strong>性别:</strong> ${user.gender}</li>
                <li><strong>创建时间:</strong> ${new Date(user.creationTime).toLocaleString()}</li>
                <li><strong>更新时间:</strong> ${new Date(user.updateTime).toLocaleString()}</li>
            </ul>
        </div>
    `;

    // 将构建的HTML设置为userInfoDiv的内容
    userInfoDiv.innerHTML = userInfoHtml;
}

// 页面加载完成后自动获取用户信息
document.addEventListener('DOMContentLoaded', fetchUserInfoFromUrl);