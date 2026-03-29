import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * 301 на канонический URL со слэшем для любых совпавших маршрутов (включая все страницы приложения).
 * Исключения: `/`, `/_next/*`, `/api/*`, файлы с расширением и часть статики из matcher.
 */
export function middleware(request: NextRequest) {
  try {
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
  } catch (err) {
    console.error('[middleware]', err);
    return NextResponse.next();
  }
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
