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

export class ApproveButton implements Button {
  id = 'approve'

  get component() {
    return new ButtonBuilder()
      .setCustomId(this.id)
      .setLabel('approve')
      .setStyle(ButtonStyle.Success)
  }

  action(interaction: ButtonInteraction<CacheType>, guild: Guild) {
    const member = getMember(guild, interaction)

    editMessage(interaction, ApplyCommandStatus.APPROVED)

    member.send(
      'Your application has been approved! Explore your statistics on https://rigtch-music.vercel.app/.'
    )
  }
}

export const approveButton = new ApproveButton()
