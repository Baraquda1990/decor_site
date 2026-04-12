import { getAccessToken,handleRefresh } from "../lib/actions";

const apiServiceOld = {
    get: async function (url: string): Promise<any> {
        const token = await getAccessToken();
        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then((json) => {
                    resolve(json);
                })
                .catch((error => {
                    reject(error);
                }))
        })
    },
    getWithoutToken: async function (url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then(response => response.json())
                .then((json) => {
                    resolve(json);
                })
                .catch((error => {
                    reject(error);
                }))
        })
    },
    getSearch: async function (url: string,signal?: AbortSignal): Promise<any> {
        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                signal,
            })
                .then(response => response.json())
                .then((json) => {
                    resolve(json);
                })
                .catch((error => {
                    reject(error);
                }))
        })
    },
    getSearchForPaginator: async function (url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then((json) => {
                    resolve(json);
                })
                .catch((error => {
                    reject(error);
                }))
        })
    },
    post: async function(url: string, data: any): Promise<any> {
        const token = await getAccessToken();
        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then((json) => {
                    resolve(json);
                })
                .catch((error => {
                    reject(error);
                }))
        })
    },
    patch: async function(url: string, data: any): Promise<any> {
        const token = await getAccessToken();
        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'PATCH',
                body: data,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then((json) => {
                    resolve(json);
                })
                .catch((error => {
                    reject(error);
                }))
        })
    },
    delete: async function(url: string): Promise<any> {
        const token = await getAccessToken();

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    },

    postWithoutToken: async function(url: string, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then(async response => {
                let json = await response.json();
                return {
                    status: response.status,
                    ok: response.ok,
                    json
                }
            })
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(error);
            })
        })
    }
}
export default apiServiceOld;