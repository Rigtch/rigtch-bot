import { Client, Events, Interaction, CacheType } from 'discord.js'

import { Command, PingCommand, ApplyCommand } from '~/commands'

export interface CommandsProviderConfig {
  privateBetaRequestsChannelId: string
  guildId: string
}

export class CommandsProvider {
  private readonly commands: Command[] = []

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

  private async executeCommand(interaction: Interaction<CacheType>) {
    if (!interaction.isChatInputCommand()) return

    const command = this.commands.find(
      ({ data }) => data.name === interaction.commandName
    )

    if (!command) return

    await command.execute(interaction)
  }

  public async loadCommands() {
    this.commands.push(
      new PingCommand(),
      new ApplyCommand(await this.fetchGuild(), this.config)
    )
  }

  public async watchInteractions() {
    await this.client.on(Events.InteractionCreate, this.executeCommand)
  }
}
