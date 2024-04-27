/* eslint-disable no-unused-vars */
import React from "react"
import { useRef } from "react"
import { UserApi } from "../utils"
import { useNavigate } from "../react-router"
export function UserAdd() {
    const inputRef = useRef()
    const navigate = useNavigate()

    const handleAdd = () => {
        let username = inputRef.current.value
        
        UserApi.add({id: Date.now() + '', username})
        navigate('/user/list')
    }

    return <div>
        <input type='text' ref={inputRef} />
        <button onClick={handleAdd}>添加用户</button>
    </div>
}