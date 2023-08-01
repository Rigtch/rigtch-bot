import { ButtonBuilder, ButtonInteraction, CacheType, Guild } from 'discord.js'
import { Awaitable } from 'vitest'

export abstract class Button {
  id: string
  abstract get component(): ButtonBuilder
  execute?: (
    interaction: ButtonInteraction<CacheType>,
    guild?: Guild
  ) => Awaitable<void>
}