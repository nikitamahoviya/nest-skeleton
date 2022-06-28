import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { FastifyReply, FastifyRequest } from "fastify";

// This interceptor adds the headers coming in the api call / request to the list of response headers
@Injectable()
export class HeaderInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap(() => {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse<FastifyReply>();
        const request = ctx.getRequest<FastifyRequest>();
        response.headers(request.headers)

        // To remove a header use removeHeader with the header key as parameter
        // Reference link - https://www.fastify.io/docs/latest/Reference/Reply/#introduction
        // response.removeHeader('messagekey-requestuuid')

      })
    );
  }
}
