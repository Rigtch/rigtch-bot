import { ButtonBuilder, ButtonStyle } from 'discord.js'

export const APPROVE_BUTTON_ID = 'approve-button'

export const approveButtonComponent = new ButtonBuilder()
  .setCustomId(APPROVE_BUTTON_ID)
  .setLabel('approve')
  .setStyle(ButtonStyle.Success)
