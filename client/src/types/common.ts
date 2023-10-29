import type { Session } from 'next-auth';
import { z } from 'zod';
import { AuthBaseSchema } from '@/schemas/AuthSchema';
import { CustomerCreationSchema } from '@/schemas/CustomerSchema';
import {
  VehicleCreationSchema,
  VehicleWithOutCustomerId,
  VehicleSchema,
} from '@/schemas/VehicleSchema';
import { MechanicCreationSchema } from '@/schemas/MechanicSchema';
import {
  WorkshopServiceCreationSchema,
  WorkshopServiceSchema,
} from '@/schemas/WorkshopServicesSchema';
import { WorkshopCreationSchema } from '@/schemas/WorkshopSchema';
import { NewEmployeeCreationSchema } from '@/schemas/EmployeeSchema';
import { OrderCreationSchema } from '@/schemas/OrderSchema';

export type ExtractProperties<T> = {
  [K in keyof T]: T[K];
};

export type SessionUser = ExtractProperties<Session['user']>;

export type NewUser = z.infer<typeof AuthBaseSchema>;
export type NewCustomer = z.infer<typeof CustomerCreationSchema>;
export type Customer = NewCustomer & { id: number; isActive: boolean };

export type NewVehicle = z.infer<typeof VehicleCreationSchema>;
export type Vehicles = NewVehicle;

export type NewMechanic = z.infer<typeof MechanicCreationSchema>;
export type Mechanics = NewMechanic;

export type NewWorkshopService = z.infer<typeof WorkshopServiceCreationSchema>;
export type WorkshopService = z.infer<typeof WorkshopServiceSchema>;

export type NewWorkshop = z.infer<typeof WorkshopCreationSchema>;
export type Workshops = NewWorkshop;

export type NewEmployee = z.infer<typeof NewEmployeeCreationSchema>;
export type Employees = NewEmployee;

export type ActionBase<T extends string | number> = {
  id: T;
  category:
    | 'customers'
    | 'vehicles'
    | 'users'
    | 'employees'
    | 'orders'
    | 'mechanics'
    | 'services';
  deleteDescription: string;
  deleteFunction: (id: T) => Promise<Record<string, unknown>>;
};

export type NewOrder = z.infer<typeof OrderCreationSchema>;
export type Orders = NewOrder;
export type Vehicle = z.infer<typeof VehicleSchema>;
export type VehicleCreationSchemaType = z.infer<typeof VehicleWithOutCustomerId>;
export type WorkshopServiceCreationSchemaType = z.infer<typeof WorkshopServiceCreationSchema>;

export type Statistics = {
  counters: {
    usersCount: number;
    clientsCount: number;
    ordersCount: number;
    servicesCount: number;
    vehiclesCount: number;
  };
  totalSales: number;
  popularServices: {
    topServices: {
      serviceName: string;
      count: number;
      total: number;
    }[];
    otherServices: {
      serviceName: string;
      count: number;
      total: number;
    }[];
  };
  newOrders: FullOrder[];
};

export type FullOrder = {
  id: number;
  entryDate: string;
  departureDate: string;
  deadline: string;
  cost: number;
  workshopId: number;
  mechanicId: number;
  vehicleId: number;
  employeeId: number;
  vehicle: {
    plate: string;
    customer: {
      id: number;
      firstName: string;
      lastName: string;
    };
  };
  orderServices: {
    serviceId: number;
    service: {
      serviceCode: string;
      service: string;
    };
  }[];
  workshop: {
    name: string;
  };
  employees: {
    name: string;
  };
  mechanic: {
    name: string;
  };
};
