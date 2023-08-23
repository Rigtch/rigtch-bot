import { TestingModule, Test } from '@nestjs/testing'
import { test, describe, expect, beforeEach, vi } from 'vitest'
import { ChatInputCommandInteraction } from 'discord.js'
import { ReflectMetadataProvider } from '@discord-nestjs/core'

import { ClearCommand } from './clear.command'

describe('ClearCommand', () => {
  const bulkDeleteSpy = vi.fn()

  let clearCommand: ClearCommand
  let interaction: ChatInputCommandInteraction

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClearCommand, ReflectMetadataProvider],
    }).compile()

    clearCommand = module.get<ClearCommand>(ClearCommand)
    interaction = {
      channel: {
        bulkDelete: bulkDeleteSpy,
      },
    } as unknown as ChatInputCommandInteraction
  })

  test('should be defined', () => {
    expect(clearCommand).toBeDefined()
  })

  describe('handle', () => {
    test('should clear messages', async () => {
      expect(
        await clearCommand.handle({ amount: 10, silent: false }, interaction)
      ).toEqual({
        content: 'Cleared 10 messages',
        ephemeral: false,
      })

      expect(bulkDeleteSpy).toHaveBeenCalledWith(10)
    })

    test('should clear messages in silent mode', async () => {
      expect(
        await clearCommand.handle({ amount: 10, silent: true }, interaction)
      ).toEqual({
        content: 'Cleared 10 messages',
        ephemeral: true,
      })

      expect(bulkDeleteSpy).toHaveBeenCalledWith(10)
    })
  })
})
