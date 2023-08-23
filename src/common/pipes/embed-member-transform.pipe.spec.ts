import { GuildMember, Interaction } from 'discord.js'
import { mock } from 'vitest-mock-extended'
import { vi } from 'vitest'

import { EmbedMemberTransformPipe } from './embed-member-transform.pipe'
describe('EmbedMemberTransformPipe', () => {
  let embedMemberTransformPipe: EmbedMemberTransformPipe
  let interaction: Interaction

  beforeEach(() => {
    embedMemberTransformPipe = new EmbedMemberTransformPipe()
    interaction = mock<Interaction>({
      isButton: vi.fn(),
      guild: {
        members: {
          cache: {
            get: vi.fn(),
          },
        },
      },
      message: {
        embeds: [
          {
            fields: [
              {
                name: 'Discord User',
                value: '<@1234567890>',
              },
            ],
          },
        ],
      },
    } as unknown as Interaction)
  })

  test('should be defined', () => {
    expect(embedMemberTransformPipe).toBeDefined()
  })

  describe('transform', () => {
    test('should return undefined if interaction is not button', () => {
      vi.spyOn(interaction, 'isButton').mockReturnValue(false)

      expect(embedMemberTransformPipe.transform(interaction)).toBeUndefined()
    })

    test('should return guild member', () => {
      const guildMemberMock = mock<GuildMember>()

      vi.spyOn(interaction, 'isButton').mockReturnValue(true)

      vi.spyOn(
        interaction.guild?.members.cache,
        'get' as never
      ).mockReturnValue(guildMemberMock as never)

      expect(embedMemberTransformPipe.transform(interaction)).toEqual(
        guildMemberMock
      )
    })
  })
})
