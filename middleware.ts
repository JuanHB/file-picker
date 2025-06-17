import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/home'];

export default function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token && protectedRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}
