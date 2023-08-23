import { Injectable, PipeTransform } from '@nestjs/common'
import { Interaction } from 'discord.js'

@Injectable()
export class EmbedMemberTransformPipe implements PipeTransform {
  transform(interaction: Interaction) {
    if (!interaction.isButton()) return

    return interaction.guild.members.cache.get(
      interaction.message.embeds[0].fields
        .find(({ name }) => name === 'Discord User')
        .value.slice(2, -1)
    )
  }
}
