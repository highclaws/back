import { Module } from '@nestjs/common';
import { ProductsModule } from './app/modules/products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config/config.schema';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';


const databasesConnections = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const isProduction = configService.get('STAGE') === 'prod';

    return {
      ssl: isProduction,
      extra: {
        ssl: isProduction ? { rejectUnauthorized: false } : null,
      },
      type: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
      host: configService.get('DB_HOST'),
      port: configService.get('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_DATABASE'),
      entities: [
        join(__dirname, './app/database/entities/**/*.entity{.ts,.js}'),
      ],
      migrations: [
        join(__dirname, './app/database/migrations/*-migrations{.ts,.js}'),
      ],
      migrationsRun: configService.get<boolean>('migrationsRun'),
    };
  },
});

const coreModules = [
  ConfigModule.forRoot({
    envFilePath: [`.env.stage.${process.env.STAGE}`],
    validationSchema: configValidationSchema,
  }),
  databasesConnections,
];
console.log(join(__dirname, './app/database/migrations/*-migrations{.ts,.js}'));

@Module({
  imports: [
    ...coreModules,
    ProductsModule,
    databasesConnections,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
