package talan.blockchain.demosecurity.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import talan.blockchain.demosecurity.entities.Employee;

/* on peut ajouter la pagination des données */
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Employee findByUsername(String username);
    int deleteByUsername(String username);

    Employee findFirstById(Long id);

    void deleteById(Long id);
}
