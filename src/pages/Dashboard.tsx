
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { 
  Users, 
  Calendar, 
  UserRound, 
  TrendingUp, 
  Activity,
  Clock
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type ContextType = {
  setTitle: (title: string) => void;
};

export default function Dashboard() {
  const { setTitle } = useOutletContext<ContextType>();
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    totalAppointments: 0,
    occupancyRate: 0
  });

  // Simulate loading data
  useEffect(() => {
    setTitle("Dashboard");
    
    // Simulated data loading with increasing numbers
    const interval = setInterval(() => {
      setStats(prev => ({
        totalPatients: prev.totalPatients < 1254 ? prev.totalPatients + 50 : 1254,
        totalDoctors: prev.totalDoctors < 75 ? prev.totalDoctors + 3 : 75,
        totalAppointments: prev.totalAppointments < 328 ? prev.totalAppointments + 15 : 328,
        occupancyRate: prev.occupancyRate < 73 ? prev.occupancyRate + 3 : 73
      }));
    }, 100);

    return () => clearInterval(interval);
  }, [setTitle]);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Patients"
          value={stats.totalPatients.toLocaleString()}
          description="Registered patients"
          icon={<Users className="h-5 w-5 text-primary" />}
          trend="+12.5%"
        />
        <StatCard 
          title="Total Doctors"
          value={stats.totalDoctors.toLocaleString()}
          description="Active medical staff"
          icon={<UserRound className="h-5 w-5 text-secondary" />}
          trend="+4.3%"
        />
        <StatCard 
          title="Appointments"
          value={stats.totalAppointments.toLocaleString()}
          description="This week"
          icon={<Calendar className="h-5 w-5 text-accent" />}
          trend="+8.1%"
        />
        <StatCard 
          title="Occupancy Rate"
          value={`${stats.occupancyRate}%`}
          description="Bed occupancy"
          icon={<TrendingUp className="h-5 w-5 text-medical-red" />}
          trend="-2.4%"
          trendDown
        />
      </div>

      {/* Recent Activity and Upcoming Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
              <Activity className="h-5 w-5 text-muted-foreground" />
            </div>
            <CardDescription>Latest hospital activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <ActivityItem 
                  key={index}
                  title={activity.title}
                  description={activity.description}
                  time={activity.time}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Upcoming Appointments</CardTitle>
              <Clock className="h-5 w-5 text-muted-foreground" />
            </div>
            <CardDescription>Today's schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment, index) => (
                <AppointmentItem 
                  key={index}
                  patient={appointment.patient}
                  doctor={appointment.doctor}
                  time={appointment.time}
                  status={appointment.status}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

type StatCardProps = {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend: string;
  trendDown?: boolean;
};

function StatCard({ title, value, description, icon, trend, trendDown }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        <div className={`flex items-center mt-2 text-xs ${trendDown ? 'text-destructive' : 'text-accent'}`}>
          {trendDown ? '↓' : '↑'} {trend}
        </div>
      </CardContent>
    </Card>
  );
}

type ActivityItemProps = {
  title: string;
  description: string;
  time: string;
};

function ActivityItem({ title, description, time }: ActivityItemProps) {
  return (
    <div className="flex items-start space-x-3">
      <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
      <div className="flex-1">
        <h4 className="text-sm font-medium">{title}</h4>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <div className="text-xs text-muted-foreground">{time}</div>
    </div>
  );
}

type AppointmentItemProps = {
  patient: string;
  doctor: string;
  time: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
};

function AppointmentItem({ patient, doctor, time, status }: AppointmentItemProps) {
  const getStatusColor = () => {
    switch (status) {
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
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
        {patient.charAt(0)}
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-medium">{patient}</h4>
        <p className="text-xs text-muted-foreground">Dr. {doctor}</p>
      </div>
      <div className="text-xs">{time}</div>
      <div className={`text-xs px-2 py-1 rounded-full ${getStatusColor()}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </div>
    </div>
  );
}

// Sample data
const recentActivities = [
  {
    title: "New patient registered",
    description: "Patient ID: PAT-2023-04569",
    time: "5m ago"
  },
  {
    title: "Lab results updated",
    description: "Dr. Sarah Johnson updated lab results for James Wilson",
    time: "15m ago"
  },
  {
    title: "Emergency admission",
    description: "Patient Maria Garcia admitted to ER",
    time: "1h ago"
  },
  {
    title: "Medication administered",
    description: "Nurse Taylor administered medication to Robert Chen",
    time: "2h ago"
  }
];

const upcomingAppointments = [
  {
    patient: "Emma Thompson",
    doctor: "John Smith",
    time: "10:30 AM",
    status: "scheduled" as const
  },
  {
    patient: "Michael Brown",
    doctor: "Sarah Johnson",
    time: "11:45 AM",
    status: "in-progress" as const
  },
  {
    patient: "David Wilson",
    doctor: "Robert Chen",
    time: "1:15 PM",
    status: "scheduled" as const
  },
  {
    patient: "Lisa Martinez",
    doctor: "Emily Davis",
    time: "2:30 PM",
    status: "scheduled" as const
  }
];
