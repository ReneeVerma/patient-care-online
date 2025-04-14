
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Appointment } from "@/types/appointments";

type AppointmentListItemProps = {
  appointment: Appointment;
};

export function AppointmentList({ appointments }: { appointments: Appointment[] }) {
  return (
    <div className="space-y-3">
      {appointments.length > 0 ? (
        appointments.map((appointment) => (
          <AppointmentListItem key={appointment.id} appointment={appointment} />
        ))
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          No appointments scheduled for this day
        </div>
      )}
    </div>
  );
}

function AppointmentListItem({ appointment }: AppointmentListItemProps) {
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
    <div className="flex items-center p-3 bg-card rounded-md border">
      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
        {appointment.patientName.charAt(0)}
      </div>
      
      <div className="ml-3 flex-1">
        <h4 className="font-medium text-sm">{appointment.patientName}</h4>
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          <span>{appointment.time}</span>
          <div className="mx-2">•</div>
          <span>Dr. {appointment.doctorName}</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{appointment.reason}</p>
      </div>
      
      <div className={`text-xs px-2 py-1 rounded-full ${getStatusColor()}`}>
        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
      </div>
      
      <Button variant="ghost" size="icon" className="ml-2">
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
