import { Command, Handler, InteractionEvent } from '@discord-nestjs/core'
import { SlashCommandPipe } from '@discord-nestjs/common'
import { Injectable } from '@nestjs/common'
import {
  ApplicationCommandType,
  ChatInputCommandInteraction,
  InteractionReplyOptions,
  PermissionsBitField,
} from 'discord.js'

import { Clear } from '../dtos'

import { Permissions } from '@common/decorators'

@Command({
  name: 'clear',
  description: 'Clear given amount of messages',
  type: ApplicationCommandType.ChatInput,
})
@Injectable()
export class ClearCommand {
  @Handler()
  @Permissions([PermissionsBitField.Flags.ManageMessages])
  async handle(
    @InteractionEvent(SlashCommandPipe) { amount, silent }: Clear,
    @InteractionEvent() { channel }: ChatInputCommandInteraction
  ): Promise<InteractionReplyOptions> {
    await channel.bulkDelete(amount)

    return {
      content: `Cleared ${amount} messages`,
      ephemeral: silent,
    }
  }
}
