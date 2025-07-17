import { useState } from 'react'
import { 
  LayoutDashboard, 
  Wallet, 
  Receipt, 
  BarChart3, 
  Target, 
  Settings,
  Menu,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface AppLayoutProps {
  children: React.ReactNode
  currentPage: string
  onPageChange: (page: string) => void
}

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, id: 'dashboard' },
  { name: 'Budget', icon: Wallet, id: 'budget' },
  { name: 'Transactions', icon: Receipt, id: 'transactions' },
  { name: 'Reports', icon: BarChart3, id: 'reports' },
  { name: 'Goals', icon: Target, id: 'goals' },
  { name: 'Settings', icon: Settings, id: 'settings' },
]

export function AppLayout({ children, currentPage, onPageChange }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar-background border-r border-sidebar-border transform transition-transform duration-200 ease-in-out lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-sidebar-border">
            <h1 className="text-xl font-semibold text-sidebar-foreground">Budget App</h1>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-11",
                    currentPage === item.id 
                      ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                  onClick={() => {
                    onPageChange(item.id)
                    setSidebarOpen(false)
                  }}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Mobile header */}
        <div className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6 lg:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold capitalize">{currentPage}</h1>
        </div>

        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}