import { ActionRowBuilder, ButtonBuilder } from 'discord.js'

import { approveButtonComponent, rejectButtonComponent } from '../buttons'

export const applicationActionRowComponent =
  new ActionRowBuilder<ButtonBuilder>().addComponents(
    approveButtonComponent,
    rejectButtonComponent
  )
