import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle,
  Target,
  Calendar
} from 'lucide-react'

export function Dashboard() {
  // Mock data - will be replaced with real data later
  const budgetSummary = {
    totalBudgeted: 4500,
    totalSpent: 3200,
    remaining: 1300,
    percentSpent: 71
  }

  const accounts = [
    { name: 'Checking', balance: 2450.50, type: 'checking' },
    { name: 'Savings', balance: 15200.00, type: 'savings' },
    { name: 'Credit Card', balance: -850.25, type: 'credit_card' }
  ]

  const recentTransactions = [
    { id: '1', payee: 'Grocery Store', amount: -85.50, category: 'Food', date: '2024-01-15' },
    { id: '2', payee: 'Gas Station', amount: -45.00, category: 'Transportation', date: '2024-01-14' },
    { id: '3', payee: 'Salary', amount: 3500.00, category: 'Income', date: '2024-01-13' },
    { id: '4', payee: 'Coffee Shop', amount: -12.50, category: 'Food', date: '2024-01-12' }
  ]

  const categoryProgress = [
    { name: 'Food', budgeted: 600, spent: 425, available: 175 },
    { name: 'Transportation', budgeted: 300, spent: 180, available: 120 },
    { name: 'Entertainment', budgeted: 200, spent: 150, available: 50 },
    { name: 'Utilities', budgeted: 250, spent: 245, available: 5 }
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's your budget overview for January 2024.
        </p>
      </div>

      {/* Budget Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budgeted</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(budgetSummary.totalBudgeted)}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(budgetSummary.totalSpent)}</div>
            <p className="text-xs text-muted-foreground">
              {budgetSummary.percentSpent}% of budget
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(budgetSummary.remaining)}
            </div>
            <p className="text-xs text-muted-foreground">Available to budget</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Health</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {budgetSummary.percentSpent < 80 ? 'Good' : budgetSummary.percentSpent < 95 ? 'Fair' : 'Over'}
            </div>
            <Progress value={budgetSummary.percentSpent} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Balances */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Account Balances
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {accounts.map((account, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium">{account.name}</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {account.type.replace('_', ' ')}
                  </p>
                </div>
                <div className={`text-lg font-semibold ${
                  account.balance < 0 ? 'text-red-600' : 'text-foreground'
                }`}>
                  {formatCurrency(account.balance)}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex-1">
                  <p className="font-medium">{transaction.payee}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {transaction.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(transaction.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className={`text-lg font-semibold ${
                  transaction.amount < 0 ? 'text-red-600' : 'text-green-600'
                }`}>
                  {formatCurrency(transaction.amount)}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Category Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Category Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categoryProgress.map((category, index) => {
              const percentSpent = (category.spent / category.budgeted) * 100
              const isOverBudget = category.available < 0
              
              return (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{category.name}</h4>
                    {isOverBudget && (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Spent: {formatCurrency(category.spent)}</span>
                      <span>Budget: {formatCurrency(category.budgeted)}</span>
                    </div>
                    <Progress 
                      value={Math.min(percentSpent, 100)} 
                      className={isOverBudget ? "bg-red-100" : ""}
                    />
                    <div className={`text-sm font-medium ${
                      isOverBudget ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {isOverBudget ? 'Over by ' : 'Available: '}
                      {formatCurrency(Math.abs(category.available))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}