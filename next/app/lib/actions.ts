'use server';
import { cookies } from 'next/headers';
/*
Серверны экшены для проверки и манипуляции токенами 
*/
export async function handleRefresh() {
    const refreshToken = await getRefreshToken();
    const token = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_HOST}/auth/jwt/refresh/`, {
        method: 'POST',
        body: JSON.stringify({
            refresh: refreshToken
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then((json) => {
            if (json.access) {
                setAccessToken(json.access)
                return json.access;
            } else {
                resetAuthCookies();
            }
        })
        .catch((error) => {
            resetAuthCookies();
        })
    return token;
}
export async function setAccessToken(accessToken: string) {
    const cookieStore=await cookies()
    cookieStore.set('session_access_token', accessToken, {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60,
        path: '/'
    })
}
export async function setRefreshToken(refreshToken: string) {
    const cookieStore=await cookies()
    cookieStore.set('session_refresh_token', refreshToken, {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60 * 24 * 7,
        path: '/'
    })
}
export async function setUserId(userId: string) {
    const cookieStore=await cookies()
    cookieStore.set('session_userid', userId, {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60 * 24 * 7,
        path: '/'
    })
}
export async function resetAuthCookies() {
    const cookieStore=await cookies()
    cookieStore.set('session_userid', '');
    cookieStore.set('session_access_token', '');
    cookieStore.set('session_refresh_token', '');
}
export async function getUserId() {
    const cookieStore=await cookies()
    const userId = cookieStore.get('session_userid')?.value
    return userId ? userId : null
}
export async function getAccessToken() {
    const cookieStore=await cookies()
    let accessToken = cookieStore.get('session_access_token')?.value;
    return accessToken;
}
export async function getRefreshToken() {
    const cookieStore=await cookies()
    let refreshToken = cookieStore.get('session_refresh_token')?.value;
    return refreshToken;
}