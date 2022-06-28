export interface ApiError {
    description: string,
    errorCode?: number,
    stack?: any
}

export type CommonApiResponse<T extends Record<string, any> = Record<string, any>> = T & {
    statusCode: number,
    message: string,
    requestId?: string,
    timestamp?: string,
}

export interface ApiSuccessResponse<T> {
    data: T
}

export interface ApiErrorResponse {
    error: ApiError
}