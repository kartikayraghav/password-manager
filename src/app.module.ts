import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

require('dotenv').config();

//Environment Variables.
const { MYSQL_HOST, MYSQL_PORT, MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type: 'mysql',
        host: MYSQL_HOST,
        port: parseInt(MYSQL_PORT),
        username: MYSQL_USERNAME,
        password: MYSQL_PASSWORD,
        database: MYSQL_DATABASE,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        // synchronize: true,
        // logging: true
      }
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
