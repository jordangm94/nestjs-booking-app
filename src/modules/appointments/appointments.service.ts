import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Injectable()
export class AppointmentsService {
  create(createAppointmentDto: CreateAppointmentDto) {
    return 'This action adds a new appointment';
  }
}
