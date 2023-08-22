import { Command, Handler } from '@discord-nestjs/core'
import { Injectable } from '@nestjs/common'

@Command({
  name: 'ping',
  description: 'Replies with Pong!',
})
@Injectable()
export class PingCommand {
  @Handler()
  handle() {
    return 'Pong!'
  }
}
