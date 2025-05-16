package ma.enset.backend.repositories;

import ma.enset.backend.entities.BankAccount;
import ma.enset.backend.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BankAccountRepository extends JpaRepository<BankAccount,String> {
}
