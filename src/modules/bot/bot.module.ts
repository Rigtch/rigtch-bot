import { DiscordModule } from '@discord-nestjs/core'
import { Module } from '@nestjs/common'

import { ApplyCommand, ClearCommand, PingCommand } from './commands'
import { BotGateway } from './bot.gateway'
import { BotService } from './bot.service'

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [BotService, BotGateway, PingCommand, ClearCommand, ApplyCommand],
})
export class BotModule {}
