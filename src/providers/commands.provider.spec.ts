import {
  ButtonInteraction,
  CacheType,
  ChatInputCommandInteraction,
  Client,
  Guild,
} from 'discord.js'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { mock } from 'vitest-mock-extended'

import { CommandsProvider, CommandsProviderConfig } from './commands.provider'

import { Command, CommandData } from '~/commands'
import { Button } from '~/components/buttons'

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
      // @ts-expect-error - private property
      vi.spyOn(commandsProvider['commands'], 'find').mockReturnValue(
        commandMock
      )

      await commandsProvider['executeCommand'](interactionMock)

      expect(commandMock.execute).toHaveBeenCalled()
    })

    test('should not execute because command is not found', async () => {
      await commandsProvider['executeCommand'](interactionMock)

      expect(commandMock.execute).not.toHaveBeenCalled()
    })
  })

  describe('executeButtonAction', () => {
    let interactionMock: ButtonInteraction<CacheType>
    let buttonMock: Button

    beforeEach(() => {
      interactionMock = mock<ButtonInteraction<CacheType>>()
      buttonMock = mock<Button>()
      buttonMock.action = vi.fn()

      commandsProvider['fetchGuild'] = vi.fn().mockResolvedValue(guildMock)
    })

    test('should execute a button action', async () => {
      // @ts-expect-error - private property
      vi.spyOn(commandsProvider['buttons'], 'find').mockReturnValue(buttonMock)

      await commandsProvider['executeButtonAction'](interactionMock)

      expect(buttonMock.action).toHaveBeenCalled()
    })

    test('should not execute because button is not found', async () => {
      await commandsProvider['executeButtonAction'](interactionMock)

      expect(buttonMock.action).not.toHaveBeenCalled()
    })
  })

  describe('loadCommands', async () => {
    test('should load commands', async () => {
      commandsProvider['fetchGuild'] = vi.fn().mockResolvedValue(guildMock)

      vi.spyOn(commandsProvider['commands'], 'push' as any)

      await commandsProvider.loadCommands()

      expect(commandsProvider['commands'].push).toHaveBeenCalled()
    })
  })

  describe('loadButtons', () => {
    test('should load buttons', async () => {
      commandsProvider['fetchGuild'] = vi.fn().mockResolvedValue(guildMock)

      vi.spyOn(commandsProvider['buttons'], 'push' as any)

      await commandsProvider.loadButtons()

      expect(commandsProvider['buttons'].push).toHaveBeenCalled()
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
