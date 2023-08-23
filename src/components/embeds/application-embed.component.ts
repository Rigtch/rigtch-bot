import {
  APIInteractionGuildMember,
  EmbedBuilder,
  GuildMember,
} from 'discord.js'

import { ApplicationStatus, Color, Image } from '@common/enums'

export const aplicationEmbedComponentFactory = (
  username: string,
  email: string,
  discordUser: GuildMember | APIInteractionGuildMember
) =>
  new EmbedBuilder()
    .setColor(Color.Primary)
    .setTitle('New application')
    .setDescription('A new application for private beta has been sent')
    .setThumbnail(Image.Logo)
    .addFields([
      {
        name: 'Username',
        value: username,
      },
      {
        name: 'Email',
        value: email,
      },
      {
        name: 'Discord User',
        value: discordUser.toString(),
      },
      {
        name: 'Status',
        value: ApplicationStatus.PENDING,
      },
    ])
    .setTimestamp()
    .setFooter({
      text: `Rigtch ${new Date().getFullYear()}`,
      iconURL: Image.Logo,
    })
