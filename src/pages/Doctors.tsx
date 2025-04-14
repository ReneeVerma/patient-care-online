
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { 
  Search, 
  PlusCircle, 
  Phone, 
  Mail,
  Filter, 
  MessageSquare
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

type ContextType = {
  setTitle: (title: string) => void;
};

export default function Doctors() {
  const { setTitle } = useOutletContext<ContextType>();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [doctorsData, setDoctorsData] = useState<Doctor[]>([]);

  useEffect(() => {
    setTitle("Doctors & Staff");
    // In a real app, this would be an API call
    setDoctorsData(sampleDoctors);
  }, [setTitle]);

  // Filter doctors based on search term and department
  const filteredDoctors = doctorsData.filter(
    doctor => 
      (doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!selectedDepartment || doctor.department === selectedDepartment)
  );

  // Get unique departments for filter
  const departments = Array.from(
    new Set(doctorsData.map(doctor => doctor.department))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search doctors..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Doctor
        </Button>
      </div>

      <Tabs defaultValue="all">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all" onClick={() => setSelectedDepartment(null)}>
              All Doctors
            </TabsTrigger>
            {departments.map(dept => (
              <TabsTrigger 
                key={dept} 
                value={dept}
                onClick={() => setSelectedDepartment(dept)}
              >
                {dept}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
          
          {filteredDoctors.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No doctors found matching your criteria</p>
            </div>
          )}
        </TabsContent>

        {departments.map(dept => (
          <TabsContent key={dept} value={dept} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
            
            {filteredDoctors.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No doctors found in this department</p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

type Doctor = {
  id: string;
  name: string;
  department: string;
  specialization: string;
  experience: number;
  patients: number;
  rating: number;
  avatar: string;
  email: string;
  phone: string;
  status: 'available' | 'in-clinic' | 'on-leave';
};

type DoctorCardProps = {
  doctor: Doctor;
};

function DoctorCard({ doctor }: DoctorCardProps) {
  const getStatusColor = () => {
    switch (doctor.status) {
      case 'available':
        return 'bg-accent/20 text-accent';
      case 'in-clinic':
        return 'bg-primary/20 text-primary';
      case 'on-leave':
        return 'bg-medical-yellow/20 text-medical-yellow';
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-primary/10 h-24 relative">
          <div 
            className="absolute -bottom-12 left-6 w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-muted"
          >
            {/* In a real app, this would be an actual avatar */}
            <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-primary">
              {doctor.name.charAt(0)}
            </div>
          </div>
          <div className="absolute top-4 right-4">
            <Badge className={getStatusColor()}>
              {doctor.status.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}
            </Badge>
          </div>
        </div>

        <div className="mt-16 px-6 pb-6">
          <h3 className="text-xl font-semibold">Dr. {doctor.name}</h3>
          <p className="text-muted-foreground">{doctor.specialization}</p>
          
          <div className="mt-2 flex items-center text-sm">
            <Badge variant="outline" className="mr-2">{doctor.department}</Badge>
            <span className="text-muted-foreground">{doctor.experience} years exp.</span>
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex items-center text-sm">
              <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{doctor.email}</span>
            </div>
            <div className="flex items-center text-sm">
              <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{doctor.phone}</span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t flex items-center justify-between">
            <div>
              <div className="text-xl font-semibold">{doctor.patients}</div>
              <div className="text-xs text-muted-foreground">Patients</div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Button>
              <Button size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Message
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Sample data
const sampleDoctors: Doctor[] = [
  {
    id: "DOC-2023-001",
    name: "Maria Rodriguez",
    department: "Cardiology",
    specialization: "Interventional Cardiologist",
    experience: 12,
    patients: 1245,
    rating: 4.8,
    avatar: "",
    email: "m.rodriguez@hospital.com",
    phone: "555-123-4567",
    status: "available"
  },
  {
    id: "DOC-2023-002",
    name: "James Wilson",
    department: "Orthopedics",
    specialization: "Joint Replacement Specialist",
    experience: 15,
    patients: 980,
    rating: 4.7,
    avatar: "",
    email: "j.wilson@hospital.com",
    phone: "555-234-5678",
    status: "in-clinic"
  },
  {
    id: "DOC-2023-003",
    name: "Sarah Chen",
    department: "Neurology",
    specialization: "Neurologist",
    experience: 10,
    patients: 875,
    rating: 4.9,
    avatar: "",
    email: "s.chen@hospital.com",
    phone: "555-345-6789",
    status: "available"
  },
  {
    id: "DOC-2023-004",
    name: "David Kim",
    department: "Dermatology",
    specialization: "Dermatologist",
    experience: 8,
    patients: 1050,
    rating: 4.6,
    avatar: "",
    email: "d.kim@hospital.com",
    phone: "555-456-7890",
    status: "on-leave"
  },
  {
    id: "DOC-2023-005",
    name: "Lisa Martinez",
    department: "Ophthalmology",
    specialization: "Ophthalmic Surgeon",
    experience: 14,
    patients: 1320,
    rating: 4.8,
    avatar: "",
    email: "l.martinez@hospital.com",
    phone: "555-567-8901",
    status: "in-clinic"
  },
  {
    id: "DOC-2023-006",
    name: "Michael Taylor",
    department: "General Medicine",
    specialization: "General Physician",
    experience: 20,
    patients: 1560,
    rating: 4.9,
    avatar: "",
    email: "m.taylor@hospital.com",
    phone: "555-678-9012",
    status: "available"
  },
  {
    id: "DOC-2023-007",
    name: "Jennifer White",
    department: "Pediatrics",
    specialization: "Pediatrician",
    experience: 11,
    patients: 925,
    rating: 4.7,
    avatar: "",
    email: "j.white@hospital.com",
    phone: "555-789-0123",
    status: "in-clinic"
  },
  {
    id: "DOC-2023-008",
    name: "Robert Lee",
    department: "Psychiatry",
    specialization: "Psychiatrist",
    experience: 16,
    patients: 740,
    rating: 4.5,
    avatar: "",
    email: "r.lee@hospital.com",
    phone: "555-890-1234",
    status: "on-leave"
  },
  {
    id: "DOC-2023-009",
    name: "Emily Harris",
    department: "Cardiology",
    specialization: "Cardiac Surgeon",
    experience: 18,
    patients: 890,
    rating: 4.8,
    avatar: "",
    email: "e.harris@hospital.com",
    phone: "555-901-2345",
    status: "available"
  }
];
