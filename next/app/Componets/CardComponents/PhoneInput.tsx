'use client'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useState, useEffect } from 'react'
import apiService from "@/app/services/apiService"
/*
Поле ввода номера телефона.
*/
type props = {
    userId: string | null
    initialPhone?: string
}
export default function Phone({ userId, initialPhone }: props) {
    if (!userId) return null
    const [phone, setPhone] = useState(initialPhone || '')
    useEffect(() => {
        if (!phone||phone.length<11) return
        apiService.patch('/cart/update/', JSON.stringify({
            phone: '+' + phone
        }))
    }, [phone])
    return (
        <PhoneInput
            country={'kz'}
            value={phone}
            onChange={(p) => setPhone(p)}
        />
    )
}

