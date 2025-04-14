
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, Printer, Filter } from "lucide-react";

type ContextType = {
  setTitle: (title: string) => void;
};

export default function Reports() {
  const { setTitle } = useOutletContext<ContextType>();
  const [timeRange, setTimeRange] = useState("month");

  useEffect(() => {
    setTitle("Reports & Analytics");
  }, [setTitle]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="finances">Finances</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard 
              title="Total Patients"
              value="1,254"
              change="+12.5%"
              timeRange={timeRange}
              trend="up"
            />
            <StatCard 
              title="New Patients"
              value="235"
              change="+18.3%"
              timeRange={timeRange}
              trend="up"
            />
            <StatCard 
              title="Patient Satisfaction"
              value="92%"
              change="+3.2%"
              timeRange={timeRange}
              trend="up"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Patient Admissions</CardTitle>
                <CardDescription>Patients admitted by department</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={admissionsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="admitted" fill="#0EA5E9" name="Admitted" />
                    <Bar dataKey="discharged" fill="#8B5CF6" name="Discharged" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Patient Demographics</CardTitle>
                <CardDescription>Patient age groups</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={demographicsData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    >
                      {demographicsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} patients`]} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="patients" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Patient Metrics</CardTitle>
              <CardDescription>Detailed patient statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                Select specific metrics to display patient data
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Statistics</CardTitle>
              <CardDescription>Appointment metrics and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                Select specific metrics to display appointment data
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="finances" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Financial Reports</CardTitle>
              <CardDescription>Revenue and expense tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                Select specific metrics to display financial data
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

type StatCardProps = {
  title: string;
  value: string;
  change: string;
  timeRange: string;
  trend: 'up' | 'down' | 'neutral';
};

function StatCard({ title, value, change, timeRange, trend }: StatCardProps) {
  const getTimeRangeText = () => {
    switch (timeRange) {
      case 'week':
        return 'vs. last week';
      case 'month':
        return 'vs. last month';
      case 'quarter':
        return 'vs. last quarter';
      case 'year':
        return 'vs. last year';
      default:
        return '';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className={`flex items-center mt-1 text-xs ${
          trend === 'up' ? 'text-accent' : 
          trend === 'down' ? 'text-destructive' : 
          'text-muted-foreground'
        }`}>
          {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '•'} {change} <span className="text-muted-foreground ml-1">{getTimeRangeText()}</span>
        </div>
      </CardContent>
    </Card>
  );
}

// Sample data
const admissionsData = [
  { department: 'Cardiology', admitted: 85, discharged: 72 },
  { department: 'Orthopedics', admitted: 65, discharged: 58 },
  { department: 'Neurology', admitted: 45, discharged: 39 },
  { department: 'Pediatrics', admitted: 70, discharged: 65 },
  { department: 'General', admitted: 90, discharged: 82 },
];

const demographicsData = [
  { name: '0-18', value: 210 },
  { name: '19-35', value: 325 },
  { name: '36-50', value: 290 },
  { name: '51-65', value: 245 },
  { name: '65+', value: 184 },
];

const COLORS = ['#0EA5E9', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444'];
