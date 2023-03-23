import {
  CacheType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from 'discord.js'

import { Command } from './types/index'

export class PingCommand implements Command {
  public data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!')

  public async execute(interaction: ChatInputCommandInteraction<CacheType>) {
    await interaction.reply('Pong!')
  }
}
