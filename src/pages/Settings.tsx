
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

type ContextType = {
  setTitle: (title: string) => void;
};

export default function Settings() {
  const { setTitle } = useOutletContext<ContextType>();

  useEffect(() => {
    setTitle("Settings");
  }, [setTitle]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Hospital Settings</h2>
        <p className="text-muted-foreground">Manage your hospital preferences and system settings</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="mt-6 space-y-6">
          <GeneralSettings />
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-6 space-y-6">
          <NotificationSettings />
        </TabsContent>
        
        <TabsContent value="security" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Security settings will be available in the next update
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage system users and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                User management will be available in the next update
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize how the application looks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Appearance settings will be available in the next update
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function GeneralSettings() {
  const generalFormSchema = z.object({
    hospitalName: z.string().min(2, {
      message: "Hospital name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    phone: z.string().min(10, {
      message: "Please enter a valid phone number.",
    }),
    address: z.string().min(5, {
      message: "Address must be at least 5 characters.",
    }),
    website: z.string().url({
      message: "Please enter a valid URL.",
    }),
  });

  const form = useForm<z.infer<typeof generalFormSchema>>({
    resolver: zodResolver(generalFormSchema),
    defaultValues: {
      hospitalName: "MedCare General Hospital",
      email: "admin@medcare.hospital",
      phone: "555-123-4567",
      address: "123 Healthcare Ave, Medical District, MD 12345",
      website: "https://medcare.hospital",
    },
  });

  function onSubmit(values: z.infer<typeof generalFormSchema>) {
    // In a real app, this would save to the backend
    console.log(values);
    // Display a success message
    alert("Settings saved successfully!");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>General Information</CardTitle>
        <CardDescription>
          Update your hospital details and contact information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="hospitalName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hospital Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the name that will be displayed throughout the system.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Primary contact email for the hospital.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Main reception phone number.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={3} />
                  </FormControl>
                  <FormDescription>
                    Physical location of the hospital.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Official hospital website URL.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit">Save Changes</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    system: true,
    appointments: true,
    patientAdmission: true,
    criticalAlerts: true,
    updates: false,
  });

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>
          Control how you receive notifications and alerts
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Notification Channels</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Email Notifications</div>
                <div className="text-sm text-muted-foreground">
                  Receive notifications via email
                </div>
              </div>
              <Switch 
                checked={notifications.email}
                onCheckedChange={() => handleToggle('email')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">SMS Notifications</div>
                <div className="text-sm text-muted-foreground">
                  Receive notifications via text message
                </div>
              </div>
              <Switch 
                checked={notifications.sms}
                onCheckedChange={() => handleToggle('sms')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Push Notifications</div>
                <div className="text-sm text-muted-foreground">
                  Receive notifications on your device
                </div>
              </div>
              <Switch 
                checked={notifications.push}
                onCheckedChange={() => handleToggle('push')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">System Notifications</div>
                <div className="text-sm text-muted-foreground">
                  Receive notifications within the application
                </div>
              </div>
              <Switch 
                checked={notifications.system}
                onCheckedChange={() => handleToggle('system')}
              />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Notification Types</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Appointment Reminders</div>
                <div className="text-sm text-muted-foreground">
                  Notifications about upcoming appointments
                </div>
              </div>
              <Switch 
                checked={notifications.appointments}
                onCheckedChange={() => handleToggle('appointments')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Patient Admissions</div>
                <div className="text-sm text-muted-foreground">
                  Notifications about new patient admissions
                </div>
              </div>
              <Switch 
                checked={notifications.patientAdmission}
                onCheckedChange={() => handleToggle('patientAdmission')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Critical Alerts</div>
                <div className="text-sm text-muted-foreground">
                  Urgent notifications requiring immediate attention
                </div>
              </div>
              <Switch 
                checked={notifications.criticalAlerts}
                onCheckedChange={() => handleToggle('criticalAlerts')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">System Updates</div>
                <div className="text-sm text-muted-foreground">
                  Notifications about system maintenance and updates
                </div>
              </div>
              <Switch 
                checked={notifications.updates}
                onCheckedChange={() => handleToggle('updates')}
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button>Save Preferences</Button>
      </CardFooter>
    </Card>
  );
}
