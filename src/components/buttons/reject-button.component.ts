import { ButtonBuilder, ButtonStyle } from 'discord.js'

export const REJECT_BUTTON_ID = 'reject-button'

export const rejectButtonComponent = new ButtonBuilder()
  .setCustomId(REJECT_BUTTON_ID)
  .setLabel('reject')
  .setStyle(ButtonStyle.Danger)
