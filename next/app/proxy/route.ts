import { NextRequest, NextResponse } from 'next/server';
import {getAccessToken,handleRefresh} from '@/app/lib/actions';
/*
Роут - обертка для запросов get,post,patch,delete с передачей аксесс токена. 
Нужна для запроса на перевыпуск аксесс токена и изменения куки в которой хранится 
аксесс токен и рефреш токен.  
*/
const API = process.env.NEXT_PUBLIC_DJANGO_HOST

export async function GET(req: NextRequest) {
    return handler(req, 'GET');
}
export async function POST(req: NextRequest) {
    return handler(req, 'POST');
}
export async function PATCH(req: NextRequest) {
    return handler(req, 'PATCH');
}

export async function DELETE(req: NextRequest) {
    return handler(req, 'DELETE');
}
async function handler(req: NextRequest, method: string) {
    const url = req.nextUrl.searchParams.get('url');
    let token = await getAccessToken();
    let body=method !== 'GET' ? await req.text() : undefined
    let response = await fetch(`${API}/api${url}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body,
    });
    if (response.status === 401) {
        const newToken = await handleRefresh();
        if (!newToken) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        response = await fetch(`${API}/api${url}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${newToken}`,
            },
            body,
        });
    }
    let data: any = null;
    const text = await response.text();
    if (text) {
        try {
        data = JSON.parse(text);
        } catch (err) {
        data = text;
        }
    }
  if (response.status === 204) {
    return new NextResponse(null, { status: 204 });
  }
  return NextResponse.json(data, { status: response.status });
}