import { useState, useEffect } from "react";
import axios from "@/utils/axios";
import { toast } from "sonner";
import { Booking } from "@/types";

interface UseBookingsProps {
  userId?: string;
}

interface BookingsState {
  upcoming: Booking[];
  completed: Booking[];
  cancelled: Booking[];
  loading: boolean;
  error: string | null;
}

export const useBookings = ({ userId }: UseBookingsProps = {}) => {
  const [state, setState] = useState<BookingsState>({
    upcoming: [],
    completed: [],
    cancelled: [],
    loading: true,
    error: null,
  });

  const fetchBookings = async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const response = await axios.get("/bookings");

      if (response.data.success) {
        const bookings = response.data.data;

        // Sort bookings by status
        const upcoming = bookings.filter(
          (booking: Booking) => booking.status === "confirmed"
        );
        const completed = bookings.filter(
          (booking: Booking) => booking.status === "completed"
        );
        const cancelled = bookings.filter(
          (booking: Booking) => booking.status === "cancelled"
        );

        setState({
          upcoming,
          completed,
          cancelled,
          loading: false,
          error: null,
        });
      }
    } catch (error: any) {
      console.error("Error fetching bookings:", error);
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error.response?.data?.message || "Failed to fetch bookings",
      }));
      toast.error(error.response?.data?.message || "Failed to fetch bookings");
    }
  };

  const cancelBooking = async (bookingId: string) => {
    try {
      const response = await axios.put(`/bookings/${bookingId}/cancel`);
      if (response.data.success) {
        toast.success("Booking cancelled successfully");
        // Refresh bookings after cancellation
        fetchBookings();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to cancel booking");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [userId]);

  return {
    ...state,
    refetch: fetchBookings,
    cancelBooking,
  };
};
