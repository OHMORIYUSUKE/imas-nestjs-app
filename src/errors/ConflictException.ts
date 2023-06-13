import {
  Catch,
  ExceptionFilter,
  ConflictException,
  ArgumentsHost,
} from '@nestjs/common';

@Catch(ConflictException)
export class ConflictFilter implements ExceptionFilter {
  catch(exception: ConflictException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(409).json({
      statusCode: 409,
      message: 'Conflict',
    });
  }
}
