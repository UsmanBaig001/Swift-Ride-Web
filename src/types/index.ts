// User and Profile types
export interface User {
  id: string;
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
  name: string;
  email: string;
  dob?: string;
  gender?: string;
  cnic?: string;
  province?: string;
  city?: string;
  postalCode?: string;
}

// Vehicle related types
export interface VehicleType {
  id: string;
  _id?: string; // Optional MongoDB ID
  name: string;
  brand: string;
  category?: "car" | "bus" | "minibus" | "coaster";
  image: string;
  seats?: number;
  price?: number;
  location: string;
  features: string[];
  availability?: boolean;
  // Additional properties
  transmission?: "manual" | "automatic";
  fuelType?: "petrol" | "diesel" | "hybrid" | "electric";
  rating?: number;
  reviews?: number;
  isPremium?: boolean;
  pricePerHour?: number;
  pricePerDay?: number;
  // Properties being used in mockData and VehicleCard
  type: "car" | "bus" | "minibus" | "coaster";
  seatingCapacity: number;
  available: boolean;
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

export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

export interface Booking {
  _id: string;
  user: string | User;
  vehicle: string | VehicleType;
  startDate: string;
  endDate: string;
  includeDriver: boolean;
  price: number;
  status: BookingStatus;
  pickupLocation: string;
  dropLocation: string;
  notes?: string;
  sharedRide?: {
    enabled: boolean;
    riderInfo?: {
      name: string;
      phone: string;
      email?: string;
    };
  };
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
