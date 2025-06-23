import React, { useEffect } from 'react'
import { useUser } from '../hooks/useUser'
import { useNavigate } from 'react-router-dom'

const LogoutPage = () => {
    const { setUser } = useUser()
    const navigate = useNavigate()
    useEffect(() => {
        setUser(undefined)
        localStorage.removeItem('token')
        navigate('/')
    })
    return (
        <div>Loading...</div>
    )
}

export default LogoutPage