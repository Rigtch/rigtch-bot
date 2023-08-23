import { Reflector } from '@nestjs/core'

import { PermissionsFlagsBitsType } from '../types'

export const Permissions =
  Reflector.createDecorator<PermissionsFlagsBitsType[]>()
