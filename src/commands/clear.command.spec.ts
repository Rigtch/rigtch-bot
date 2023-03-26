import { CacheType, ChatInputCommandInteraction } from 'discord.js'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { mock } from 'vitest-mock-extended'

import { ClearCommand } from './clear.command'

describe('ClearCommand', () => {
  let clearCommand: ClearCommand

  beforeEach(() => {
    clearCommand = new ClearCommand()
  })

  describe('data', () => {
    test('should have name and description', () => {
      expect(clearCommand.data.name).toEqual('clear')
      expect(clearCommand.data.description).toEqual(
        'Clear given amount of messages'
      )
    })

    test('should have integer and boolean option', () => {
      const [integerOption, booleanOption] = clearCommand.data.options.map(
        option => option.toJSON()
      )

      expect(clearCommand.data.options).toHaveLength(2)

      expect(integerOption.name).toEqual('amount')
      expect(integerOption.description).toEqual('Amount of messages to clear')
      expect(integerOption.required).toEqual(true)

      expect(booleanOption.name).toEqual('silent')
      expect(booleanOption.description).toEqual('Clearing messages silently')
    })
  })

  describe('execute', () => {
    let interaction: ChatInputCommandInteraction<CacheType>

    const replyContent = 'Cleared 10 messages'

    beforeEach(() => {
      interaction = mock<ChatInputCommandInteraction<CacheType>>()

      interaction.options.getInteger = vi.fn().mockReturnValue(10)
      interaction.channel.bulkDelete = vi.fn().mockResolvedValue({})
      interaction.options.getBoolean = vi.fn().mockReturnValue(false)
    })

    test('should clear given amount of messages', async () => {
      Object.defineProperty(interaction.member, 'permissions', {
        value: {
          has: vi.fn().mockReturnValue(true),
        },
      })

      await clearCommand.execute(interaction)

      expect(interaction.reply).toHaveBeenCalledWith({
        content: replyContent,
        ephemeral: false,
      })
    })

    test('should not clear messages if user does not have permission', async () => {
      Object.defineProperty(interaction.member, 'permissions', {
        value: {
          has: vi.fn().mockReturnValue(false),
        },
      })

      await clearCommand.execute(interaction)

      expect(interaction.reply).not.toHaveBeenCalled()
    })

    test('should clear messages silently', async () => {
      interaction.options.getBoolean = vi.fn().mockReturnValue(true)

      Object.defineProperty(interaction.member, 'permissions', {
        value: {
          has: vi.fn().mockReturnValue(true),
        },
      })

      await clearCommand.execute(interaction)

      expect(interaction.reply).toHaveBeenCalledWith({
        content: replyContent,
        ephemeral: true,
      })
    })
  })
})
