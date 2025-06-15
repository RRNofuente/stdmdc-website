// lib/db/schema.ts
import { pgTable, serial, varchar, timestamp, text, boolean, integer, pgEnum, uniqueIndex } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// User role enum
export const userRoleEnum = pgEnum('user_role', ['admin', 'staff', 'patient']);

// Users table
export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    passwordHash: varchar('password_hash', { length: 255 }).notNull(),
    firstName: varchar('first_name', { length: 100 }).notNull(),
    lastName: varchar('last_name', { length: 100 }).notNull(),
    phone: varchar('phone', { length: 20 }),
    role: userRoleEnum('role').default('patient').notNull(),
    dateOfBirth: timestamp('date_of_birth'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  }, (table) => [
    uniqueIndex('email_idx').on(table.email), 
  ]);
  

// User relations
export const usersRelations = relations(users, ({ many }) => ({
  appointments: many(appointments),
  patientRecords: many(patientRecords),
}));

// Services table
export const services = pgTable('services', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  duration: integer('duration').notNull(), 
  price: integer('price'), 
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Service relations
export const servicesRelations = relations(services, ({ many }) => ({
  appointments: many(appointments),
}));



// Appointments table
export const appointments = pgTable('appointments', {
    id: serial('id').primaryKey(),
    patientId: integer('patient_id').notNull().references(() => users.id),
    serviceId: integer('service_id').notNull().references(() => services.id),
    staffId: integer('staff_id').references(() => users.id),
    date: timestamp('date').notNull(),
    startTime: timestamp('start_time').notNull(),
    endTime: timestamp('end_time').notNull(),
    status: varchar('status', { length: 20 }).notNull().default('pending'), 
    notes: text('notes'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});



// Appointment relations
export const appointmentsRelations = relations(appointments, ({ one }) => ({
  patient: one(users, {
    fields: [appointments.patientId],
    references: [users.id],
  }),
  service: one(services, {
    fields: [appointments.serviceId],
    references: [services.id],
  }),
  staff: one(users, {
    fields: [appointments.staffId],
    references: [users.id],
  }),
}));

// Patient records table
export const patientRecords = pgTable('patient_records', {
  id: serial('id').primaryKey(),
  patientId: integer('patient_id').notNull().references(() => users.id),
  medicalHistory: text('medical_history'),
  allergies: text('allergies'),
  currentMedications: text('current_medications'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Patient records relations
export const patientRecordsRelations = relations(patientRecords, ({ one }) => ({
  patient: one(users, {
    fields: [patientRecords.patientId],
    references: [users.id],
  }),
}));

// Available times table
export const availableTimes = pgTable('available_times', {
  id: serial('id').primaryKey(),
  staffId: integer('staff_id').references(() => users.id),
  dayOfWeek: integer('day_of_week').notNull(), // 0-6, 0 = Sunday
  startTime: varchar('start_time', { length: 5 }).notNull(), // Format: "HH:MM"
  endTime: varchar('end_time', { length: 5 }).notNull(), // Format: "HH:MM"
  isAvailable: boolean('is_available').default(true).notNull(),
});

// Available times relations
export const availableTimesRelations = relations(availableTimes, ({ one }) => ({
  staff: one(users, {
    fields: [availableTimes.staffId],
    references: [users.id],
  }),
}));