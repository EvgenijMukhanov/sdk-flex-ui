import type { HttpOptions, HttpResponse } from './http/types';

export type Tools = {
  http<T = unknown>(options: HttpOptions): Promise<HttpResponse<T>>;
};
