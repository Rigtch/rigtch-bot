import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { DiscordModule } from '@discord-nestjs/core'
import { GatewayIntentBits, Partials } from 'discord.js'
import { APP_GUARD } from '@nestjs/core'

import { BotModule } from '@modules/bot'
import { Environment, environmentValidationSchema } from '@config/environment'
import { InteractionTypeGuard, PermissionsGuard } from '@common/guards'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
      validationSchema: environmentValidationSchema,
    }),
    DiscordModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        token: configService.get(Environment.TOKEN),
        discordClientOptions: {
          intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildPresences,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.MessageContent,
          ],
          partials: [Partials.Channel],
        },
        registerCommandOptions: [
          {
            forGuild: configService.get(Environment.GUILD_ID),
            removeCommandsBefore: true,
          },
        ],
        failOnLogin: true,
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    BotModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
    {
      provide: APP_GUARD,
      useClass: InteractionTypeGuard,
    },
  ],
})
export class AppModule {}
