import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart3, 
  PieChart, 
  TrendingUp,
  Calendar,
  Download
} from 'lucide-react'

export function Reports() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground mt-1">
            Analyze your spending patterns and financial trends
          </p>
        </div>
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Spending by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              See where your money goes each month
            </p>
            <Badge variant="secondary">Last 30 days</Badge>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Income vs Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Track your financial flow over time
            </p>
            <Badge variant="secondary">Last 6 months</Badge>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-purple-600" />
              Budget Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              How well you're sticking to your budget
            </p>
            <Badge variant="secondary">Current month</Badge>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-orange-600" />
              Monthly Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Identify seasonal spending patterns
            </p>
            <Badge variant="secondary">Last 12 months</Badge>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-red-600" />
              Top Payees
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Your most frequent transaction partners
            </p>
            <Badge variant="secondary">Last 3 months</Badge>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-teal-600" />
              Net Worth Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Monitor your overall financial health
            </p>
            <Badge variant="secondary">All time</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Coming Soon */}
      <Card>
        <CardContent className="p-12 text-center">
          <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Detailed Reports Coming Soon</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            We're working on comprehensive reporting features including interactive charts, 
            custom date ranges, and exportable reports.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}