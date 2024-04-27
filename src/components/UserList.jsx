/* eslint-disable no-unused-vars */
import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { UserApi } from "../utils"
import { Link } from "../react-router-dom"
export function UserList() {
    const [list, setList] = useState([])

    useEffect(() => {
        const list = UserApi.list()
        setList(list)
    }, [])
    return <div>
        <ul>
            {list.map(item => (<li key={item.id}><Link to={`/user/detail/${item.id}`}>{item.username}</Link></li>))}
        </ul>
    </div>
}