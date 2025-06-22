import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Booking } from "@/types";
import axios from "@/utils/axios";
import { toast } from "sonner";
import { useUser } from "@/contexts/UserContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BookingDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useUser();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axios.get(`/bookings/${id}`);
        if (response.data.success) {
          setBooking(response.data.data);
        } else {
          toast.error("Failed to load booking details");
          navigate("/dashboard");
        }
      } catch (error: any) {
        console.error("Error fetching booking:", error);
        toast.error(
          error.response?.data?.error || "Error loading booking details"
        );
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBooking();
    }
  }, [id, navigate]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gray-50 pt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!booking) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gray-50 pt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Booking Not Found
              </h1>
              <p className="mt-2 text-gray-600">
                The booking you're looking for doesn't exist or has been
                removed.
              </p>
              <button
                onClick={() => navigate("/dashboard")}
                className="mt-4 btn-primary"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">
                Booking Details
              </h1>

              {/* Booking Status */}
              <div className="mb-6">
                <div
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize"
                  style={{
                    backgroundColor:
                      booking.status === "confirmed"
                        ? "rgb(220 252 231)"
                        : booking.status === "pending"
                        ? "rgb(254 249 195)"
                        : booking.status === "cancelled"
                        ? "rgb(254 226 226)"
                        : "rgb(240 253 244)",
                    color:
                      booking.status === "confirmed"
                        ? "rgb(22 163 74)"
                        : booking.status === "pending"
                        ? "rgb(161 98 7)"
                        : booking.status === "cancelled"
                        ? "rgb(220 38 38)"
                        : "rgb(21 128 61)",
                  }}
                >
                  {booking.status}
                </div>
              </div>

              {/* Vehicle Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h2 className="text-lg font-semibold mb-4">
                    Vehicle Details
                  </h2>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Vehicle:</span>{" "}
                      {typeof booking.vehicle === "object"
                        ? booking.vehicle.name
                        : "Loading..."}
                    </p>
                    <p>
                      <span className="font-medium">Type:</span>{" "}
                      {typeof booking.vehicle === "object"
                        ? booking.vehicle.type
                        : "Loading..."}
                    </p>
                  </div>
                </div>

                {/* Booking Information */}
                <div>
                  <h2 className="text-lg font-semibold mb-4">
                    Booking Information
                  </h2>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Pickup:</span>{" "}
                      {new Date(booking.startDate).toLocaleString()}
                    </p>
                    <p>
                      <span className="font-medium">Return:</span>{" "}
                      {new Date(booking.endDate).toLocaleString()}
                    </p>
                    <p>
                      <span className="font-medium">Driver:</span>{" "}
                      {booking.includeDriver ? "Included" : "Not Included"}
                    </p>
                  </div>
                </div>

                {/* Location Details */}
                <div>
                  <h2 className="text-lg font-semibold mb-4">
                    Location Details
                  </h2>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Pickup Location:</span>{" "}
                      {booking.pickupLocation}
                    </p>
                    <p>
                      <span className="font-medium">Drop-off Location:</span>{" "}
                      {booking.dropLocation}
                    </p>
                  </div>
                </div>

                {/* Price Details */}
                <div>
                  <h2 className="text-lg font-semibold mb-4">Price Details</h2>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Total Price:</span> PKR{" "}
                      {booking.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Shared Ride Information */}
              {booking.sharedRide?.enabled && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h2 className="text-lg font-semibold mb-4">
                    Shared Ride Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p>
                        <span className="font-medium">Co-rider Name:</span>{" "}
                        {booking.sharedRide.riderInfo?.name}
                      </p>
                      <p>
                        <span className="font-medium">Co-rider Phone:</span>{" "}
                        {booking.sharedRide.riderInfo?.phone}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Notes */}
              {booking.notes && (
                <div className="mt-6">
                  <h2 className="text-lg font-semibold mb-2">
                    Additional Notes
                  </h2>
                  <p className="text-gray-600">{booking.notes}</p>
                </div>
              )}

              {/* Actions */}
              <div className="mt-8 flex justify-end space-x-4">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="btn-secondary"
                >
                  Back to Dashboard
                </button>
                {booking.status === "pending" && (
                  <button
                    onClick={async () => {
                      try {
                        const response = await axios.put(
                          `/bookings/${booking._id}/cancel`
                        );
                        if (response.data.success) {
                          toast.success("Booking cancelled successfully");
                          setBooking({
                            ...booking,
                            status: "cancelled",
                          });
                        }
                      } catch (error: any) {
                        toast.error(
                          error.response?.data?.error ||
                            "Failed to cancel booking"
                        );
                      }
                    }}
                    className="btn-danger"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BookingDetails;
