/* eslint-disable no-unused-vars */
// history
function createBrowserHistory() {
  let globalHistory = window.history;
  let listeners = [];
  let state;

  function go(n) {
    globalHistory.go(n);
  }

  function goBack() {
    globalHistory.back();
  }

  function goForward() {
    globalHistory.forward();
  }

  // 路由变化时，通知 listeners 状态的变化
  // 并执行 里面的 listener
  function notify(newState) {
    Object.assign(history, newState);
    history.length = globalHistory.length;
    // 监听
    listeners.forEach((listener) => listener({ location: history.location }));
  }

  function push(pathname, nextState) {
    const action = "PUSH";

    if (typeof pathname === "object") {
      state = pathname.state;
      pathname = pathname.pathname;
    } else {
      state = nextState;
    }

    globalHistory.pushState(state, null, pathname);
    notify({ location, action });
  }

  // 监听
  function listen(listener) {
    // 添加监听
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((item) => item !== listener);
    };
  }

  // 触发一个事件
  window.onpopstate = () => {
    // 获取到最新的数据
    let location = {
      pathname: window.location.pathname,
      state: globalHistory.state,
    };
    // 通知更新
    notify({ location, action: "POP" });
  };

  let history = {
    action: "POP",
    go,
    goBack,
    goForward,
    push,
    listen,
    location: {
      pathname: window.location.pathname,
      state: window.location.state,
    },
  };

  return history;
}

export default createBrowserHistory;
