import {
  CacheType,
  ChatInputCommandInteraction,
  Guild,
  GuildTextBasedChannel,
} from 'discord.js'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { mock } from 'vitest-mock-extended'

import { ApplyCommand, ApplyCommandConfig } from './apply.command'

describe('ApplyCommand', () => {
  let applyCommand: ApplyCommand

  beforeEach(() => {
    applyCommand = new ApplyCommand(mock<Guild>(), mock<ApplyCommandConfig>())
  })

  describe('data', () => {
    test('should have name and description', () => {
      expect(applyCommand.data.name).toEqual('apply')
      expect(applyCommand.data.description).toEqual(
        'Apply for the private beta'
      )
    })

    test('should have 2 string options', () => {
      const [firstOption, secondOption] = applyCommand.data.options.map(
        option => option.toJSON()
      )

      expect(applyCommand.data.options).toHaveLength(2)

      expect(firstOption.name).toEqual('name')
      expect(firstOption.description).toEqual("Your Spotify's account name")
      expect(firstOption.required).toEqual(true)

      expect(secondOption.name).toEqual('email')
      expect(secondOption.description).toEqual("Your Spotify's account email")
      expect(secondOption.required).toEqual(true)
    })
  })

  describe('execute', () => {
    let interactionMock: ChatInputCommandInteraction<CacheType>

    beforeEach(() => {
      interactionMock = mock<ChatInputCommandInteraction<CacheType>>()

      interactionMock.options.getString = vi
        .fn()
        .mockImplementation(name =>
          name === 'name' ? 'test-name' : 'test-email'
        )

      vi.spyOn(
        applyCommand,
        'privateBetaRequestsChannel',
        'get'
      ).mockReturnValue(mock<GuildTextBasedChannel>())
    })

    test('should reply with success message', async () => {
      await applyCommand.execute(interactionMock)

      expect(interactionMock.reply).toHaveBeenCalledWith(
        'Your application has been sent!'
      )
    })

    test('should call `applicationEmbedFactory` with correct arguments', async () => {
      applyCommand['applicationEmbedFactory'] = vi.fn()

      await applyCommand.execute(interactionMock)

      expect(applyCommand['applicationEmbedFactory']).toHaveBeenCalledWith(
        'test-name',
        'test-email',
        interactionMock.member
      )
    })
  })
})
