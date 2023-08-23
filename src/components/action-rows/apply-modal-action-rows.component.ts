import { ActionRowBuilder, ModalActionRowComponentBuilder } from 'discord.js'

import { emailInputComponent, usernameInputComponent } from '../inputs'

export const applyModalActionRowComponents = [
  usernameInputComponent,
  emailInputComponent,
].map(component =>
  new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
    component
  )
)
