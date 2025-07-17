import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Plus, 
  Edit3, 
  ChevronLeft, 
  ChevronRight,
  DollarSign,
  AlertTriangle
} from 'lucide-react'

export function Budget() {
  const [currentMonth, setCurrentMonth] = useState('2024-01')
  
  // Mock data - will be replaced with real data later
  const budgetData = {
    totalIncome: 5000,
    totalBudgeted: 4500,
    totalActivity: 3200,
    toBeBudgeted: 500
  }

  const categoryGroups = [
    {
      name: 'Immediate Obligations',
      categories: [
        { id: '1', name: 'Rent/Mortgage', budgeted: 1200, activity: 1200, available: 0 },
        { id: '2', name: 'Utilities', budgeted: 250, activity: 245, available: 5 },
        { id: '3', name: 'Phone', budgeted: 80, activity: 75, available: 5 }
      ]
    },
    {
      name: 'True Expenses',
      categories: [
        { id: '4', name: 'Car Maintenance', budgeted: 100, activity: 0, available: 100 },
        { id: '5', name: 'Home Maintenance', budgeted: 150, activity: 85, available: 65 },
        { id: '6', name: 'Medical', budgeted: 200, activity: 120, available: 80 }
      ]
    },
    {
      name: 'Quality of Life',
      categories: [
        { id: '7', name: 'Groceries', budgeted: 600, activity: 425, available: 175 },
        { id: '8', name: 'Dining Out', budgeted: 200, activity: 180, available: 20 },
        { id: '9', name: 'Entertainment', budgeted: 150, activity: 95, available: 55 },
        { id: '10', name: 'Transportation', budgeted: 300, activity: 180, available: 120 }
      ]
    }
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatMonth = (monthStr: string) => {
    const date = new Date(monthStr + '-01')
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    const [year, month] = currentMonth.split('-').map(Number)
    const date = new Date(year, month - 1)
    
    if (direction === 'prev') {
      date.setMonth(date.getMonth() - 1)
    } else {
      date.setMonth(date.getMonth() + 1)
    }
    
    const newMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    setCurrentMonth(newMonth)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Budget</h1>
          <p className="text-muted-foreground mt-1">
            Manage your monthly budget and track spending
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Category
        </Button>
      </div>

      {/* Month Navigation */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-semibold">{formatMonth(currentMonth)}</h2>
            <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Budget Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground">To be Budgeted</p>
              <p className={`text-2xl font-bold ${
                budgetData.toBeBudgeted > 0 ? 'text-green-600' : 
                budgetData.toBeBudgeted < 0 ? 'text-red-600' : 'text-foreground'
              }`}>
                {formatCurrency(budgetData.toBeBudgeted)}
              </p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground">Budgeted</p>
              <p className="text-2xl font-bold">{formatCurrency(budgetData.totalBudgeted)}</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground">Activity</p>
              <p className="text-2xl font-bold text-red-600">
                -{formatCurrency(budgetData.totalActivity)}
              </p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground">Available</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(budgetData.totalBudgeted - budgetData.totalActivity)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Budget Categories */}
      <div className="space-y-6">
        {categoryGroups.map((group, groupIndex) => (
          <Card key={groupIndex}>
            <CardHeader>
              <CardTitle className="text-lg">{group.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Header Row */}
                <div className="grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground border-b pb-2">
                  <div className="col-span-4">Category</div>
                  <div className="col-span-2 text-center">Budgeted</div>
                  <div className="col-span-2 text-center">Activity</div>
                  <div className="col-span-2 text-center">Available</div>
                  <div className="col-span-2 text-center">Actions</div>
                </div>

                {/* Category Rows */}
                {group.categories.map((category) => {
                  const percentSpent = category.budgeted > 0 ? (Math.abs(category.activity) / category.budgeted) * 100 : 0
                  const isOverBudget = category.available < 0
                  
                  return (
                    <div key={category.id} className="grid grid-cols-12 gap-4 items-center py-3 border-b border-muted/50 last:border-b-0">
                      <div className="col-span-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{category.name}</span>
                          {isOverBudget && (
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                        {category.budgeted > 0 && (
                          <Progress 
                            value={Math.min(percentSpent, 100)} 
                            className="mt-2 h-1"
                          />
                        )}
                      </div>
                      
                      <div className="col-span-2 text-center">
                        <Input
                          type="number"
                          value={category.budgeted}
                          className="text-center h-8"
                          step="0.01"
                        />
                      </div>
                      
                      <div className="col-span-2 text-center">
                        <span className={`font-medium ${
                          category.activity < 0 ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {category.activity < 0 ? '-' : ''}
                          {formatCurrency(Math.abs(category.activity))}
                        </span>
                      </div>
                      
                      <div className="col-span-2 text-center">
                        <Badge variant={isOverBudget ? "destructive" : "secondary"}>
                          {formatCurrency(category.available)}
                        </Badge>
                      </div>
                      
                      <div className="col-span-2 text-center">
                        <Button variant="ghost" size="sm">
                          <Edit3 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Quick Budget Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Plus className="h-5 w-5" />
              Add Income
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Plus className="h-5 w-5" />
              Add Category
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Edit3 className="h-5 w-5" />
              Budget Template
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}