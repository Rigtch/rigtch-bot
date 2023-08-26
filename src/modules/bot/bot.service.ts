import { InjectDiscordClient } from '@discord-nestjs/core'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ChannelType, Client, GuildTextBasedChannel } from 'discord.js'

import { Environment } from '@config/environment'

@Injectable()
export class BotService {
  constructor(
    @InjectDiscordClient() private readonly client: Client,
    private readonly configService: ConfigService
  ) {}

  get guild() {
    return this.client.guilds.fetch(
      this.configService.get(Environment.GUILD_ID)
    )
  }

  get privateBetaRequestsChannel() {
    return this.guild.then(
      guild =>
        guild.channels.cache
          .filter(({ type }) => type === ChannelType.GuildText)
          .get(
            this.configService.get(Environment.PRIVATE_BETA_REQUESTS_CHANNEL_ID)
          ) as GuildTextBasedChannel
    )
  }
}
