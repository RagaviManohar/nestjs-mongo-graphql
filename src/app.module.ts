import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Mongoose import
import { MongooseModule } from '@nestjs/mongoose';

// Graphql import
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

import configuration from './config/configuration';

// import { CONSTANTS } from './shared/utils/constants';

// Controllers & Services
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Modules
import { UserModule } from './modules/user/user.module';

const AppMongooseConfig = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    uri: configService.get('mongoURI'),
  }),
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      expandVariables: true,
    }),

    // Graphql Configuration
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),

    // Mongoose Configuration
    MongooseModule.forRootAsync(AppMongooseConfig),

    // Modules
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
