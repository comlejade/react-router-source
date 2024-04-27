/* eslint-disable no-unused-vars */
import React from "react"
import { useNavigate } from "../react-router"
export function Home() {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/user/20/30')
    }
    
    return <button onClick={handleClick}>按钮</button>
}