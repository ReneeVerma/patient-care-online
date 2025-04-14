import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { AppointmentCard } from "@/components/appointments/AppointmentCard";
import { AppointmentList } from "@/components/appointments/AppointmentList";
import { Appointment } from "@/types/appointments";

type ContextType = {
  setTitle: (title: string) => void;
};

export default function Appointments() {
  const { setTitle } = useOutletContext<ContextType>();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    setTitle("Appointments");
    setAppointments(sampleAppointments);
  }, [setTitle]);

  // Filter appointments for the selected date
  const filteredAppointments = date 
    ? appointments.filter(appointment => 
        format(new Date(appointment.date), 'yyyy-MM-dd') === 
        format(date, 'yyyy-MM-dd'))
    : [];

  const appointmentsByTimeSlot = filteredAppointments
    .reduce((acc, appointment) => {
      const timeSlot = appointment.time.split(' ')[0];
      if (!acc[timeSlot]) {
        acc[timeSlot] = [];
      }
      acc[timeSlot].push(appointment);
      return acc;
    }, {} as Record<string, Appointment[]>);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Schedule</h2>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          New Appointment
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
              
              <div className="mt-4 space-y-2">
                <h3 className="font-medium text-sm">Legend</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span>Available</span>
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                    <span>Booked</span>
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-destructive"></div>
                    <span>Unavailable</span>
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-1 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>
                {date ? format(date, 'MMMM d, yyyy') : 'Select a date'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="timeline" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  <TabsTrigger value="list">List View</TabsTrigger>
                </TabsList>
                
                <TabsContent value="timeline" className="mt-4">
                  {Object.keys(appointmentsByTimeSlot).length > 0 ? (
                    <div className="space-y-4">
                      {Object.entries(appointmentsByTimeSlot).map(([timeSlot, appointmentsInSlot]) => (
                        <div key={timeSlot} className="relative">
                          <div className="flex items-center mb-2">
                            <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white text-xs">
                              {timeSlot}
                            </div>
                          </div>
                          <div className="ml-3 pl-4 border-l border-border space-y-3">
                            {appointmentsInSlot.map((appointment) => (
                              <AppointmentCard key={appointment.id} appointment={appointment} />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No appointments scheduled for this day
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="list" className="mt-4">
                  <AppointmentList appointments={filteredAppointments} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Sample data
const sampleAppointments: Appointment[] = [
  {
    id: "APT-2023-001",
    patientName: "John Smith",
    patientId: "PAT-2023-001",
    doctorName: "Maria Rodriguez",
    department: "Cardiology",
    date: new Date().toISOString(),
    time: "9:00 AM",
    status: "scheduled",
    reason: "Heart palpitations"
  },
  {
    id: "APT-2023-002",
    patientName: "Emily Johnson",
    patientId: "PAT-2023-002",
    doctorName: "James Wilson",
    department: "Orthopedics",
    date: new Date().toISOString(),
    time: "10:30 AM",
    status: "in-progress",
    reason: "Knee pain follow-up"
  },
  {
    id: "APT-2023-003",
    patientName: "Michael Brown",
    patientId: "PAT-2023-003",
    doctorName: "Sarah Chen",
    department: "Neurology",
    date: new Date().toISOString(),
    time: "11:45 AM",
    status: "scheduled",
    reason: "Migraine assessment"
  },
  {
    id: "APT-2023-004",
    patientName: "Jessica Garcia",
    patientId: "PAT-2023-004",
    doctorName: "David Kim",
    department: "Dermatology",
    date: new Date().toISOString(),
    time: "1:15 PM",
    status: "cancelled",
    reason: "Skin rash examination"
  },
  {
    id: "APT-2023-005",
    patientName: "Robert Anderson",
    patientId: "PAT-2023-005",
    doctorName: "Lisa Martinez",
    department: "Ophthalmology",
    date: new Date().toISOString(),
    time: "2:30 PM",
    status: "scheduled",
    reason: "Vision check"
  },
  {
    id: "APT-2023-006",
    patientName: "Sarah Lee",
    patientId: "PAT-2023-006",
    doctorName: "Michael Taylor",
    department: "General Medicine",
    date: new Date().toISOString(),
    time: "3:45 PM",
    status: "completed",
    reason: "Annual physical"
  },
  {
    id: "APT-2023-007",
    patientName: "David Miller",
    patientId: "PAT-2023-007",
    doctorName: "Jennifer White",
    department: "Endocrinology",
    date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
    time: "10:15 AM",
    status: "scheduled",
    reason: "Diabetes consultation"
  }
];
