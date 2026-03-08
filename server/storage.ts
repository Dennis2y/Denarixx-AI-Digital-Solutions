import { type InsertContact, type Contact } from "@shared/schema";

export interface IStorage {
  createContact(contact: InsertContact): Promise<Contact>;
}

export class MemoryStorage implements IStorage {
  private contacts: Contact[] = [];
  private currentId = 1;

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const contact: Contact = {
      id: this.currentId++,
      name: insertContact.name,
      email: insertContact.email,
      message: insertContact.message,
      createdAt: new Date(),
    };

    this.contacts.push(contact);
    return contact;
  }
}

export const storage = new MemoryStorage();
