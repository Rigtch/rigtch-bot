import { SlashCommandPipe } from '@discord-nestjs/common'
import {
  Command,
  EventParams,
  Handler,
  InteractionEvent,
} from '@discord-nestjs/core'
import { ClientEvents } from 'discord.js'

import { PlayDto } from '../dtos/play.dto'

@Command({
  name: 'play',
  description: 'Plays a song',
})
export class PlayCommand {
  @Handler()
  onPlayCommand(
    @InteractionEvent(SlashCommandPipe) dto: PlayDto,
    @EventParams() arguments_: ClientEvents['interactionCreate']
  ): string {
    console.log('DTO', dto)
    console.log('Event args', arguments_)

    return `Start playing ${dto.song}.`
  }
}
