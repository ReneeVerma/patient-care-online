
import { Clock, UserRound } from "lucide-react";
import { Appointment } from "@/types/appointments";

type AppointmentCardProps = {
  appointment: Appointment;
};

export function AppointmentCard({ appointment }: AppointmentCardProps) {
  const getStatusColor = () => {
    switch (appointment.status) {
      case 'scheduled':
        return 'bg-medical-yellow text-black';
      case 'in-progress':
        return 'bg-primary text-white';
      case 'completed':
        return 'bg-accent text-white';
      case 'cancelled':
        return 'bg-destructive text-white';
    }
  };

  return (
    <div className="p-3 bg-card rounded-md border">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium">{appointment.patientName}</h4>
          <p className="text-xs text-muted-foreground">{appointment.patientId}</p>
        </div>
        <div className={`text-xs px-2 py-1 rounded-full ${getStatusColor()}`}>
          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
        </div>
      </div>
      
      <div className="mt-2 text-xs">
        <div className="flex items-center">
          <UserRound className="h-3 w-3 mr-1" />
          <span>Dr. {appointment.doctorName}</span>
        </div>
        <div className="flex items-center mt-1">
          <Clock className="h-3 w-3 mr-1" />
          <span>{appointment.time}</span>
        </div>
      </div>
      
      <div className="mt-2 text-xs">
        <p className="text-muted-foreground">Reason: {appointment.reason}</p>
      </div>
    </div>
  );
}
