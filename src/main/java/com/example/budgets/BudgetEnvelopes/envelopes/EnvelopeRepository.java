package com.example.budgets.BudgetEnvelopes.envelopes;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EnvelopeRepository extends JpaRepository<Envelope, Long> { 
	
	public Envelope findEnvelopeById(long id);
}
