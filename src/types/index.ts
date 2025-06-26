// User and Profile types
export interface User {
  _id: string;
  name: string;
  email: string;
  city: string;
  role: "user" | "admin";
  status: "active" | "inactive" | "blocked";
  cnic: string | null;
  gender: "male" | "female" | "other" | null;
  profile?: UserProfile;
}

export interface UserProfile {
  dob?: string;
  gender?: "male" | "female" | "other";
  cnic?: string;
  province?: string;
  city?: string;
  postalCode?: string;
}

// Vehicle related types
export interface VehicleType {
  _id: string;
  name: string;
  brand: string;
  model: string;
  type: "Car" | "Bus" | "Mini Bus" | "Coaster";
  location: string;
  pricePerDay: number;
  pricePerHour: number;
  seatingCapacity: number;
  transmission: "Manual" | "Automatic";
  fuelType: "Petrol" | "Diesel" | "Hybrid" | "Electric";
  features: string[];
  images: string[];
  availability: boolean;
  rating?: number;
  reviews?: number;
}

// Booking related types
export type RentalPlan = "12hour" | "2day" | "3day" | "1week";

export interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  pickupLocation: string;
  dropLocation: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  vehicleCategory?: "car" | "bus" | "minibus" | "coaster";
  rentalPlan: RentalPlan;
  withDriver: boolean;
  notes?: string;
  specialInstructions?: string;
  vehicleId?: string;
}

export interface Booking {
  _id: string;
  user: string | User;
  vehicle: VehicleType;
  startDate: string;
  endDate: string;
  pickupLocation: string;
  dropLocation: string;
  includeDriver: boolean;
  price: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  paymentStatus: "pending" | "completed" | "refunded";
  createdAt: string;
  updatedAt: string;
}

// Chat related types
export interface Message {
  id: string;
  sender: "user" | "system" | "admin";
  timestamp: string;
  text: string;
}

// Location data types
export type Province =
  | "Punjab"
  | "Sindh"
  | "KPK"
  | "Balochistan"
  | "Islamabad Capital Territory"
  | "Gilgit-Baltistan"
  | "Azad Jammu & Kashmir";
export type City = string;
export type LocationData = Record<Province, City[]>;

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
  };
}

export interface ErrorResponse {
  success: false;
  message: string;
  error?: string;
}

export interface Vehicle {
  id: string;
  name: string;
  type: "car" | "bus" | "minibus" | "coaster";
  model: string;
  year: number;
  seats: number;
  price: number;
  images: string[];
  features: string[];
  available: boolean;
}
