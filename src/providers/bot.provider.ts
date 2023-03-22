import { Client, GatewayIntentBits, Partials } from 'discord.js'

export class BotProvider {
  private readonly client: Client

  constructor(private readonly token: string) {
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
  }

  public async login(): Promise<void> {
    return new Promise(resolve => {
      this.client.once('ready', () => {
        console.log('Bot is ready')

        resolve()
      })
      this.client.login(this.token)
    })
  }

  public async logout(): Promise<void> {
    this.client.destroy()
  }
}
