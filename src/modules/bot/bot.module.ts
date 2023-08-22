import { DiscordModule } from '@discord-nestjs/core'
import { Module } from '@nestjs/common'

import { BotGateway } from './bot.gateway'
import { ClearCommand, PingCommand } from './commands'
import { PlayCommand } from './commands/play.command'

@Module({
  imports: [DiscordModule.forFeature()],
  // providers: [BotGateway, PingCommand, ClearCommand, PlayCommand],
  providers: [PlayCommand],
})
export class BotModule {}
