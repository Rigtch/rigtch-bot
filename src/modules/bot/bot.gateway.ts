import { InjectDiscordClient, On, Once } from '@discord-nestjs/core'
import { Injectable, Logger } from '@nestjs/common'
import { ActivityType, Client, Events } from 'discord.js'

@Injectable()
export class BotGateway {
  private readonly logger = new Logger(BotGateway.name)

  constructor(@InjectDiscordClient() private readonly client: Client) {}

  @Once(Events.ClientReady)
  onClientReady(): void {
    this.logger.log(`Logged in as ${this.client.user.tag}!`)

    this.client.user.setPresence({
      activities: [
        {
          type: ActivityType.Listening,
          name: 'Rigtch Music',
        },
      ],
    })
  }

  @On(Events.GuildMemberAdd)
  onGuildMemberAdd(member): void {
    member.roles.add(
      member.guild.roles.cache.find(role => role.name === 'User')
    )
  }
}
