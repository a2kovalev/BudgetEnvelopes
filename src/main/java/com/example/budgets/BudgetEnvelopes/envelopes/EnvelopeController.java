package com.example.budgets.BudgetEnvelopes.envelopes;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EnvelopeController {
	
	@Autowired
	private EnvelopeService envService;
	
	@GetMapping("/api/envelopes")
	public List<Envelope> getAllEnvs() {
		return envService.listAllEnvelopes();
	}
	
	@GetMapping("/api/envelopes/transactions")
	public List<Transaction> getAllTransactions() {
		return envService.listAllTransactions();
	}
	
	@GetMapping("/api/envelopes/{id}")
	public Envelope getEnv(@PathVariable long id) {
		return envService.getEnv(id);
	}
	
	@PostMapping("/api/envelopes")
	public void addNewEnv(@RequestBody Envelope env) {
		envService.addEnv(env);
	}
	
	@PutMapping("/api/envelopes")
	public void updateEnv(@RequestBody Envelope env) {
		envService.updateEnv(env);
	}
	
	@DeleteMapping("/api/envelopes/{id}")
	public void removeEnv(@PathVariable long id) {
		envService.deleteEnv(id);
	}
	
	@PostMapping("/api/envelopes/{id}/transactions")
	public void addNewTransaction(@RequestBody Transaction t, @PathVariable long id) {
		envService.addTransaction(t, id);
	}
	
	@GetMapping("/api/envelopes/{id}/transactions/{tid}") 
	public Transaction getTransaction(@PathVariable long tid) {
		return envService.getTransaction(tid);
	}
	
	@DeleteMapping("/api/envleopes/{id}/transactions/{tid}")
	public void removeTransaction(@PathVariable long tid) {
		envService.deleteTransaction(tid);
	}
	
	@PutMapping("/api/envelopes/{id}/transactions")
	public void updateTransaction(@RequestBody Transaction t) {
		envService.updateTransaction(t);
	}
	
	@GetMapping("/api/envelopes/{id}/transactions")
	public List<Transaction> getAllTransactionsForEnv(@PathVariable long id) {
		return envService.listAllTransactionsForEnvelope(id);
	}
	
	@DeleteMapping("/api/envelopes/{id}/reset")
	public void resetEnvelope (@PathVariable long id) {
		envService.resetEnv(id);
	}
}
