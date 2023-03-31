package com.example.budgets.BudgetEnvelopes.envelopes;

import org.springframework.data.repository.CrudRepository;

public interface TransactionRepository extends CrudRepository<Transaction, Long> {

}
