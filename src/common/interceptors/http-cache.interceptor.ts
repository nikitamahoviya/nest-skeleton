import { CacheInterceptor, ExecutionContext, Injectable } from '@nestjs/common';
import { CONSTANTS } from '../config/configuration';

@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
    trackBy(context: ExecutionContext): string | undefined {
        const request = context.switchToHttp().getRequest();
        const { httpAdapter } = this.httpAdapterHost;

        const isGetRequest = httpAdapter.getRequestMethod(request) === CONSTANTS.ROUTES.GET;
        const excludePaths = [
            // Routes to be excluded
            CONSTANTS.ROUTES.HEALTH.CONTROLLER
        ];
        if (!isGetRequest || (isGetRequest && excludePaths.every(q => new RegExp('\\b' + q + '\\b', 'i').test(httpAdapter.getRequestUrl(request))))) {
            return undefined;
        }
        return httpAdapter.getRequestUrl(request);
    }
}