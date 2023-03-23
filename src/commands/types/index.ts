import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  CacheType,
} from 'discord.js'

import { WithOptional } from '~/types'

export abstract class Command {
  public data: WithOptional<
    SlashCommandBuilder,
    'addSubcommand' | 'addSubcommandGroup'
  >
  public execute: (
    interaction: ChatInputCommandInteraction<CacheType>
  ) => Promise<void>
}
