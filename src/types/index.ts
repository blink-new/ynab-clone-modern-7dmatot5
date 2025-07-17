export interface Account {
  id: string
  user_id: string
  name: string
  type: 'checking' | 'savings' | 'credit_card' | 'investment'
  balance: number
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  user_id: string
  name: string
  group_name: string
  budgeted: number
  activity: number
  available: number
  created_at: string
  updated_at: string
}

export interface Transaction {
  id: string
  user_id: string
  account_id: string
  category_id?: string
  payee: string
  memo?: string
  amount: number
  date: string
  cleared: 'cleared' | 'uncleared' | 'reconciled'
  created_at: string
  updated_at: string
}

export interface Goal {
  id: string
  user_id: string
  category_id: string
  name: string
  target_amount: number
  target_date?: string
  current_amount: number
  created_at: string
  updated_at: string
}

export interface BudgetMonth {
  id: string
  user_id: string
  month: string // YYYY-MM format
  category_id: string
  budgeted: number
  activity: number
  available: number
  created_at: string
  updated_at: string
}