package com.example.budgets.BudgetEnvelopes.envelopes;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
	
	public Transaction findTransactionById(long id);
}
