import { test, describe, expect, beforeEach } from 'vitest'
import { TestingModule, Test } from '@nestjs/testing'

import { PingCommand } from './ping.command'

describe('PingCommand', () => {
  let pingCommand: PingCommand

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PingCommand],
    }).compile()

    pingCommand = module.get<PingCommand>(PingCommand)
  })

  test('should be defined', () => {
    expect(pingCommand).toBeDefined()
  })

  test('should return Pong!', () => {
    expect(pingCommand.handle()).toEqual('Pong!')
  })
})
