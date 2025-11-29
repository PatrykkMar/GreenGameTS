export interface BaseResponse<T = any> {
    ok: boolean;
    error?: string;
    data?: T;
}