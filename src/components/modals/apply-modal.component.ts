import { ModalBuilder } from '@discordjs/builders'

import { applyModalActionRowComponents } from '../action-rows'

export const APPLY_MODAL_ID = 'apply-modal'

export const applyModalComponent = new ModalBuilder()
  .setCustomId(APPLY_MODAL_ID)
  .setTitle('Apply for private beta')
  .addComponents(...applyModalActionRowComponents)
