package com.example.budgets.BudgetEnvelopes.envelopes;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Envelope {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String envelopeName;
	private Double balance;
	
	public Envelope() {
		
	}
	
	public Envelope(long id, String EnvelopeName, Double balance) {
		this.id = id;
		this.envelopeName = EnvelopeName;
		this.balance=balance;
	}
	
	public Double getBalance() {
		return balance;
	}

	public void setBalance(Double balance) {
		this.balance = balance;
	}

	public Long getId() {
		return id;
	}
	
	public void setId(long id) {
		this.id = id;
	}
	
	public String getEnvelopeName() {
		return envelopeName;
	}
	
	public void setEnvelopeName(String envelopeName) {
		this.envelopeName = envelopeName;
	}
	
	public void updateBalance(Double amt) {
		balance += amt;
	}
}
