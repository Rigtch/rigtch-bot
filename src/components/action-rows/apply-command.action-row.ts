import { ActionRowBuilder, ButtonBuilder } from 'discord.js'

import { approveButton, rejectButton } from '../buttons'

export const applyCommandActionRow =
  new ActionRowBuilder<ButtonBuilder>().addComponents(
    approveButton.component,
    rejectButton.component
  )
