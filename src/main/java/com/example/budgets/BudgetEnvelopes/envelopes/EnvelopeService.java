package com.example.budgets.BudgetEnvelopes.envelopes;

import java.util.List;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EnvelopeService {
	
	@Autowired
	private EnvelopeRepository envRepo;
	
	@Autowired
	private TransactionRepository tRepo;
	
	public List<Envelope> listAllEnvelopes () {
		List<Envelope> envs = new ArrayList<>();
		envRepo.findAll().forEach(envs::add);
		return envs;
	}
	
	public List<Transaction> listAllTransactionsForEnvelope (long id) {
		List<Transaction> ts = new ArrayList<>();
		Iterable<Transaction> titer = tRepo.findAll();
		for (Transaction t: titer) {
			if (t.getEnvelope().getId() == id) {
				ts.add(t);
			}
		}
		return ts;
	}
	
	public void addEnv(Envelope env) {
		envRepo.save(env);
	}
	
	public void addTransaction(Transaction t, long id) {
		t.setEnvelope(getEnv(id));
		tRepo.save(t);
		getEnvOfTran(t.getId()).updateBalance(t.getAmount());
		updateEnv(getEnvOfTran(t.getId()));
	}
	
	public Envelope getEnv(long id) {
		return envRepo.findEnvelopeById(id);
	}
	
	public Transaction getTransaction(long tid) {
		return tRepo.findById(tid).get();
	}
	
	public void updateEnv(Envelope env) {
		envRepo.save(env);
	}
	
	public void updateTransaction(Transaction t) {
		double prevAmt = tRepo.findById(t.getId()).get().getAmount();
		if (t.getAmount() != prevAmt) {
			double change = t.getAmount() - prevAmt;
			getEnvOfTran(t.getId()).updateBalance(change);
			updateEnv(getEnvOfTran(t.getId()));
		} else {
			tRepo.save(t);
		}
	}
	
	public void deleteEnv(long id) {
		resetEnv(id);
		envRepo.deleteById(id);
	}
	
	public void deleteTransaction(long tid) {
		Transaction t = tRepo.findById(tid).get();
		getEnvOfTran(tid).updateBalance(t.getAmount() * -1);
		updateEnv(getEnvOfTran(t.getId()));
		tRepo.deleteById(tid);
	}
	
	private Envelope getEnvOfTran (long tid) {
		return tRepo.findById(tid).get().getEnvelope();
	}
	
	//Delete all transactions associated with given envelope and set balance to 0
	public void resetEnv(long id) {
		Iterable<Transaction> titer = tRepo.findAll();
		for (Transaction t: titer) {
			if (t.getEnvelope().getId() == id) {
				deleteTransaction(t.getId());
			}
		}
		getEnv(id).setBalance(0.00);
		updateEnv(getEnv(id));
	}
	
}
