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
	
	public List<Transaction> listAllTransactions () {
		List<Transaction> ts = new ArrayList<>();
		tRepo.findAll().forEach(ts::add);
		return ts;
	}
	
	public List<Transaction> listAllTransactionsForEnvelope (long id) {
		List<Transaction> ts = new ArrayList<>();
		Iterable<Transaction> titer = tRepo.findAll();
		for (Transaction t: titer) {
			if (t.getEnvelope() == null) {
				tRepo.delete(t);
			} else {
				if (t.getEnvelope().getId() == id) {
					ts.add(t);
				}
			}
		}
		return ts;
	}
	
	public void addEnv(Envelope env) {
		envRepo.save(env);
	}
	
	public void addTransaction(Transaction t, long id) {
		t.setEnvelope(getEnv(id));
		t.setDate();
		tRepo.save(t);
		Envelope prev = getEnvOfTran(t.getId());
		prev.updateBalance(t.getAmount());
		updateEnv(prev.getId(), prev);
	}
	
	public Envelope getEnv(long id) {
		return envRepo.findEnvelopeById(id);
	}
	
	public Transaction getTransaction(long tid) {
		return tRepo.findTransactionById(tid);
	}
	
	public void updateEnv(long id, Envelope env) {
		Envelope prevEnv = getEnv(id);
		prevEnv.setBalance(env.getBalance());
		prevEnv.setEnvelopeName(env.getEnvelopeName());
		envRepo.save(prevEnv);
	}
	
	public void updateTransaction(long tid, Transaction t) {
		Transaction prevTrans = getTransaction(tid);
		double prevAmt = prevTrans.getAmount();
		prevTrans.setAmount(t.getAmount());
		prevTrans.setNote(t.getNote());
		prevTrans.setName(t.getName());
		prevTrans.setCur(t.getCur());
		System.out.println("Prev ID: " + prevTrans.getId());
		tRepo.save(prevTrans);
		if (t.getAmount() != prevAmt) {
			double change = t.getAmount() - prevAmt;
			Envelope prev = getEnvOfTran(t.getId());
			prev.updateBalance(change);
			updateEnv(prev.getId(), prev);
		}
	}
	
	public void deleteEnv(long id) {
		resetEnv(id);
		envRepo.deleteById(id);
	}
	
	public void deleteTransaction(long tid) {
		Transaction t = tRepo.findById(tid).get();
		Envelope prev = getEnvOfTran(tid);
		prev.updateBalance(t.getAmount() * -1);
		updateEnv(prev.getId(), prev);
		tRepo.deleteById(tid);
	}
	
	private Envelope getEnvOfTran (long tid) {
		return tRepo.findById(tid).get().getEnvelope();
	}
	
	//Delete all transactions associated with given envelope and set balance to 0
	public void resetEnv(long id) {
		Iterable<Transaction> titer = tRepo.findAll();
		for (Transaction t: titer) {
			if (t.getEnvelope() == null) {
				tRepo.delete(t);
			} else {
				if (t.getEnvelope().getId() == id) {
					deleteTransaction(t.getId());
				}
			}
		}
		Envelope prev = getEnv(id);
		prev.setBalance(0.00);
		updateEnv(prev.getId(), prev);
	}
	
}
