import { HttpRequest, HttpHandlerFn, HttpErrorResponse} from "@angular/common/http";
import { catchError, throwError } from "rxjs";

export const responseTransformInterceptor = (req: HttpRequest<any>, next: HttpHandlerFn) => {

    return next(req).pipe(
        catchError((error) => {
            if (error instanceof HttpErrorResponse) {
                if (error.status === 401) {
                    console.log('Unauthorized access - Redirecting to login');
                    return throwError(() => error);
                }

                if (error.status === 403) {
                    console.log('Forbidden access - You do not have permission to access this resource');
                    return throwError(() => error);
                }

                if (error.status === 404) {
                    const newError = new HttpErrorResponse({
                        ...error,
                        error: { message: error.error?.messages || 'Ha ocurrido un error al iniciar sesión' },
                        statusText: 'Bad Request',
                        url: error.url || undefined
                    });
                    return throwError(() => newError);
                }

                if (error.status === 400) {
                    const newError = new HttpErrorResponse({
                        ...error,
                        error: { message: error.error?.messages || error.error || 'Hubo algo mal en sus datos' },
                        statusText: 'Bad Request',
                        url: error.url || undefined
                    });
                    return throwError(() => newError);
                }

                if (error.status === 500) {
                    console.log('Internal Server Error - Please try again later');
                    return throwError(() => error);
                }

                return throwError(() => error as HttpErrorResponse);
            }

            return throwError(() => error);
        })
    )
}