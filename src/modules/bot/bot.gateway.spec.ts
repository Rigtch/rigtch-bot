import { mock } from 'vitest-mock-extended'
import { Client, ClientUser } from 'discord.js'
import { describe, vi } from 'vitest'
import { TestingModule, Test } from '@nestjs/testing'
import { INJECT_DISCORD_CLIENT } from '@discord-nestjs/core'

import { BotGateway } from './bot.gateway'

describe('BotGateway', () => {
  let botGateway: BotGateway
  let client: Client<true>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BotGateway,
        {
          provide: INJECT_DISCORD_CLIENT as string,
          useValue: mock<Client>({
            user: {
              setPresence: vi.fn(),
            } as unknown as ClientUser,
          }),
        },
      ],
    }).compile()

    botGateway = module.get<BotGateway>(BotGateway)
    client = module.get<Client>(INJECT_DISCORD_CLIENT as string)
  })

  test('should be defined', () => {
    expect(botGateway).toBeDefined()
  })

  describe('onClientReady', () => {
    test('should set presence', () => {
      vi.spyOn(client.user as ClientUser, 'setPresence')

      botGateway.onClientReady()

      expect(client.user.setPresence).toHaveBeenCalledWith({
        activities: [
          {
            type: 2,
            name: 'Rigtch Music',
          },
        ],
      })
    })
  })

  describe('onGuildMemberAdd', () => {
    test('should add role to member', () => {
      const member = {
        roles: {
          add: vi.fn(),
        },
        guild: {
          roles: {
            cache: {
              find: vi.fn(() => ({
                name: 'User',
              })),
            },
          },
        },
      }

      botGateway.onGuildMemberAdd(member)

      expect(member.roles.add).toHaveBeenCalledWith({
        name: 'User',
      })
    })
  })
})
