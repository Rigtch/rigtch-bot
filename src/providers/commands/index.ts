import { Client, Events } from 'discord.js'

import { Command } from './types'
import { PingCommand } from './ping.command'

export class CommandsProvider {
  private readonly commands: Command[] = []

  constructor(private readonly client: Client) {}

  get commandsBodies() {
    return this.commands.map(({ data }) => data)
  }

  public async loadCommands() {
    this.commands.push(new PingCommand())
  }

  public async watchInteractions() {
    await this.client.on(Events.InteractionCreate, async interaction => {
      if (!interaction.isChatInputCommand()) return

      const command = this.commands.find(
        ({ data }) => data.name === interaction.commandName
      )

      if (!command) return

      await command.execute(interaction)
    })
  }
}
