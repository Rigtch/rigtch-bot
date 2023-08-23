import { TextInputBuilder, TextInputStyle } from 'discord.js'

export const USERNAME_INPUT_ID = 'username-input'

export const usernameInputComponent = new TextInputBuilder()
  .setCustomId(USERNAME_INPUT_ID)
  .setLabel('Username')
  .setStyle(TextInputStyle.Short)
  .setPlaceholder('Enter your username')
  .setMinLength(3)
  .setMaxLength(32)
