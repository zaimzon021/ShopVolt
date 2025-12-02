import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  createContact(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('subject') subject: string,
    @Body('message') message: string,
    @Body('userId') userId?: number,
  ) {
    return this.contactService.createContact(name, email, subject, message, userId);
  }

  @Get()
  getAllContacts() {
    return this.contactService.getAllContacts();
  }

  @Put(':id/status')
  updateStatus(@Param('id') id: number, @Body('status') status: string) {
    return this.contactService.updateStatus(id, status);
  }
}
