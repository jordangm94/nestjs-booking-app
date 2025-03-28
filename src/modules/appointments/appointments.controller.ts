import { Controller, Post, Body, HttpCode, Get } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @HttpCode(201)
  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @HttpCode(200)
  @Get()
  getBookedAppointments() {
    return this.appointmentsService.getBookedAppointments();
  }
}
