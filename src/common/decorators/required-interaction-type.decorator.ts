import { Reflector } from '@nestjs/core'
import { InteractionType } from 'discord.js'

export const RequiredInteractionType =
  Reflector.createDecorator<InteractionType>()
