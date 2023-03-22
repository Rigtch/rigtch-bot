import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  CacheType,
} from 'discord.js'

export abstract class Command {
  data: SlashCommandBuilder
  execute: (
    interaction: ChatInputCommandInteraction<CacheType>
  ) => Promise<void>
}
