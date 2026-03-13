import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Redirect all pages to canonical URL with trailing slash (301).
 * Static files, _next, and API routes are not redirected.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Root: no change
  if (pathname === '/') {
    return NextResponse.next();
  }

  // Already has trailing slash
  if (pathname.endsWith('/')) {
    return NextResponse.next();
  }

  // Don't add trailing slash to internal Next.js paths or API
  if (pathname.startsWith('/_next') || pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // Don't add trailing slash to paths that look like static files (extension)
  if (/\.[a-z0-9]+$/i.test(pathname)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = pathname + '/';
  return NextResponse.redirect(url, 301);
}

export const config = {
  matcher: [
    /*
     * Match all pathnames except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, sitemap.xml, etc.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:ico|png|svg|jpg|jpeg|webp|avif|woff2|woff|ttf|xml|txt)$).*)',
  ],
};
