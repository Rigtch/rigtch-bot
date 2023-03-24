import {
  CacheType,
  ChatInputCommandInteraction,
  Client,
  Guild,
} from 'discord.js'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { mock } from 'vitest-mock-extended'

import { CommandsProvider, CommandsProviderConfig } from './commands.provider'

import { Command, CommandData } from '~/commands'

describe('CommandsProvider', () => {
  let commandsProvider: CommandsProvider
  let guildMock: Guild

  beforeEach(() => {
    commandsProvider = new CommandsProvider(
      mock<Client>(),
      mock<CommandsProviderConfig>()
    )
    guildMock = mock<Guild>()
  })

  describe('commandBodies', () => {
    test('should return an array of command bodies', () => {
      const dataMock = mock<CommandData>()
      Object.defineProperty(dataMock, 'name', { value: 'test' })
      Object.defineProperty(dataMock, 'description', { value: 'test' })
      Object.defineProperty(commandsProvider, 'commands', {
        value: [mock<Command>({ data: dataMock })],
      })

      expect(commandsProvider.commandBodies).toEqual([dataMock])
    })
  })

  describe('fetchGuild', () => {
    test('should return a guild', async () => {
      commandsProvider['client'].guilds.fetch = vi
        .fn()
        .mockResolvedValue(guildMock)

      expect(await commandsProvider['fetchGuild']()).toEqual(guildMock)
    })
  })

  describe('executeCommand', () => {
    let interactionMock: ChatInputCommandInteraction<CacheType>
    let commandMock: Command

    beforeEach(() => {
      interactionMock = mock<ChatInputCommandInteraction<CacheType>>()
      commandMock = mock<Command>()
      commandMock.execute = vi.fn()
    })

    test('should execute a command', async () => {
      Object.defineProperty(commandsProvider['commands'], 'find', {
        value: vi.fn().mockReturnValue(commandMock),
      })

      interactionMock.isChatInputCommand = vi.fn().mockReturnValue(true) as any

      await commandsProvider['executeCommand'](interactionMock)

      expect(interactionMock.isChatInputCommand).toHaveBeenCalled()
      expect(commandMock.execute).toHaveBeenCalled()
    })

    test('should not execute because interaction is not a command', async () => {
      Object.defineProperty(commandsProvider['commands'], 'find', {
        value: vi.fn().mockReturnValue(commandMock),
      })

      interactionMock.isChatInputCommand = vi.fn().mockReturnValue(false) as any

      await commandsProvider['executeCommand'](interactionMock)

      expect(interactionMock.isChatInputCommand).toHaveBeenCalled()
      expect(commandMock.execute).not.toHaveBeenCalled()
    })

    test('should not execute because command is not found', async () => {
      Object.defineProperty(commandsProvider['commands'], 'find', {
        value: vi.fn(),
      })

      interactionMock.isChatInputCommand = vi.fn().mockReturnValue(true) as any

      await commandsProvider['executeCommand'](interactionMock)

      expect(interactionMock.isChatInputCommand).toHaveBeenCalled()
      expect(commandMock.execute).not.toHaveBeenCalled()
    })
  })

  describe('loadCommands', async () => {
    test('should load commands', async () => {
      commandsProvider['fetchGuild'] = vi.fn().mockResolvedValue(guildMock)

      vi.spyOn(commandsProvider['commands'], 'push' as any)

      await commandsProvider.loadCommands()

      expect(commandsProvider['commands'].push).toHaveBeenCalled()
      expect(commandsProvider['commands']).toHaveLength(2)
    })
  })

  describe('watchInteractions', () => {
    beforeEach(() => {
      Object.defineProperty(commandsProvider['client'], 'on', {
        value: vi.fn(),
      })
    })

    test('should call `client.on`', async () => {
      await commandsProvider.watchInteractions()

      expect(commandsProvider['client'].on).toHaveBeenCalled()
    })
  })
})
