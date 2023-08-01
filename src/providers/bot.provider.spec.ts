import { beforeEach, describe, expect, test, vi } from 'vitest'
import { mock } from 'vitest-mock-extended'

import { BotProvider, BotProviderConfig } from './bot.provider'
import { CommandsProvider } from './commands.provider'

describe('BotProvider', () => {
  let botProvider: BotProvider
  let configMock: BotProviderConfig

  beforeEach(() => {
    configMock = mock<BotProviderConfig>()
    configMock.token = 'test'
    configMock.clientId = 'test-client-id'
    configMock.guildId = 'test-guild-id'

    const commandsProviderMock = mock<CommandsProvider>()
    Object.defineProperty(commandsProviderMock, 'loadCommands', {
      value: vi.fn().mockResolvedValue({}),
    })

    botProvider = new BotProvider(configMock)
    Object.defineProperty(botProvider, 'commandsProvider', {
      value: commandsProviderMock,
    })
    Object.defineProperty(botProvider, 'rest', {
      value: {
        put: vi.fn(),
      },
    })
  })

  describe('login', () => {
    test.skip('should login', async () => {
      botProvider.initialise = vi.fn()

      vi.spyOn(botProvider['client'], 'login')
      vi.spyOn(botProvider['client'], 'once')

      await botProvider.login()

      expect(botProvider['client'].login).toHaveBeenCalled()
      expect(botProvider['client'].once).toHaveBeenCalled()
    })
  })

  describe('initialise', () => {
    test('should initialise', async () => {
      await botProvider.initialise()

      expect(botProvider['commandsProvider'].loadCommands).toHaveBeenCalled()
      expect(botProvider['commandsProvider'].loadButtons).toHaveBeenCalled()
      expect(botProvider['rest'].put).toHaveBeenCalled()
    })
  })

  describe('logout', () => {
    test('should logout', () => {
      Object.defineProperty(botProvider, 'client', {
        value: {
          destroy: vi.fn(),
        },
      })

      botProvider.logout()

      expect(botProvider['client'].destroy).toHaveBeenCalled()
    })
  })
})
