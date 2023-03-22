import { Client, GatewayIntentBits, Partials, REST, Routes } from 'discord.js'

import { CommandsProvider } from './commands'

export interface BotProviderConfig {
  token: string
  clientId: string
  guildId: string
}

export class BotProvider {
  private readonly client: Client
  private readonly rest: REST

  private readonly commandsProvider: CommandsProvider

  constructor(private readonly config: BotProviderConfig) {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
      ],
      partials: [Partials.Channel],
    })

    this.commandsProvider = new CommandsProvider(this.client)
    this.rest = new REST({ version: '10' }).setToken(config.token)
  }

  public async login(): Promise<void> {
    return new Promise(resolve => {
      this.client.once('ready', () => {
        console.log('Bot is ready')

        resolve()
      })

      this.initialise()

      this.client.login(this.config.token)
    })
  }

  public async initialise() {
    await this.commandsProvider.loadCommands().then(() => {
      this.rest.put(
        Routes.applicationGuildCommands(
          this.config.clientId,
          this.config.guildId
        ),
        {
          body: this.commandsProvider.commandsBodies,
        }
      )
    })
    await this.commandsProvider.watchInteractions()
  }

  public async logout(): Promise<void> {
    this.client.destroy()
  }
}
