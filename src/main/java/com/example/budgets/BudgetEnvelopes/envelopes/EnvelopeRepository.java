package com.example.budgets.BudgetEnvelopes.envelopes;

import org.springframework.data.repository.CrudRepository;

public interface EnvelopeRepository extends CrudRepository<Envelope, Long> { 
	
	public Envelope findEnvelopeById(long id);
}
