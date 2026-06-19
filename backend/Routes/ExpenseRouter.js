const { fetchExpenses, addExpenses, deleteExpense } = require('../Controllers/ExpenseController');

const router = require('express').Router();


// fetch all the expenses of user based on user based on user_id
router.get('/', fetchExpenses);

//add expense
router.post('/', addExpenses);

//delete expense
router.delete('/:expenseId', deleteExpense);

module.exports = router;