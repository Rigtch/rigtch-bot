import { NestFactory } from '@nestjs/core'

import { AppModule } from './modules/app'

async function bootstrap() {
  await NestFactory.createApplicationContext(AppModule)
}
bootstrap()
