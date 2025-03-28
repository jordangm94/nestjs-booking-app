import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [DatabaseModule, AppointmentsModule, MailerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
