import { mock } from 'vitest-mock-extended'
import { beforeEach, describe, expect, test } from 'vitest'
import { CacheType, ChatInputCommandInteraction } from 'discord.js'

import { PingCommand } from './ping.command'

describe('PingCommand', () => {
  let pingCommand: PingCommand

  beforeEach(() => {
    pingCommand = new PingCommand()
  })

  describe('data', () => {
    test('should have name and description', () => {
      expect(pingCommand.data.name).toEqual('ping')
      expect(pingCommand.data.description).toEqual('Replies with Pong!')
    })
  })

  describe('execute', () => {
    test('should reply with Pong!', async () => {
      const interaction = mock<ChatInputCommandInteraction<CacheType>>()

      await pingCommand.execute(interaction)

      expect(interaction.reply).toHaveBeenCalledWith('Pong!')
    })
  })
})
