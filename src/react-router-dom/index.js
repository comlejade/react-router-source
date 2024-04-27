/* eslint-disable no-unused-vars */
/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */
import React from "react";
import { Router, useNavigate, useLocation } from "../react-router";
import { createBrowserHistory } from "../history";
import { useLayoutEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

export * from "../react-router";

/**
 * 一个Router用在浏览器上，保存地址
 * @param {*} _ref
 */
export function BrowserRouter({ children }) {
  let histroyRef = useRef();

  // 获取到 histy => {} 最新的路由数据
  if (histroyRef.current == null) {
    histroyRef.current = createBrowserHistory();
  }

  let history = histroyRef.current;
  console.log(history);

  // 获取最保险的路由地址
  let [state, setState] = useState({
    action: history.action, // 方法
    location: history.location, // 当前路径
  });

  // 监听
  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      children={children}
      location={state.location}
      navigator={history}
      navigationType={state.action}
    ></Router>
  );
}

/**
 * 一个Router用在浏览器上，保存在hash
 * @param {*} _ref2
 */
export function HashRouter(_ref2) {}

export function Link({ to, ...rest }) {
  let navigate = useNavigate(); // 获取历史栈

  function handleClick(event) {
    event.preventDefault();
    navigate(to);
  }

  return <a onClick={handleClick} href={to} {...rest}></a>;
}

export function NavLink({
  ClassName: classNameProp = "",
  style: styleProp = {},
  end = false,
  to,
  children,
  ...rest
}) {
  // 获取到浏览器当前的路径和路由的路径
  let location = useLocation();
  let pathname = location.pathname;

  // 判断当前路由和浏览器的路由是否一致
  let isActive = pathname === to;

  // 处理样式
  let className;
  if (typeof classNameProp === "function") {
    className = classNameProp(isActive);
  } else {
    className = classNameProp;
  }

  let style =
    typeof styleProp === "function" ? styleProp({ isActive }) : styleProp;

  return (
    <Link {...rest} className={className} style={style} to={to}>
      {children}
    </Link>
  );
}

export function Navigate({ to }) {
  let navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  });

  return null;
}

export function Outlet() {}
