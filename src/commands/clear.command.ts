import {
  CacheType,
  ChatInputCommandInteraction,
  PermissionsBitField,
  SlashCommandBuilder,
} from 'discord.js'

import { Command } from './types'

export class ClearCommand implements Command {
  public data = new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Clear given amount of messages')
    .addIntegerOption(option =>
      option
        .setName('amount')
        .setDescription('Amount of messages to clear')
        .setRequired(true)
    )
    .addBooleanOption(option =>
      option.setName('silent').setDescription('Clearing messages silently')
    )

  public async execute(interaction: ChatInputCommandInteraction<CacheType>) {
    const amount = interaction.options.getInteger('amount')
    const isSilent = interaction.options.getBoolean('silent')

    if (
      !(interaction.member.permissions as Readonly<PermissionsBitField>).has(
        PermissionsBitField.Flags.ManageMessages
      )
    )
      return

    await interaction.channel.bulkDelete(amount).then(() =>
      interaction.reply({
        content: `Cleared ${amount} messages`,
        ephemeral: isSilent,
      })
    )
  }
}
