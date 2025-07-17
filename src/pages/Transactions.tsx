import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  Plus, 
  Search, 
  Filter,
  Download,
  Upload,
  Check,
  Clock,
  AlertCircle
} from 'lucide-react'

export function Transactions() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedAccount, setSelectedAccount] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Mock data - will be replaced with real data later
  const accounts = [
    { id: '1', name: 'Checking Account' },
    { id: '2', name: 'Savings Account' },
    { id: '3', name: 'Credit Card' }
  ]

  const categories = [
    { id: '1', name: 'Groceries' },
    { id: '2', name: 'Transportation' },
    { id: '3', name: 'Entertainment' },
    { id: '4', name: 'Utilities' },
    { id: '5', name: 'Income' }
  ]

  const transactions = [
    {
      id: '1',
      date: '2024-01-15',
      payee: 'Whole Foods Market',
      category: 'Groceries',
      account: 'Checking Account',
      amount: -125.50,
      cleared: 'cleared',
      memo: 'Weekly grocery shopping'
    },
    {
      id: '2',
      date: '2024-01-15',
      payee: 'Shell Gas Station',
      category: 'Transportation',
      account: 'Credit Card',
      amount: -45.00,
      cleared: 'uncleared',
      memo: 'Gas fill-up'
    },
    {
      id: '3',
      date: '2024-01-14',
      payee: 'Netflix',
      category: 'Entertainment',
      account: 'Checking Account',
      amount: -15.99,
      cleared: 'cleared',
      memo: 'Monthly subscription'
    },
    {
      id: '4',
      date: '2024-01-13',
      payee: 'Acme Corp',
      category: 'Income',
      account: 'Checking Account',
      amount: 3500.00,
      cleared: 'cleared',
      memo: 'Salary deposit'
    },
    {
      id: '5',
      date: '2024-01-12',
      payee: 'Electric Company',
      category: 'Utilities',
      account: 'Checking Account',
      amount: -89.50,
      cleared: 'reconciled',
      memo: 'Monthly electric bill'
    },
    {
      id: '6',
      date: '2024-01-12',
      payee: 'Coffee Shop',
      category: 'Entertainment',
      account: 'Credit Card',
      amount: -12.50,
      cleared: 'uncleared',
      memo: 'Morning coffee'
    },
    {
      id: '7',
      date: '2024-01-11',
      payee: 'Target',
      category: 'Groceries',
      account: 'Checking Account',
      amount: -67.25,
      cleared: 'cleared',
      memo: 'Household items'
    },
    {
      id: '8',
      date: '2024-01-10',
      payee: 'Uber',
      category: 'Transportation',
      account: 'Credit Card',
      amount: -18.75,
      cleared: 'uncleared',
      memo: 'Ride to airport'
    }
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const getClearedIcon = (status: string) => {
    switch (status) {
      case 'cleared':
        return <Check className="h-4 w-4 text-green-600" />
      case 'reconciled':
        return <Check className="h-4 w-4 text-blue-600" />
      case 'uncleared':
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />
    }
  }

  const getClearedBadge = (status: string) => {
    switch (status) {
      case 'cleared':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Cleared</Badge>
      case 'reconciled':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Reconciled</Badge>
      case 'uncleared':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.payee.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.memo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesAccount = selectedAccount === 'all' || transaction.account === selectedAccount
    const matchesCategory = selectedCategory === 'all' || transaction.category === selectedCategory
    
    return matchesSearch && matchesAccount && matchesCategory
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Transactions</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage all your financial transactions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Upload className="h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Transaction
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={selectedAccount} onValueChange={setSelectedAccount}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="All Accounts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Accounts</SelectItem>
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.name}>
                    {account.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Recent Transactions ({filteredTransactions.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Payee</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead>Memo</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id} className="hover:bg-muted/50">
                    <TableCell>
                      {getClearedIcon(transaction.cleared)}
                    </TableCell>
                    <TableCell className="font-medium">
                      {new Date(transaction.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{transaction.payee}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{transaction.category}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {transaction.account}
                    </TableCell>
                    <TableCell className="text-muted-foreground max-w-48 truncate">
                      {transaction.memo}
                    </TableCell>
                    <TableCell className={`text-right font-semibold ${
                      transaction.amount < 0 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {formatCurrency(transaction.amount)}
                    </TableCell>
                    <TableCell>
                      {getClearedBadge(transaction.cleared)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No transactions found matching your criteria.</p>
              <Button className="mt-4 gap-2">
                <Plus className="h-4 w-4" />
                Add Your First Transaction
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground">Total Income</p>
            <p className="text-2xl font-bold text-green-600">
              {formatCurrency(
                filteredTransactions
                  .filter(t => t.amount > 0)
                  .reduce((sum, t) => sum + t.amount, 0)
              )}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground">Total Expenses</p>
            <p className="text-2xl font-bold text-red-600">
              {formatCurrency(
                Math.abs(filteredTransactions
                  .filter(t => t.amount < 0)
                  .reduce((sum, t) => sum + t.amount, 0))
              )}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground">Net Flow</p>
            <p className={`text-2xl font-bold ${
              filteredTransactions.reduce((sum, t) => sum + t.amount, 0) >= 0 
                ? 'text-green-600' 
                : 'text-red-600'
            }`}>
              {formatCurrency(
                filteredTransactions.reduce((sum, t) => sum + t.amount, 0)
              )}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}