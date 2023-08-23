import { TextInputBuilder, TextInputStyle } from 'discord.js'

export const EMAIL_INPUT_ID = 'email-input'

export const emailInputComponent = new TextInputBuilder()
  .setCustomId(EMAIL_INPUT_ID)
  .setLabel('Email')
  .setStyle(TextInputStyle.Short)
  .setPlaceholder('Enter your email')
  .setMinLength(3)
  .setMaxLength(32)
