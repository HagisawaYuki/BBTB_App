
//ログインユーザのBBTB情報の型
export type BBTB = {
    banks: BankJson[]
}
//ログインユーザの銀行情報の型（Json）
export type BankJson = {
    id: number;
	name: string;
	bank_name: string;
	Balance: number;
	credit_cards: CreditCardJson[];
    salaries: SalaryJson[];
}
//ログインユーザのクレカ支払い情報の型（Json）
export type SalaryJson = {
    id: number;
    name: string;
	year: number;
	month: number;
	day: number;
	amount: number;
}
//ログインユーザのクレカ情報の型（Json）
export type CreditCardJson = {
    id: number;
	name: string;
	credit_card_payments: CreditCardPaymentJson[];
}
//ログインユーザのクレカ支払い情報の型（Json）
export type CreditCardPaymentJson = {
    id: number;
	year: number;
	month: number;
	day: number;
	amount: number;
}

//クレカ支払い金額・支出・収入・収支・残金合計の値をまとめる型
export type CalMoney = {
    creditCardAmount: number,
    salaryAmount: number,
    expenditure: number,
    income: number,
    balance: number,
    cash: number,
    bankTotal: number,
    total: number
};
//銀行ページで表示するお金の値をまとめる型
export type CalBankMoney = {
    creditCardAmount: number,
    salaryAmount: number,
    expenditure: number,
    income: number,
    balance: number,
    total: number,
    nextMonthTotal: number
}
//クレカページで表示するお金の値をまとめる型
export type CalCreditCardMoney = {
    thisMonth: {
        year: number,
        month: number,
        day: number,
        amount: number
    },
    nextMonth: {
        year: number,
        month: number,
        day: number,
        amount: number
    }
}
//銀行情報をまとめる型
export type Bank = {
    id: number
    name: string
    bank_name: string
    balance: number
};
//クレカ情報をまとめる型
export type CreditCard = {
    id: number,
    name: string,
    bankID: number
}
//月当たりの給料情報
export type MonthSalary = {
    id: number,
    name: string,
    month: number,
    day: number,
    amount: number
}
//年あたりの給料情報
export type YearSalary = {
    year: number,
    salaries: MonthSalary[]
}
//給料情報が時系列にソートされた型
export type SortSalaries = YearSalary[];
//給料情報をまとめる型
export type Salary = {
    id: number,
    name: string,
    year: number,
    month: number,
    day: number,
    amount: number,
    bankID: number
}
//クレカ支払い情報をまとめる型
export type CreditCardPayment = {
    id: number,
    year: number,
    month: number,
    day: number,
    amount: number,
    creditCardID: number
}
//月当たりのクレカ支払い情報
export type MonthCreditCardPayment = {
    id: number,
    month: number,
    day: number,
    amount: number
}
//年あたりのクレカ支払い情報
export type YearCreditCardPayment = {
    year: number,
    payments: MonthCreditCardPayment[]
}
//クレカ支払い情報が時系列にソートされた型
export type SortCreditCardPayments = YearCreditCardPayment[];

//編集フォームの型(SpringBoot側に渡す値の型)
//銀行
export type EditBankFormData = {
    id: number;
    name: string;
    bank_name: string;
    balance: number;
}
//クレカ
export type EditCreditCardFormData = {
    id: number;
    name: string;
    bankID: number;
}
//クレカ
export type EditSalaryFormData = {
    id: number;
    name: string;
    year: number;
    month: number;
    day: number;
    amount: number;
    bankID: number;
}
//クレカ支払い
export type EditCreditCardPaymentFormData = {
    id: number;
    year: number;
    month: number;
    day: number;
    amount: number;
    creditCardID: number;
}

//編集フォーム入力値と外部キーの型(入力フォームの型)
//銀行
export type EditBankFormInputs = {
    name: string;
    bank_name: string;
    balance: number;
}
//クレカ
export type EditCreditCardFormInputs = {
    name: string;
    bankID: number;
}
//給料
export type EditSalaryFormInputs = {
    name: string;
    year: number;
    month: number;
    day: number;
    amount: number;
    bankID: number;
}
//クレカ支払い
export type EditCreditCardPaymentFormInputs = {
    year: number;
    month: number;
    day: number;
    amount: number;
    creditCardID: number;
}

//新規作成フォーム入力値と外部キーの型(入力フォームの型)
//銀行
export type CreateBankFormInputs = {
    name: string;
    bank_name: string;
    balance: number;
}
//クレカ
export type CreateCreditCardFormInputs = {
    name: string;
    bankID: number;
}
//給料
export type CreateSalaryFormInputs = {
    name: string;
    year: number;
    month: number;
    day: number;
    amount: number;
    bankID: number;
}
//クレカ支払い
export type CreateCreditCardPaymentFormInputs = {
    year: number;
    month: number;
    day: number;
    amount: number;
    creditCardID: number;
}

//新規作成にてspringboot側から返ってくるレスポンス値の型
//銀行
export type CreateBankResponse = {
    isRegister: boolean;
    errorMessage: string;
}
//クレカ
export type CreateCreditCardResponse = {
    isRegister: boolean;
    errorMessage: string;
}
//給料
export type CreateSalaryResponse = {
    isRegister: boolean;
    errorMessage: string;
}
//クレカ支払い
export type CreateCreditCardPaymentResponse = {
    isRegister: boolean;
    errorMessage: string;
}

//編集にてspringboot側から返ってくるレスポンス値の型
//銀行
export type EditBankResponse = {
    isEdit: boolean;
    errorMessage: string;
}

//給料
export type EditSalaryResponse = {
    isEdit: boolean;
    errorMessage: string;
}

//クレカ
export type EditCreditCardResponse = {
    isEdit: boolean;
    errorMessage: string;
}
//クレカ支払い
export type EditCreditCardPaymentResponse = {
    isEdit: boolean;
    errorMessage: string;
}

//ログアウト
export type LogoutResponse = {
    isLogout: boolean;
}


