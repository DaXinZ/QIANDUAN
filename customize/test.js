document.addEventListener('DOMContentLoaded', function() {
    var signUpButton = document.getElementById('signUp');
    var signInButton = document.getElementById('signIn');
    var container = document.querySelector('.container');

    // 点击注册按钮
    signUpButton.addEventListener('click', function() {
        container.classList.add('panel-active');
    });

    // 点击登录按钮
    signInButton.addEventListener('click', function() {
        container.classList.remove('panel-active');
    });
});