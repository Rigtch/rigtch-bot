import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { DiscordModule } from '@discord-nestjs/core'
import { GatewayIntentBits, Partials } from 'discord.js'

import { BotModule } from '@modules/bot'
import { Environment, environmentValidationSchema } from '@config/environment'

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
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildPresences,
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
})
export class AppModule {}
