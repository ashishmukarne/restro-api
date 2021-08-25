import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import config from '../config';

const jwt = require('jsonwebtoken');

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}

function validateRequest(
  request: Request,
): boolean | Promise<boolean> | Observable<boolean> {
  const token = request.headers['authorization'];

  try {
    jwt.verify(token, config.jwtSecrete);
    return true;
  } catch (err) {}
  return false;
}
