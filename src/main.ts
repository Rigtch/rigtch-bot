import { BotProvider } from '~/providers'
import { config } from '~/config'

const botProvider = new BotProvider(config)

botProvider.login()
