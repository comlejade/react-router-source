/* eslint-disable no-unused-vars */
/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { useCallback } from "react";
import { cloneElement } from "react";
import { Children } from "react";
import { createContext } from "react";

const NavigationContext = createContext(); // 提供 history
const LocationContext = createContext(); // 提供 当前的路径
const RouterContext = createContext(); // 提供路由

/**
 * 提供数据
 */
export function Router({ children, location, navigator }) {
  return (
    <NavigationContext.Provider value={navigator}>
      <LocationContext.Provider
        children={children}
        value={{ location }}
      ></LocationContext.Provider>
    </NavigationContext.Provider>
  );
}

/**
 * 路由表
 */
export function Routes({ children }) {
  return useRoutes(createRoutesFromChildren(children));
}

// 根据路由表找当前的路径，有就渲染
export function useRoutes(routes) {
  let location = useLocation(); // 获取到当前路径
  let pathname = location.pathname || "/";
  for (let i = 0; i < routes.length; i++) {
    let { path, element } = routes[i];
    // 匹配
    let match = matchPath(path, pathname);
    if (match) {
      // 用 react 在组件中获取路由参数
      // 将路由属性
      return cloneElement(element, { ...element.props, match });
    }
  }
}

export function useLocation() {
  return useContext(LocationContext).location;
}

// 创建路由表[{path, element}]
function createRoutesFromChildren(children) {
  let routes = [];

  Children.forEach(children, (child) => {
    let route = {
      path: child.props.path,
      element: child.props.element,
    };

    routes.push(route);
  });

  return routes;
}

// 将路径变为正则
// function compilePath(path) {
//   let regexpSource = "^" + path;
//   regexpSource += "$";
//   let matcher = new RegExp(regexpSource);
//   return matcher;
// }

function compilePath(path) {
  let paramNames = [];
  let regexpSource =
    "^" +
    path.replace(/:(\w+)/g, (_, paramName) => {
      paramNames.push(paramName);
      return "([^\\/]+)";
    });
  regexpSource += "$";
  let matcher = new RegExp(regexpSource);
  return [matcher, paramNames];
}

function matchPath(path, pathname) {
  // let matcher = compilePath(path);
  let [matcher, paramNames] = compilePath(path);
  let match = pathname.match(matcher);
  if (!match) return null;
  // 匹配上了
  let matchPathName = match[0]; // 浏览器上的路径 /post/20/30
  let values = match.slice(1);
  // 将路由参数映射到一个对象上 {id: 20, age: 30}
  let params = paramNames.reduce((memo, item, index) => {
    memo[item] = values[index];
    return memo;
  }, {});

  return { pathname: matchPathName, params, path };
}

/**
 * 根据传入的属性渲染组件
 */
export function Route(_props) {}

export function useNavigate() {
  let navigator = useContext(NavigationContext);

  let navigate = useCallback(
    (to) => {
      navigator.push(to);
    },
    [navigator]
  );

  return navigate;
}
