import { NextResponse } from 'next/server';
import { ApiResponse, PaginatedResponse } from '@/src/types';

export function successResponse<T>(
  data: T,
  message?: string,
  status: number = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      message,
    },
    { status }
  );
}

export function errorResponse(error: string, status: number = 400): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error,
    },
    { status }
  );
}

export function paginatedResponse<T>(
  data: T[],
  total: number,
  page: number,
  pageSize: number
): NextResponse<PaginatedResponse<T>> {
  return NextResponse.json({
    success: true,
    data,
    pagination: {
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    },
  });
}

export function unauthorizedResponse(message: string = 'Unauthorized'): NextResponse<ApiResponse> {
  return errorResponse(message, 401);
}

export function forbiddenResponse(message: string = 'Forbidden'): NextResponse<ApiResponse> {
  return errorResponse(message, 403);
}

export function notFoundResponse(message: string = 'Not found'): NextResponse<ApiResponse> {
  return errorResponse(message, 404);
}

export function serverErrorResponse(
  message: string = 'Internal server error'
): NextResponse<ApiResponse> {
  return errorResponse(message, 500);
}
