import { Guild, CacheType, ButtonInteraction } from 'discord.js'

export const getMember = <T extends ButtonInteraction<CacheType>>(
  guild: Guild,
  interaction: T
) =>
  guild.members.cache.get(
    interaction.message.embeds[0].fields
      .find(({ name }) => name === 'Discord User')
      .value.slice(2, -1)
  )
