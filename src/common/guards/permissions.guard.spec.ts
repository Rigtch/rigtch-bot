import { test, describe, expect, beforeEach, vi } from 'vitest'
import { mock } from 'vitest-mock-extended'
import { Reflector } from '@nestjs/core'
import { PermissionsBitField } from 'discord.js'
import { ExecutionContext } from '@nestjs/common'

import { PermissionsGuard } from './permissions.guard'

describe('PermissionsGuard', () => {
  let permissionsGuard: PermissionsGuard
  let reflector: Reflector
  let memberPermissions: PermissionsBitField

  beforeEach(async () => {
    reflector = mock<Reflector>()
    permissionsGuard = new PermissionsGuard(reflector)
    memberPermissions = {
      has: vi.fn().mockReturnValue(true),
    } as unknown as PermissionsBitField
  })

  test('should be defined', () => {
    expect(permissionsGuard).toBeDefined()
  })

  describe('matchPermissions', () => {
    test('should return true if requiredPermissions is undefined', () => {
      expect(permissionsGuard['matchPermissions']()).toEqual(true)
    })

    test('should return false if memberPermissions is undefined', () => {
      expect(
        permissionsGuard['matchPermissions']([
          PermissionsBitField.Flags.ManageMessages,
        ])
      ).toEqual(false)
    })

    test('should return true if memberPermissions has requiredPermissions', () => {
      vi.spyOn(memberPermissions, 'has').mockReturnValue(true)

      expect(
        permissionsGuard['matchPermissions'](
          [PermissionsBitField.Flags.ManageMessages],
          memberPermissions
        )
      ).toEqual(true)
    })

    test('should return false if memberPermissions does not have requiredPermissions', () => {
      vi.spyOn(memberPermissions, 'has').mockReturnValue(false)

      expect(
        permissionsGuard['matchPermissions'](
          [PermissionsBitField.Flags.ManageMessages],
          memberPermissions
        )
      ).toEqual(false)
    })
  })

  describe('canActivate', () => {
    test('should return false if member is undefined', () => {
      expect(
        permissionsGuard.canActivate(
          mock<ExecutionContext>({
            getArgByIndex: vi.fn().mockReturnValue({ member: undefined }),
            getHandler: vi.fn(),
          })
        )
      ).toEqual(false)
    })
  })
})
