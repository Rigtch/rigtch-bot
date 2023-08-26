import { Test, TestingModule } from '@nestjs/testing'
import {
  Client,
  Collection,
  Guild,
  GuildManager,
  OAuth2Guild,
} from 'discord.js'
import { INJECT_DISCORD_CLIENT } from '@discord-nestjs/core'
import { vi } from 'vitest'
import { mock } from 'vitest-mock-extended'
import { ConfigService } from '@nestjs/config'

import { BotService } from './bot.service'
describe('BotService', () => {
  let botService: BotService
  let client: Client<true>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BotService,
        {
          provide: INJECT_DISCORD_CLIENT as string,
          useValue: mock<Client>({
            guilds: {
              fetch: vi.fn(),
            } as unknown as GuildManager,
          }),
        },
        {
          provide: ConfigService,
          useValue: {
            get: vi.fn().mockReturnValue('value'),
          },
        },
      ],
    }).compile()

    botService = module.get<BotService>(BotService)
    client = module.get<Client>(INJECT_DISCORD_CLIENT as string)
  })

  test('should be defined', () => {
    expect(botService).toBeDefined()
  })

  describe('guild', () => {
    test('should return guild', async () => {
      const guildMock = mock<Guild>()

      vi.spyOn(client.guilds, 'fetch').mockResolvedValue(
        guildMock as unknown as Collection<string, OAuth2Guild>
      )

      expect(botService.guild).resolves.toEqual(guildMock)
    })
  })

  describe('privateBetaRequestsChannel', () => {
    test('should return private beta requests channel', async () => {
      const channelMock = mock<Guild>()
      const guildMock = mock<Guild>({
        channels: {
          cache: {
            filter: vi.fn().mockReturnValue({
              get: vi.fn().mockReturnValue(channelMock),
            }),
          },
        },
      } as unknown as Guild)

      vi.spyOn(client.guilds, 'fetch').mockResolvedValue(
        guildMock as unknown as Collection<string, OAuth2Guild>
      )

      expect(botService.privateBetaRequestsChannel).resolves.toEqual(
        channelMock
      )
    })
  })
})
