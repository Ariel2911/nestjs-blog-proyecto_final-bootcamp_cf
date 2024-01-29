import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AdminKey } from '../decorators/isAdmin.decorator';
import { OwnerKey } from '../decorators/isOwner.decorator';

@Injectable()
export class OwnerAdministratorGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requireAdmin = this.reflector.getAllAndOverride<boolean>(AdminKey, [
      context.getHandler(),
      context.getClass(),
    ]);
    const requireOwner = this.reflector.getAllAndOverride<boolean>(OwnerKey, [
      context.getHandler(),
      context.getClass(),
    ]);

    const { user } = context.switchToHttp().getRequest();
    const { params } = context.switchToHttp().getRequest();

    if (requireAdmin === true && user.isAdmin === true) return true;
    if (requireOwner === true && user._id === params.id) return true;

    return false;
  }
}
