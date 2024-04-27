/* eslint-disable no-unused-vars */
import React from "react"
import { Link, Outlet } from "../react-router-dom"
export function User(props) {
    
    return <div>
        <ul>
            <li>
                <Link to='/user/add'>添加用户</Link>
            </li>
            <li>
                <Link to='/user/list'>用户list</Link>
            </li>
        </ul>
        <div>
            <Outlet></Outlet>
        </div>
    </div>
}