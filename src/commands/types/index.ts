import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  CacheType,
} from 'discord.js'

import { WithOptional } from '~/types'

export abstract class Command {
  public data: CommandData
  public execute: (
    interaction: ChatInputCommandInteraction<CacheType>
  ) => Promise<void>
}

export type CommandData = WithOptional<
  SlashCommandBuilder,
  'addSubcommand' | 'addSubcommandGroup'
>
