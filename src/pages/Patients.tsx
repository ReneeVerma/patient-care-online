
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { 
  PlusCircle, 
  Search, 
  FileEdit, 
  Trash2,
  ChevronLeft,
  ChevronRight,
  Filter
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ContextType = {
  setTitle: (title: string) => void;
};

export default function Patients() {
  const { setTitle } = useOutletContext<ContextType>();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsData, setPatientsData] = useState<Patient[]>([]);
  const patientsPerPage = 7;

  useEffect(() => {
    setTitle("Patients Management");
    // In a real app, this would be an API call
    setPatientsData(samplePatients);
  }, [setTitle]);

  // Filter patients based on search term
  const filteredPatients = patientsData.filter(
    patient => 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm)
  );

  // Pagination
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);
  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search patients..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="sm">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Patient
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Patient Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentPatients.length > 0 ? (
                currentPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">{patient.id}</TableCell>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.age}</TableCell>
                    <TableCell>{patient.gender}</TableCell>
                    <TableCell>{patient.phone}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        patient.status === 'Active' 
                          ? 'bg-accent/20 text-accent' 
                          : patient.status === 'Critical'
                            ? 'bg-destructive/20 text-destructive'
                            : 'bg-medical-yellow/20 text-medical-yellow'
                      }`}>
                        {patient.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon">
                          <FileEdit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    No patients found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing {indexOfFirstPatient + 1}-{Math.min(indexOfLastPatient, filteredPatients.length)} of {filteredPatients.length} patients
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="icon" 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: Math.min(3, totalPages) }).map((_, index) => {
                const pageNumber = currentPage === 1 
                  ? index + 1 
                  : currentPage === totalPages 
                    ? totalPages - 2 + index 
                    : currentPage - 1 + index;
                
                if (pageNumber > 0 && pageNumber <= totalPages) {
                  return (
                    <Button
                      key={index}
                      variant={pageNumber === currentPage ? "default" : "outline"}
                      size="icon"
                      onClick={() => setCurrentPage(pageNumber)}
                    >
                      {pageNumber}
                    </Button>
                  );
                }
                return null;
              })}
              <Button 
                variant="outline" 
                size="icon" 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

type Patient = {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  status: 'Active' | 'Critical' | 'Recovering';
};

// Sample data
const samplePatients: Patient[] = [
  { id: "PAT-2023-001", name: "John Smith", age: 45, gender: "Male", phone: "555-123-4567", status: "Active" },
  { id: "PAT-2023-002", name: "Emily Johnson", age: 32, gender: "Female", phone: "555-234-5678", status: "Recovering" },
  { id: "PAT-2023-003", name: "Michael Wilson", age: 58, gender: "Male", phone: "555-345-6789", status: "Critical" },
  { id: "PAT-2023-004", name: "Sarah Brown", age: 27, gender: "Female", phone: "555-456-7890", status: "Active" },
  { id: "PAT-2023-005", name: "David Garcia", age: 62, gender: "Male", phone: "555-567-8901", status: "Recovering" },
  { id: "PAT-2023-006", name: "Jessica Martinez", age: 39, gender: "Female", phone: "555-678-9012", status: "Active" },
  { id: "PAT-2023-007", name: "Robert Anderson", age: 51, gender: "Male", phone: "555-789-0123", status: "Critical" },
  { id: "PAT-2023-008", name: "Lisa Thomas", age: 29, gender: "Female", phone: "555-890-1234", status: "Active" },
  { id: "PAT-2023-009", name: "Daniel Lee", age: 43, gender: "Male", phone: "555-901-2345", status: "Recovering" },
  { id: "PAT-2023-010", name: "Amy White", age: 36, gender: "Female", phone: "555-012-3456", status: "Active" },
  { id: "PAT-2023-011", name: "James Harris", age: 55, gender: "Male", phone: "555-123-4567", status: "Critical" },
  { id: "PAT-2023-012", name: "Jennifer Clark", age: 31, gender: "Female", phone: "555-234-5678", status: "Active" },
  { id: "PAT-2023-013", name: "Christopher Lewis", age: 47, gender: "Male", phone: "555-345-6789", status: "Recovering" },
  { id: "PAT-2023-014", name: "Michelle Walker", age: 28, gender: "Female", phone: "555-456-7890", status: "Active" },
  { id: "PAT-2023-015", name: "Kevin Hall", age: 60, gender: "Male", phone: "555-567-8901", status: "Critical" }
];
