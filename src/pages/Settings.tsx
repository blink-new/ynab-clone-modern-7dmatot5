import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { 
  User, 
  Bell, 
  Shield, 
  Palette,
  Download,
  Trash2,
  CreditCard,
  Database
} from 'lucide-react'

export function Settings() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account preferences and application settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Navigation */}
        <div className="space-y-2">
          <Button variant="secondary" className="w-full justify-start gap-2">
            <User className="h-4 w-4" />
            Profile
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Shield className="h-4 w-4" />
            Security
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Palette className="h-4 w-4" />
            Appearance
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <CreditCard className="h-4 w-4" />
            Accounts
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Database className="h-4 w-4" />
            Data
          </Button>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="john.doe@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Input id="timezone" placeholder="America/New_York" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Budget Alerts</p>
                  <p className="text-sm text-muted-foreground">
                    Get notified when you're close to your budget limits
                  </p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Goal Reminders</p>
                  <p className="text-sm text-muted-foreground">
                    Receive reminders about your savings goals
                  </p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Transaction Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Get notified about new transactions
                  </p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Weekly Reports</p>
                  <p className="text-sm text-muted-foreground">
                    Receive weekly spending summaries
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security & Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              <Button>Update Password</Button>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Button variant="outline">Enable</Button>
              </div>
            </CardContent>
          </Card>

          {/* Appearance Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-muted-foreground">
                    Switch to dark theme
                  </p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div>
                <Label>Currency Format</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <Button variant="outline" size="sm">USD ($)</Button>
                  <Button variant="ghost" size="sm">EUR (€)</Button>
                  <Button variant="ghost" size="sm">GBP (£)</Button>
                  <Button variant="ghost" size="sm">CAD (C$)</Button>
                </div>
              </div>
              <div>
                <Label>Date Format</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <Button variant="outline" size="sm">MM/DD/YYYY</Button>
                  <Button variant="ghost" size="sm">DD/MM/YYYY</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Data Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Export Data</p>
                  <p className="text-sm text-muted-foreground">
                    Download all your financial data
                  </p>
                </div>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Delete Account</p>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all data
                  </p>
                </div>
                <Button variant="destructive" className="gap-2">
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}