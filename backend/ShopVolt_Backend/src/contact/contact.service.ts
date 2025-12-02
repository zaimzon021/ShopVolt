import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './contact.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
  ) {}

  async createContact(name: string, email: string, subject: string, message: string, userId?: number) {
    const contact = this.contactRepository.create({ name, email, subject, message, userId });
    await this.contactRepository.save(contact);
    return { message: 'Message sent successfully' };
  }

  async getAllContacts() {
    return await this.contactRepository.find({ order: { createdAt: 'DESC' } });
  }

  async updateStatus(id: number, status: string) {
    await this.contactRepository.update(id, { status });
    return { message: 'Status updated' };
  }
}
