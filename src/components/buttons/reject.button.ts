import {
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  CacheType,
  Guild,
} from 'discord.js'

import { Button } from './types'
import { editMessage, getMember } from './utils'

import { ApplyCommandStatus } from '~/commands'

export class RejectButton implements Button {
  id = 'reject'

  get component() {
    return new ButtonBuilder()
      .setCustomId(this.id)
      .setLabel('reject')
      .setStyle(ButtonStyle.Danger)
  }

  execute(interaction: ButtonInteraction<CacheType>, guild: Guild) {
    const member = getMember(guild, interaction)

    editMessage(interaction, ApplyCommandStatus.REJECTED)

    member.send(
      'Unfortunately your application has been rejected. Contact with the support team for more information'
    )
  }
}

export const rejectButton = new RejectButton()
