import { Command, Handler, InteractionEvent } from '@discord-nestjs/core'
import { SlashCommandPipe } from '@discord-nestjs/common'
import { Injectable, UsePipes } from '@nestjs/common'
import { ApplicationCommandType } from 'discord.js'

import { Clear } from '../dtos/clear.dto'

@Command({
  name: 'clear',
  description: 'Clear given amount of messages',
  type: ApplicationCommandType.ChatInput,
})
@Injectable()
@UsePipes(SlashCommandPipe)
export class ClearCommand {
  @Handler()
  handle(@InteractionEvent(SlashCommandPipe) e: Clear) {
    console.log(e.amount)

    console.log(e)

    return 'Clear!'
  }
}
