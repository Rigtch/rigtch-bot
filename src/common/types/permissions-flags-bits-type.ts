import { PermissionsBitField } from 'discord.js'

export type PermissionsFlagsBitsType =
  (typeof PermissionsBitField.Flags)[keyof typeof PermissionsBitField.Flags]
