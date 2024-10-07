import { Bank, BankJson, BBTB, CalBankMoney, CalCreditCardMoney, CalMoney, CreditCard, CreditCardJson, CreditCardPayment, CreditCardPaymentJson, Salary, SalaryJson, SortCreditCardPayments, SortSalaries, YearCreditCardPayment, YearSalary } from "@/constant/typeConst";


/**
 * 銀行に関して 
 */
//BBTBから銀行情報のみを配列にする関数
export const createBanksInfo = (BBTB: any): Bank[] => {
    const returnBanks = BBTB.banks.map(({ id, name, bank_name, balance }: Bank) => ({ id, name, bank_name, balance }));
    return returnBanks;
}



/**
 * クレカに関して 
 */
//BBTBからクレカ情報のみを配列にする関数
export const createCreditCardsInfo = (BBTB: any): CreditCard[]=> {
    
    const creditCards2D = BBTB.banks && BBTB.banks.map((bank: any) => 
        bank.credit_cards.map(({ id, name}: any) => ({ id, name})));
    const returnCreditCards = creditCards2D.flat();
    return returnCreditCards;
}

//BBTBからクレカJSON情報を配列にする関数
export const createCreditCardsJson = (BBTB: BBTB): CreditCardJson[] => {
    const creditCards2D = BBTB.banks && BBTB.banks.map((bank: BankJson) => 
        bank.credit_cards.map(({id, name, credit_card_payments}: CreditCardJson) => ({id, name, credit_card_payments})));
    const returnCreditCards = creditCards2D.flat();
    return returnCreditCards;
}




/**
 * クレカ支払いに関して
 */
//bankからクレカ支払い情報のみを配列にする関数
export const createSalariesInfoByBank = (bank: any): Salary[] => {
    const salaries2D = bank.salaries.map(({ id, name, year, month, day, amount}: any) => ({ id, name, year, month, day, amount}));
    const returnSalaries = salaries2D.flat();
    return returnSalaries;
}

//BBTBからクレカ支払い情報のみを配列にする関数
export const createCreditCardPaymentsInfo = (BBTB: BBTB): CreditCardPayment[] => {
    const creditCardPayments3D = BBTB.banks.map((bank: any) => 
        createCreditCardPaymentsInfoByBank(bank)
    );
    const returnCreditCardPayments = creditCardPayments3D.flat().flat();
    return returnCreditCardPayments;
}

//bankからクレカ支払い情報のみを配列にする関数
export const createCreditCardPaymentsInfoByBank = (bank: BankJson): CreditCardPayment[] => {
    const creditCardPayments2D = bank.credit_cards.map((card: CreditCardJson) => 
        createCreditCardPaymentsInfoByCreditCard(card)
    );
    const returnCreditCardPayments = creditCardPayments2D.flat();
    return returnCreditCardPayments;
}
//cardからクレカ支払い情報のみを配列にする関数
export const createCreditCardPaymentsInfoByCreditCard = (card: any) => {
    const creditCardPayments = card.credit_card_payments.map(
        ({ id, year, month, day, amount }: any) => ({ id, year, month, day, amount })
    );
    return creditCardPayments;
}

//cardから今月のクレカ支払い情報を返す関数
export const monthCreditCardPaymentByCreditCard = (card: any, year: number, month: number): any => {
    const creditCardPayments = createCreditCardPaymentsInfoByCreditCard(card);
    let returnPayment = undefined;
    creditCardPayments.forEach((payment: any) => {
        if(payment.year === year && payment.month === month){
            returnPayment = payment;
        }
    });
    return returnPayment;
}

//今月のクレカ支払い情報から支払い金額を返す関数
export const amountBymonthCreditCardPayment = (card: any, year: number, month: number): number => {
    const monthCreditCardPayment = monthCreditCardPaymentByCreditCard(card, year, month);
    // console.log(monthCreditCardPayment)
    if(monthCreditCardPayment !== undefined){
        return monthCreditCardPayment.amount;
    }else{
        return 0;
    }
}

//今月と来月のクレカ支払い日・額を返す関数
export const calCreditCardMoney = (payments: any, year: number, month: number): CalCreditCardMoney => {
    let calCreditCardMoney: CalCreditCardMoney;
    let thisMonth: {year: number, month: number, day: number, amount: number} = {year: 0, month: 0, day: 0, amount: 0};
    let nextMonth: {year: number, month: number, day: number, amount: number} = {year: 0, month: 0, day: 0, amount: 0};;
    payments.forEach((payment: any) => {
        if(payment.year === year && payment.month === month){
            thisMonth = {year: payment.year, month: payment.month, day: payment.day, amount: payment.amount};
        }else if(month === 12 && payment.month === 1 && payment.year === year + 1){
            nextMonth = {year: payment.year, month: payment.month, day: payment.day, amount: payment.amount};
        }else if(payment.year === year && payment.month === month + 1){
            nextMonth = {year: payment.year, month: payment.month, day: payment.day, amount: payment.amount};
        }
    });
    calCreditCardMoney = {
        thisMonth: thisMonth,
        nextMonth: nextMonth
    }
    return calCreditCardMoney;
}

//クレカ支払い一覧を時系列にソートする関数
export const sortCreditCardPayments = (payments: any, year: number, month: number): SortCreditCardPayments => {

    //年ごとにクレカ支払い情報を配列化
    const beforeSortCreditCardPayments: SortCreditCardPayments = new Array();
    for(let i = 0; i <= year - mostMinYear(payments); i++){
        let beforeYearCreditCardPayment: YearCreditCardPayment = {year: year - i, payments: []};
        payments.forEach((payment: any) => {
            if(payment.year === year - i){
                beforeYearCreditCardPayment.payments.push({id: payment.id, month: payment.month, day: payment.day, amount: payment.amount});
            }
        });
        beforeSortCreditCardPayments.push(beforeYearCreditCardPayment);
    }
    //上で作った配列の年ごとの中にある月ごとのクレカ支払い情報をソートする
    const afterSortCreditCardPayments: SortCreditCardPayments = new Array();
    beforeSortCreditCardPayments.forEach((beforeYearCreditCardPayment, i) => {
        let refMonth;
        if(i === 0){
            refMonth = month;
        }else{
            refMonth = 12;
        }
        let afterYearCreditCardPayment: YearCreditCardPayment = {year: year - i, payments: []};
        for(let j = refMonth; j >= 1; j--){
            beforeYearCreditCardPayment.payments.forEach((payment, k) => {
                if(payment.month === j){
                    afterYearCreditCardPayment.payments.push({id: payment.id, month: payment.month, day: payment.day, amount: payment.amount});
                }
            })
        }
        afterSortCreditCardPayments.push(afterYearCreditCardPayment);
    });
    return afterSortCreditCardPayments;
}


/**
 * 給料に関して 
 */
//BBTBから給料情報のみを配列にする関数
export const createSalariesInfo = (BBTB: BBTB): Salary[]=> {
    console.log(BBTB)
    const salaries2D = BBTB.banks && BBTB.banks.map((bank: any) => 
        bank.salaries && bank.salaries.map(({ id, name, year, month, day, amount}: any) => ({ id, name, year, month, day, amount})));
    const returnSalaries = salaries2D.flat();
    return returnSalaries;
}

//給料一覧を時系列にソートする関数
export const sortSalaries = (salaries: SalaryJson[], year: number, month: number): SortSalaries => {

    //年ごとにクレカ支払い情報を配列化
    const beforeSortSalaries: SortSalaries = new Array();
    for(let i = 0; i <= year - mostMinYear(salaries); i++){
        let beforeYearSalary: YearSalary = {year: year - i, salaries: []};
        salaries.forEach((salary: any) => {
            if(salary.year === year - i){
                beforeYearSalary.salaries.push({id: salary.id, name: salary.name, month: salary.month, day: salary.day, amount: salary.amount});
            }
        });
        beforeSortSalaries.push(beforeYearSalary);
    }
    //上で作った配列の年ごとの中にある月ごとのクレカ支払い情報をソートする
    const afterSortSalaries: SortSalaries = new Array();
    beforeSortSalaries.forEach((beforeYearSalary, i) => {
        let refMonth;
        if(i === 0){
            refMonth = month;
        }else{
            refMonth = 12;
        }
        let afterYearSalary: YearSalary = {year: year - i, salaries: []};
        for(let j = refMonth; j >= 1; j--){
            beforeYearSalary.salaries.forEach((salary) => {
                if(salary.month === j){
                    afterYearSalary.salaries.push({id: salary.id, name: salary.name, month: salary.month, day: salary.day, amount: salary.amount});
                }
            })
        }
        afterSortSalaries.push(afterYearSalary);
    });
    return afterSortSalaries;
}



/**
 * home画面などで表示するさまざまなお金に関して 
 */
//月のクレカ支払い合計を計算する関数
export const calCreditCardAmount = (creditCardPayments: CreditCardPayment[], year: number, month: number): number => {
    let amount = 0;
    creditCardPayments.forEach((payment: CreditCardPayment) => {
        if(payment.year === year && payment.month === month){
            amount += payment.amount;
        }
    })
    return amount;
}
//月のクレカ支払い合計を計算する関数
export const calSalaryAmount = (salaries: Salary[], year: number, month: number): number => {
    let amount = 0;
    salaries.forEach((salary: Salary) => {
        if(salary.year === year && salary.month === month){
            amount += salary.amount;
        }
    })
    return amount;
}

//支出を計算する関数
export const calExpenditure = (creditCardAmount: number): number => {
    let expenditure = 0;
    //支出の合計を計算（現段階ではクレカ支払いのみ）
    expenditure -= creditCardAmount;
    return expenditure;
}

//収入を計算する関数
export const calIncome = (salary: number): number => {
    let income = 0;
    //収入の合計を計算（現段階では給料のみ）
    income += salary;
    return income;
}

//収支を計算する関数
export const calBalance = (exp: number, inc: number): number => {

    return exp + inc;
}

//銀行の合計残金を計算する関数
export const calBankTotal = (banks: Bank[]): number => {
    let total = 0;
    banks.forEach((bank: Bank) => {
        total += bank.balance;
    });
    return total;
}

//残額合計を計算する関数
export const calTotal = (bankTotal: number, cash: number): number => {
    let total = cash + bankTotal;
    return total;
}

//ホームページのさまざまなお金を計算する関数
export const calculationMoney = (BBTB: any, cash: number, year: number, month: number): CalMoney => {
    const banks = createBanksInfo(BBTB);
    //const creditCards = createCreditCardsInfo(BBTB);
    const creditCardPayments = createCreditCardPaymentsInfo(BBTB);
    const creditCardAmount = calCreditCardAmount(creditCardPayments, year, month);
    const salaries = createSalariesInfo(BBTB);
    console.log(salaries)
    const salaryAmount = calSalaryAmount(salaries, year, month);
    const expenditure = calExpenditure(creditCardAmount);
    const income = calIncome(salaryAmount);
    const balance = calBalance(expenditure, income);
    const bankTotal = calBankTotal(banks);
    const total = calTotal(bankTotal, cash);
    const returnCalMoney: CalMoney = {
        creditCardAmount: creditCardAmount,
        salaryAmount: salaryAmount,
        expenditure: expenditure,
        income: income,
        balance: balance,
        cash: cash,
        bankTotal: bankTotal,
        total: total
    };
    return returnCalMoney;
}

//銀行ページのさまざまなお金を計算する関数
export const calBankMoney = (bank: any, year: number, month: number): CalBankMoney => {

    const creditCardPayments = createCreditCardPaymentsInfoByBank(bank);
    const creditCardAmount = calCreditCardAmount(creditCardPayments, year, month);
    const salaries = createSalariesInfoByBank(bank);
    const salaryAmount = calSalaryAmount(salaries, year, month);
    const expenditure = calExpenditure(creditCardAmount);
    const income = calIncome(salaryAmount);
    const balance = calBalance(expenditure, income);
    const total = bank.balance;
    const nextMonthTotal = total + balance;
    
    const returnCalMoney: CalBankMoney = {
        creditCardAmount: creditCardAmount,
        salaryAmount: salaryAmount,
        expenditure: expenditure,
        income: income,
        balance: balance,
        total: total,
        nextMonthTotal: nextMonthTotal
    };
    return returnCalMoney;
}


/**
 * その他便利な関数 
 */
//配列の中から一番小さい年数を探す関数
export const mostMinYear = (array: any[]) => {
    let min = array[0].year;
    array.forEach(item => {
        if(min > item.year){
            min = item.year;
        }
    });
    return min;
}

//西暦と月の値からその月の日数を配列で返す関数
export const calDaysByYearAndMonth = (year: number, month: number): number[] => {

    let days: number[] = [];
    year = Number(year);
    month = Number(month);
    
    if(month === 1
         || month === 3
          || month === 5
           || month === 7
            || month === 8
             || month === 10
              || month === 12){
        for(let i = 1; i <= 31; i++){
            
            days.push(i);
        }
    }else if(month === 4
        || month === 6
        || month === 9
        || month === 11){
        for(let i = 1; i <= 30; i++){
            
            days.push(i);
        }
    }else if(month === 2){
        if(year % 4 === 0){
            for(let i = 1; i <= 29; i++){
                days.push(i);
            }
        }else{
            for(let i = 1; i <= 28; i++){
                days.push(i);
            }
        }
    }else{
        for(let i = 1; i <= 30; i++){
            days.push(i);
        }
    }
    return days;

}





