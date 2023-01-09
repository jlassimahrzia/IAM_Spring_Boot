package talan.blockchain.demosecurity.services.interfaces;

import talan.blockchain.demosecurity.entities.Employee;
import talan.blockchain.demosecurity.entities.Role;

import java.util.List;

public interface EmployeeService {
    Employee saveEmployee(Employee employee);
    List<Employee> getEmployee();
    Employee updateEmployeeByUsername(String oldUsername, Employee newEmployee);
    int deleteEmployeeByUsername(String username);

    void deleteEmployeeById(Long id);
    Employee assignRole(String username, String roleName);

    Employee getUserByUsername(String username);
}
