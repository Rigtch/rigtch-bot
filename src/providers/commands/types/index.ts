import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  CacheType,
} from 'discord.js'

export abstract class Command {
  public data: SlashCommandBuilder
  public execute: (
    interaction: ChatInputCommandInteraction<CacheType>
  ) => Promise<void>
}
