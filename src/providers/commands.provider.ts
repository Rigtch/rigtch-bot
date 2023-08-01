import {
  Client,
  Events,
  CacheType,
  ChatInputCommandInteraction,
  ButtonInteraction,
} from 'discord.js'

import { Command, PingCommand, ApplyCommand, ClearCommand } from '~/commands'
import { Button, approveButton, rejectButton } from '~/components/buttons'

export interface CommandsProviderConfig {
  privateBetaRequestsChannelId: string
  guildId: string
}

export class CommandsProvider {
  private readonly commands: Command[] = []
  private readonly buttons: Button[] = []

  constructor(
    private readonly client: Client,
    private readonly config: CommandsProviderConfig
  ) {}

  get commandBodies() {
    return this.commands.map(({ data }) => data)
  }

  private async fetchGuild() {
    return await this.client.guilds.fetch(this.config.guildId)
  }

  private async executeCommand(
    interaction: ChatInputCommandInteraction<CacheType>
  ) {
    const command = this.commands.find(
      ({ data }) => data.name === interaction.commandName
    )

    if (!command) return

    await command.execute(interaction)
  }

  private async executeButtonAction(interaction: ButtonInteraction<CacheType>) {
    const button = this.buttons.find(({ id }) => id === interaction.customId)

    if (!button) return

    button.action(interaction, await this.fetchGuild())
  }

  public async loadCommands() {
    this.commands.push(
      new PingCommand(),
      new ApplyCommand(await this.fetchGuild(), this.config),
      new ClearCommand()
    )
  }

  public async loadButtons() {
    this.buttons.push(approveButton, rejectButton)
  }

  public async watchInteractions() {
    await this.client.on(Events.InteractionCreate, async interaction => {
      if (interaction.isButton()) this.executeButtonAction(interaction)
      if (interaction.isChatInputCommand()) this.executeCommand(interaction)
    })
  }
}
