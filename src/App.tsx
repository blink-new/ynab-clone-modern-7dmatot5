import { useState, useEffect } from 'react'
import { blink } from './blink/client'
import { AppLayout } from './components/layout/AppLayout'
import { Dashboard } from './pages/Dashboard'
import { Budget } from './pages/Budget'
import { Transactions } from './pages/Transactions'
import { Reports } from './pages/Reports'
import { Goals } from './pages/Goals'
import { Settings } from './pages/Settings'
import { Toaster } from './components/ui/toaster'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState('dashboard')

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading your budget app...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md mx-auto p-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Budget App</h1>
            <p className="text-muted-foreground">
              Take control of your finances with our modern budgeting tool
            </p>
          </div>
          <div className="space-y-4">
            <button
              onClick={() => blink.auth.login()}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 rounded-md font-medium transition-colors"
            >
              Sign In to Get Started
            </button>
            <p className="text-xs text-muted-foreground">
              Secure authentication powered by Blink
            </p>
          </div>
        </div>
      </div>
    )
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'budget':
        return <Budget />
      case 'transactions':
        return <Transactions />
      case 'reports':
        return <Reports />
      case 'goals':
        return <Goals />
      case 'settings':
        return <Settings />
      default:
        return <Dashboard />
    }
  }

  return (
    <>
      <AppLayout currentPage={currentPage} onPageChange={setCurrentPage}>
        {renderCurrentPage()}
      </AppLayout>
      <Toaster />
    </>
  )
}

export default App