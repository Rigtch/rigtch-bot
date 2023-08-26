import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ChatInputCommandInteraction, PermissionsBitField } from 'discord.js'

import { Permissions } from '../decorators'
import { PermissionsFlagsBitsType } from '../types'

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const requiredPermissions = this.reflector.get<PermissionsFlagsBitsType[]>(
      Permissions,
      context.getHandler()
    )

    if (!requiredPermissions) return true

    const { member } = context.getArgByIndex<ChatInputCommandInteraction>(0)

    if (!member) return false

    return this.matchPermissions(
      requiredPermissions,
      member.permissions as Readonly<PermissionsBitField>
    )
  }

  private matchPermissions(
    requiredPermissions?: PermissionsFlagsBitsType[],
    memberPermissions?: Readonly<PermissionsBitField>
  ) {
    if (!requiredPermissions) return true
    if (!memberPermissions) return false

    return requiredPermissions.some(permission =>
      memberPermissions.has(permission)
    )
  }
}
