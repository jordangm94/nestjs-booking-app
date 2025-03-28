import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { DatabaseService } from 'src/database/database.service';
import { ConflictException } from '@nestjs/common';
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly db: DatabaseService,
    private readonly mailer: MailerService,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    const { firstName, lastName, email, phoneNumber, appointmentDateTime } =
      createAppointmentDto;

    let user = await this.db.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await this.db.user.create({
        data: {
          firstName,
          lastName,
          email,
          phoneNumber,
        },
      });
    }

    const existingAppointment = await this.db.appointment.findFirst({
      where: { appointmentDateTime },
    });

    if (existingAppointment) {
      throw new ConflictException(
        'Appointment slot is already taken. Please try again.',
      );
    }

    const appointment = await this.db.appointment.create({
      data: {
        userId: user.id,
        appointmentDateTime: new Date(appointmentDateTime),
      },
    });

    await this.mailer.sendAppointmentConfirmation(
      user.email,
      appointment.appointmentDateTime.toISOString(),
    );

    return appointment;
  }
}
