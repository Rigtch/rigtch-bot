import { Param, ParamType } from '@discord-nestjs/core'

export abstract class Clear {
  @Param({
    name: 'amount',
    description: 'Amount of messages to clear',
    type: ParamType.INTEGER,
    required: true,
  })
  amount: number

  @Param({
    name: 'silent',
    description: 'Clearing message silently',
    type: ParamType.BOOLEAN,
    required: false,
  })
  silent?: boolean
}
