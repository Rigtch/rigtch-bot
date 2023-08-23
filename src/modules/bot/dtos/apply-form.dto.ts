import { TextInputValue } from '@discord-nestjs/core'

import { EMAIL_INPUT_ID, USERNAME_INPUT_ID } from '@components/inputs'

export abstract class ApplyForm {
  @TextInputValue(USERNAME_INPUT_ID)
  username: string

  @TextInputValue(EMAIL_INPUT_ID)
  email: string
}
