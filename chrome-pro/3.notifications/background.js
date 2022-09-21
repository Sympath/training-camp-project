function notifyMe(title, opts) {
  alert(`${title}: ${opts.body}`)
  // 先检查浏览器是否支持
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // 检查用户是否同意接受通知
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification(title, opts);
  }

  // 否则我们需要向用户获取权限
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // 如果用户接受权限，我们就可以发起一条消息
      if (permission === "granted") {
        var notification = new Notification(title, opts);
      }
    });
  }
}
function show() {
  var time = /(..)(:..)/.exec(new Date());     // 当前时间.
  var hour = time[1] % 12 || 12;               // 小时
  var period = time[1] < 12 ? 'a.m.' : 'p.m.'; // 上午、下午
  notifyMe(hour + time[2] + ' ' + period, {
    icon: 'img/icon_48.png',
    body: '是时候起来溜达一下了~~'
  });
}

// 判断是否已经初始化
if (!localStorage.isInitialized) {
  localStorage.isActivated = true;   // 是否激活
  localStorage.frequency = 1;        // 显示间隔，分钟
  localStorage.isInitialized = true; // 初始化状态
}
// 浏览器是否支持通知
if (window.Notification) {
  // 加载时就先显示一下
  if (JSON.parse(localStorage.isActivated)) { show(); }

  var interval = 0; // 间隔分钟数

  setInterval(function () {
    interval++;

    if (
      JSON.parse(localStorage.isActivated) &&
      localStorage.frequency <= interval
    ) {
      show();
      interval = 0;
    }
  }, 60000);
}