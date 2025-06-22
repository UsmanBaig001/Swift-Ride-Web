import { useState, useEffect } from "react";
import axios from "@/utils/axios";
import { VehicleType } from "@/types";

interface UseVehiclesProps {
  vehicleType?: "Car" | "Bus" | "Mini Bus" | "Coaster";
}

interface UseVehiclesReturn {
  vehicles: VehicleType[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useVehicles = ({
  vehicleType,
}: UseVehiclesProps = {}): UseVehiclesReturn => {
  const [vehicles, setVehicles] = useState<VehicleType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      setError(null);

      // Build query parameters
      const params = new URLSearchParams();
      if (vehicleType) {
        params.append("vehicleType", vehicleType);
      }

      const response = await axios.get(`/vehicles?${params.toString()}`);

      // Map the API response to match our frontend VehicleType
      const mappedVehicles: VehicleType[] = response.data.data.map(
        (vehicle: any) => ({
          id: vehicle._id,
          name: vehicle.name,
          brand: vehicle.brand,
          type: vehicle.vehicleType.toLowerCase().replace(" ", ""),
          category: vehicle.vehicleType.toLowerCase().replace(" ", ""),
          image: vehicle.image,
          seats: vehicle.seats,
          seatingCapacity: vehicle.seats,
          price: vehicle.rentalPlan.basePrice,
          pricePerHour: vehicle.rentalPlan.basePrice / 12,
          pricePerDay: vehicle.rentalPlan.basePrice,
          location: vehicle.location,
          features: vehicle.features,
          available: vehicle.status === "Available",
          availability: vehicle.status === "Available",
        })
      );

      setVehicles(mappedVehicles);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch vehicles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, [vehicleType]);

  return {
    vehicles,
    loading,
    error,
    refetch: fetchVehicles,
  };
};
