import { NextRequest, NextResponse } from 'next/server'

// Environment-based allowed origins
const getAllowedOrigins = () => {
  const isDev = process.env.NODE_ENV === 'development'

  if (isDev) {
    return [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3001',
    ]
  }

  return [
    'https://cybar.finance/',
    'https://staging.cybar.finance/'
  ]
}

const isValidOrigin = (origin: string | null): boolean => {
  if (!origin) return false
  const allowedOrigins = getAllowedOrigins()
  return allowedOrigins.includes(origin)
}

export function middleware(request: NextRequest) {
  // Handle CORS for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const origin = request.headers.get('origin')
    const isAllowed = isValidOrigin(origin)

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      if (!isAllowed) {
        return new NextResponse(null, { status: 403 })
      }

      return new NextResponse(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': origin || '',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Max-Age': '86400',
          'Vary': 'Origin',
        },
      })
    }

    // Handle actual requests
    const response = NextResponse.next()

    // Set security headers
    if (isAllowed && origin) {
      response.headers.set('Access-Control-Allow-Origin', origin)
      response.headers.set('Access-Control-Allow-Credentials', 'true')
      response.headers.set('Vary', 'Origin')
    }

    // Additional security headers
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-XSS-Protection', '1; mode=block')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*',
}
