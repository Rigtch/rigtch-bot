import { mock } from 'vitest-mock-extended'
import { test, describe, expect, beforeEach, vi } from 'vitest'
import { Reflector } from '@nestjs/core'
import { ExecutionContext } from '@nestjs/common'
import { InteractionType } from 'discord.js'

import { InteractionTypeGuard } from './interaction-type.guard'

describe('InteractionTypeGuard', () => {
  let interactionTypeGuard: InteractionTypeGuard
  let reflector: Reflector
  let context: ExecutionContext

  beforeEach(async () => {
    reflector = mock<Reflector>({
      get: vi.fn(),
    })
    interactionTypeGuard = new InteractionTypeGuard(reflector)
    context = mock<ExecutionContext>({
      getHandler: vi.fn(),
      getArgByIndex: vi.fn().mockReturnValue({}),
    })
  })

  test('should be defined', () => {
    expect(interactionTypeGuard).toBeDefined()
  })

  describe('canActivate', () => {
    test('should return true if requiredInteractionType is undefined', () => {
      expect(interactionTypeGuard.canActivate(context)).toEqual(true)
    })

    test('should return false if interaction type is undefined', () => {
      vi.spyOn(context, 'getArgByIndex').mockReturnValueOnce({})
      vi.spyOn(reflector, 'get').mockReturnValueOnce(
        InteractionType.ModalSubmit
      )

      expect(interactionTypeGuard.canActivate(context)).toEqual(false)
    })

    test('should return true if interaction type matches requiredInteractionType', () => {
      vi.spyOn(context, 'getArgByIndex').mockReturnValueOnce({
        type: InteractionType.ModalSubmit,
      })
      vi.spyOn(reflector, 'get').mockReturnValueOnce(
        InteractionType.ModalSubmit
      )

      expect(interactionTypeGuard.canActivate(context)).toEqual(true)
    })

    test('should return false if interaction type does not match requiredInteractionType', () => {
      vi.spyOn(context, 'getArgByIndex').mockReturnValueOnce({
        type: InteractionType.ModalSubmit,
      })
      vi.spyOn(reflector, 'get').mockReturnValueOnce(
        InteractionType.MessageComponent
      )

      expect(interactionTypeGuard.canActivate(context)).toEqual(false)
    })
  })
})
