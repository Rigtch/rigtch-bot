import { CanActivate, ExecutionContext } from '@nestjs/common'

export class ManageMessagesPermissionGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    console.log(context)

    return true
  }
}
