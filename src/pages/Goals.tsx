import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Target, 
  Plus,
  Calendar,
  DollarSign,
  TrendingUp,
  CheckCircle
} from 'lucide-react'

export function Goals() {
  // Mock data - will be replaced with real data later
  const goals = [
    {
      id: '1',
      name: 'Emergency Fund',
      targetAmount: 10000,
      currentAmount: 6500,
      targetDate: '2024-12-31',
      category: 'Savings',
      status: 'active'
    },
    {
      id: '2',
      name: 'Vacation to Europe',
      targetAmount: 5000,
      currentAmount: 2800,
      targetDate: '2024-08-15',
      category: 'Travel',
      status: 'active'
    },
    {
      id: '3',
      name: 'New Car Down Payment',
      targetAmount: 8000,
      currentAmount: 8000,
      targetDate: '2024-03-01',
      category: 'Transportation',
      status: 'completed'
    },
    {
      id: '4',
      name: 'Home Renovation',
      targetAmount: 15000,
      currentAmount: 3200,
      targetDate: '2024-10-01',
      category: 'Home',
      status: 'active'
    }
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100)
  }

  const getDaysRemaining = (targetDate: string) => {
    const today = new Date()
    const target = new Date(targetDate)
    const diffTime = target.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case 'active':
        return <Badge variant="secondary">Active</Badge>
      case 'paused':
        return <Badge variant="outline">Paused</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const activeGoals = goals.filter(goal => goal.status === 'active')
  const completedGoals = goals.filter(goal => goal.status === 'completed')

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Goals</h1>
          <p className="text-muted-foreground mt-1">
            Set and track your financial goals
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Goal
        </Button>
      </div>

      {/* Goals Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Active Goals</p>
            <p className="text-2xl font-bold">{activeGoals.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Completed Goals</p>
            <p className="text-2xl font-bold">{completedGoals.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <DollarSign className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Total Saved</p>
            <p className="text-2xl font-bold">
              {formatCurrency(goals.reduce((sum, goal) => sum + goal.currentAmount, 0))}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Active Goals */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Active Goals</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {activeGoals.map((goal) => {
            const progress = calculateProgress(goal.currentAmount, goal.targetAmount)
            const daysRemaining = getDaysRemaining(goal.targetDate)
            const monthlyTarget = goal.targetAmount / 12 // Simplified calculation
            
            return (
              <Card key={goal.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      {goal.name}
                    </CardTitle>
                    {getStatusBadge(goal.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{progress.toFixed(1)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{formatCurrency(goal.currentAmount)}</span>
                      <span>{formatCurrency(goal.targetAmount)}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Target Date</p>
                        <p className="text-muted-foreground">
                          {new Date(goal.targetDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Days Left</p>
                        <p className="text-muted-foreground">
                          {daysRemaining > 0 ? `${daysRemaining} days` : 'Overdue'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">Remaining</p>
                        <p className="text-lg font-bold text-blue-600">
                          {formatCurrency(goal.targetAmount - goal.currentAmount)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Suggested monthly</p>
                        <p className="text-sm font-medium">
                          {formatCurrency(monthlyTarget)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Add Funds
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Edit Goal
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Completed Goals */}
      {completedGoals.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Completed Goals</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {completedGoals.map((goal) => (
              <Card key={goal.id} className="border-green-200 bg-green-50/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      {goal.name}
                    </CardTitle>
                    {getStatusBadge(goal.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Goal Amount</p>
                      <p className="text-xl font-bold text-green-600">
                        {formatCurrency(goal.targetAmount)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Completed</p>
                      <p className="text-sm font-medium">
                        {new Date(goal.targetDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Goal Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Goal Setting Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Make it Specific</h4>
              <p className="text-sm text-muted-foreground">
                Set clear, measurable goals with specific amounts and deadlines.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Start Small</h4>
              <p className="text-sm text-muted-foreground">
                Begin with achievable goals to build momentum and confidence.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Automate Savings</h4>
              <p className="text-sm text-muted-foreground">
                Set up automatic transfers to make consistent progress.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Track Progress</h4>
              <p className="text-sm text-muted-foreground">
                Regular check-ins help you stay motivated and on track.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}