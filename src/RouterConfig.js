/* eslint-disable no-unused-vars */
import React from "react";
import { Home } from "./components/Home";
import { User } from "./components/User";
// import { About } from './components/About'
import { UserAdd } from "./components/UserAdd";
import { UserList } from "./components/UserList";
// import { UserDetail } from './components/UserDetail'

const config = [
  { path: "/", element: <Home /> },
  {
    path: "/user/*",
    element: <User />,
    children: [
      { path: "add", element: <UserAdd /> },
      { path: "list", element: <UserList /> },
    ],
  },
];

export default config;
