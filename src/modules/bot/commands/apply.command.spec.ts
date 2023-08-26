/* eslint-disable @typescript-eslint/no-unused-vars */
import { TestingModule, Test } from '@nestjs/testing'
import { describe, vi, beforeEach, test } from 'vitest'
import { mock } from 'vitest-mock-extended'
import { ModalBuilder } from 'discord.js'

import { BotService } from '../bot.service'

import { ApplyCommand } from './apply.command'

/*
  TODO: Fix this test
  Error: Cannot properly serialize component type: undefined
*/
describe.todo('ApplyCommand', () => {
  let applyCommand: ApplyCommand
  let botService: BotService

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [
  //       ApplyCommand,
  //       {
  //         provide: BotService,
  //         useValue: {
  //           privateBetaRequestsChannel: vi.fn(),
  //           guild: vi.fn(),
  //         },
  //       },
  //     ],
  //   }).compile()

  //   applyCommand = module.get<ApplyCommand>(ApplyCommand)
  //   botService = module.get<BotService>(BotService)
  // })

  test.todo('should be defined', () => {
    expect(applyCommand).toBeDefined()
  })
})
/* eslint-enable @typescript-eslint/no-unused-vars */
