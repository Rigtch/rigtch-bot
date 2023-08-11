import {
  ActivityType,
  Client,
  Events,
  GatewayIntentBits,
  Partials,
  REST,
  Routes,
} from 'discord.js'

import { CommandsProvider } from './commands.provider'

export interface BotProviderConfig {
  token: string
  clientId: string
  guildId: string
  privateBetaRequestsChannelId: string
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

    this.commandsProvider = new CommandsProvider(this.client, this.config)
    this.rest = new REST({ version: '10' }).setToken(config.token)
  }

  public async login(): Promise<void> {
    return new Promise(resolve => {
      this.client.once(Events.ClientReady, () => {
        console.log('Bot is ready')

        resolve()

        this.client.user.setPresence({
          activities: [
            {
              type: ActivityType.Listening,
              name: 'Rigtch Music',
            },
          ],
        })
      })

      this.client.login(this.config.token)
      this.client.on(Events.GuildMemberAdd, member => {
        member.roles.add(
          member.guild.roles.cache.find(role => role.name === 'User')
        )
      })

      this.initialise()
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
          body: this.commandsProvider.commandBodies,
        }
      )
    })
    await this.commandsProvider.loadButtons()
    await this.commandsProvider.watchInteractions()
  }

  public async logout(): Promise<void> {
    this.client.destroy()
  }
}
