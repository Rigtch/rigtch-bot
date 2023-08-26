import { Command, Handler, InteractionEvent, On } from '@discord-nestjs/core'
import { Injectable } from '@nestjs/common'
import {
  ButtonInteraction,
  ChatInputCommandInteraction,
  EmbedBuilder,
  Events,
  GuildMember,
  InteractionType,
  Message,
  ModalSubmitInteraction,
} from 'discord.js'
import { ModalFieldsTransformPipe } from '@discord-nestjs/common'

import { ApplyForm } from '../dtos'
import { BotService } from '../bot.service'

import { APPLY_MODAL_ID, applyModalComponent } from '@components/modals'
import { aplicationEmbedComponentFactory } from '@components/embeds'
import { applicationActionRowComponent } from '@components/action-rows'
import { APPROVE_BUTTON_ID, REJECT_BUTTON_ID } from '@components/buttons'
import { RequiredInteractionType } from '@common/decorators'
import { EmbedMemberTransformPipe } from '@common/pipes'
import { ApplicationStatus } from '@common/enums'

@Command({
  name: 'apply',
  description: 'Apply for private beta',
})
@Injectable()
export class ApplyCommand {
  constructor(private readonly botService: BotService) {}

  @Handler()
  async handle(@InteractionEvent() interaction: ChatInputCommandInteraction) {
    await interaction.showModal(applyModalComponent)
  }

  @On(Events.InteractionCreate)
  @RequiredInteractionType(InteractionType.ModalSubmit)
  async onModalSubmit(
    @InteractionEvent(ModalFieldsTransformPipe)
    { username, email }: ApplyForm,
    @InteractionEvent() interaction: ModalSubmitInteraction
  ) {
    if (!interaction.isModalSubmit()) return

    if (interaction.customId !== APPLY_MODAL_ID) return

    const applicationEmbedComponent = aplicationEmbedComponentFactory(
      username,
      email,
      interaction.member
    )

    const channel = await this.botService.privateBetaRequestsChannel

    await channel.send({
      embeds: [applicationEmbedComponent],
      components: [applicationActionRowComponent],
    })

    return 'Your application has been sent!'
  }

  @On(Events.InteractionCreate)
  @RequiredInteractionType(InteractionType.MessageComponent)
  async onButtonInteraction(
    @InteractionEvent() interaction: ButtonInteraction,
    @InteractionEvent(EmbedMemberTransformPipe) member: GuildMember
  ) {
    if (!interaction.isButton()) return

    if (interaction.customId === APPROVE_BUTTON_ID) {
      await this.editApplicationModal(
        interaction.message,
        ApplicationStatus.APPROVED
      )
      await member.send(
        'Your application has been approved! Explore your statistics on https://rigtch-music.vercel.app/.'
      )
    } else if (interaction.customId === REJECT_BUTTON_ID) {
      await this.editApplicationModal(
        interaction.message,
        ApplicationStatus.REJECTED
      )
      await member.send(
        'Unfortunately your application has been rejected. Contact with the support team for more information'
      )
    }
  }

  private editApplicationModal(message: Message, status: ApplicationStatus) {
    message.edit({
      embeds: [
        EmbedBuilder.from(message.embeds[0]).setFields([
          ...message.embeds[0].data.fields.slice(0, 3),
          {
            name: 'Status',
            value: status,
          },
        ]),
      ],
      components: [],
    })
  }
}
