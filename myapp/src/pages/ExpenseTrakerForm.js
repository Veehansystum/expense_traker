import React, { useState } from 'react'
import { handleError } from '../utils';

function ExpenseTrakerForm({ addExpenses }) {
    const [expenseInfo, setExpenseInfo] = useState({ text: "", amount: "" })
    const handleChange = (e) => {
        const { name, value } = e.target;
        //console.log(name, value)
        const copyExpenseInfo = { ...expenseInfo };
        copyExpenseInfo[name] = value;
        setExpenseInfo(copyExpenseInfo);

    }

    const handleExpense = (e) => {
        e.preventDefault();
        const { text, amount } = expenseInfo;
        if (!text || !amount) {
            handleError('All fields are requird')
            return;
        }

        console.log(expenseInfo)
        setTimeout(() => {
            setExpenseInfo({ text: '', amount: '' })
        }, 1000)
        addExpenses(expenseInfo);
    }

    return (
        <div>
            <div className='container'>
                <h1>Expense Traker</h1>
                <form action="" onSubmit={handleExpense}>
                    <div className="">
                        <label htmlFor="">Expense Description</label>
                        <input type="text" name='text'
                            onChange={handleChange}
                            autoFocus
                            placeholder='Enter your Expense Description...'
                            value={expenseInfo.text} />
                    </div>
                    <div className="">
                        <label htmlFor="amount">Amount</label>
                        <input type='number'
                            name='amount'
                            onChange={handleChange}
                            autoFocus
                            placeholder='Enter your Amount, Expense(-ve) Income (+ve)...'
                            value={expenseInfo.amount}
                        />
                    </div>
                    <button>Add Amount</button>

                </form>

            </div>
        </div>
    )
}

export default ExpenseTrakerForm