import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Interaction, InteractionType } from 'discord.js'

import { RequiredInteractionType } from '../decorators'

@Injectable()
export class InteractionTypeGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const requiredInteractionType = this.reflector.get<InteractionType>(
      RequiredInteractionType,
      context.getHandler()
    )

    if (!requiredInteractionType) return true

    const { type } = context.getArgByIndex<Interaction>(0)

    if (!type) return false

    return requiredInteractionType === type
  }
}
