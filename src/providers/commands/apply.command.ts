import {
  APIInteractionGuildMember,
  CacheType,
  ChannelType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  Guild,
  GuildMember,
  GuildTextBasedChannel,
  SlashCommandBuilder,
} from 'discord.js'

import { Command } from './types'

import { Color, Image } from '~/config'

export interface ApplyCommandConfig {
  privateBetaRequestsChannelId: string
}

export class ApplyCommand implements Command {
  public data = new SlashCommandBuilder()
    .setName('apply')
    .setDescription('Apply for the private beta')
    .addStringOption(option =>
      option
        .setName('name')
        .setDescription("Your Spotify's account name")
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('email')
        .setDescription("Your Spotify's account email")
        .setRequired(true)
    )

  constructor(
    private readonly guild: Guild,
    private readonly config: ApplyCommandConfig
  ) {}

  get privateBetaRequestsChannel() {
    return this.guild.channels.cache
      .filter(({ type }) => type === ChannelType.GuildText)
      .get(this.config.privateBetaRequestsChannelId) as GuildTextBasedChannel
  }

  private applicationEmbedFactory(
    name: string,
    email: string,
    discordUser: GuildMember | APIInteractionGuildMember
  ) {
    return new EmbedBuilder()
      .setColor(Color.Primary)
      .setTitle('New application')
      .setDescription('A new application for private beta has been sent')
      .setThumbnail(Image.Logo)
      .addFields([
        {
          name: 'Name',
          value: name,
        },
        {
          name: 'Email',
          value: email,
        },
        {
          name: 'Discord User',
          value: discordUser.toString(),
        },
      ])
      .setTimestamp()
      .setFooter({
        text: `Rigtch ${new Date().getFullYear()}`,
        iconURL: Image.Logo,
      })
  }

  public async execute(interaction: ChatInputCommandInteraction<CacheType>) {
    const name = interaction.options.getString('name')
    const email = interaction.options.getString('email')

    await this.privateBetaRequestsChannel.send({
      embeds: [this.applicationEmbedFactory(name, email, interaction.member)],
    })

    await interaction.reply('Your application has been sent!')
  }
}
