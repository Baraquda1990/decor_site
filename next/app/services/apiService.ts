import { getAccessToken,getRefreshToken } from "../lib/actions"
const DJANGO_HOST=process.env.NEXT_PUBLIC_DJANGO_HOST
/*
Набор функций для запроса к серверу Django. Если запрос с Аксесс токеном, тогда запрос к роуту /api/proxy/
для проверки и перерегистрации аксесс токена, иначе прямой запрос к серверу Django.
*/
const getHost = () => {
    if (typeof window === 'undefined') {
        return process.env.NEXT_PUBLIC_NEXT_HOST
    }
    return ''
}
export async function getSSRHeaders(): Promise<Record<string, string>>{
  if (typeof window !== 'undefined') return {}
    const accessToken = await getAccessToken()
    const refreshToken = await getRefreshToken()
    const cookieHeader = [
    accessToken ? `session_access_token=${accessToken}` : null,
    refreshToken ? `session_refresh_token=${refreshToken}` : null,
  ]
    .filter(Boolean)
    .join('; ');
  return {
    cookie: cookieHeader,
    'Content-Type': 'application/json',
  };
}
const NEXT_HOST=getHost()
const apiService = {
    get: async (url: string) => {
        const headers = await getSSRHeaders();
        const res = await fetch(`${NEXT_HOST}/api/proxy?url=${url}`,{
            method:'GET',
            headers,
            ...(typeof window !== 'undefined' ? { credentials: 'include' } : {}),
        });
        return res.json();
    },

    post: async (url: string, data: any) => {
        const headers = await getSSRHeaders();
        const res = await fetch(`${NEXT_HOST}/api/proxy?url=${url}`, {
            method: 'POST',
            body: data,
            headers,
            ...(typeof window !== 'undefined' ? { credentials: 'include' } : {}),
        });
        return res.json();
    },

    patch: async (url: string, data: any) => {
        const headers = await getSSRHeaders();
        const res = await fetch(`${NEXT_HOST}/api/proxy?url=${url}`, {
            method: 'PATCH',
            body: data,
            headers,
            ...(typeof window !== 'undefined' ? { credentials: 'include' } : {}),
        });
        return res.json();
    },

    delete: async (url: string) => {
        const headers = await getSSRHeaders();
        await fetch(`${NEXT_HOST}/api/proxy?url=${url}`, {
            method: 'DELETE',
            headers,
            ...(typeof window !== 'undefined' ? { credentials: 'include' } : {}),
        });
    },
    postWithoutToken: async (url: string, data: any): Promise<any> => {
        const response = await fetch(`${DJANGO_HOST}${url}`, {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        const json = await response.json();
        return {
            status: response.status,
            ok: response.ok,
            json
        }
    },
    getWithoutToken: async (url: string): Promise<any> => {
        const response = await fetch(`${DJANGO_HOST}${url}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        return response.json();
    },
    getSearch: async (url: string, signal?: AbortSignal): Promise<any> => {
        const response = await fetch(`${DJANGO_HOST}${url}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            signal,
        })
        return response.json()
    },
    getSearchForPaginator: async (url: string): Promise<any> => {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        return response.json();
    }
}

export default apiService