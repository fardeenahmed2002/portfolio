import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

// Next.js 16 renamed the `middleware` convention to `proxy`.
// See: https://nextjs.org/docs/app/api-reference/file-conventions/proxy
export default auth((req) => {
  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');
  const isLoginPage = req.nextUrl.pathname === '/admin/login';

  // Protect every /admin/* route except the login page.
  if (isAdminRoute && !isLoginPage && !req.auth) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  // Keep authenticated users away from the login page.
  if (isLoginPage && req.auth) {
    return NextResponse.redirect(new URL('/admin/dashboard', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/admin/:path*'],
};
