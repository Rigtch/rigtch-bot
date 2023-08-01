import { ButtonInteraction, CacheType, EmbedBuilder } from 'discord.js'

import { ApplyCommandStatus } from '~/commands'

export const editMessage = <T extends ButtonInteraction<CacheType>>(
  interaction: T,
  status: ApplyCommandStatus
) =>
  interaction.message.edit({
    embeds: [
      EmbedBuilder.from(interaction.message.embeds[0]).setFields([
        ...interaction.message.embeds[0].data.fields.slice(0, 3),
        {
          name: 'Status',
          value: status,
        },
      ]),
    ],
    components: [],
  })
