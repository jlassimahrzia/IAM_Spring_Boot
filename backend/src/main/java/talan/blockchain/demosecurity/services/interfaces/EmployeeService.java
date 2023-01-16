package talan.blockchain.demosecurity.services.interfaces;

import talan.blockchain.demosecurity.DTO.UpdateUserInfoDTO;
import talan.blockchain.demosecurity.entities.Employee;
import talan.blockchain.demosecurity.entities.Role;

import java.util.List;

public interface EmployeeService {
    Employee saveEmployee(Employee employee);
    List<Employee> getEmployee();
    Employee changeEmployeePassword(String username, String newPassword);

    Employee UpdateEmployeeInfo(UpdateUserInfoDTO updateUserInfoDTO);
    int deleteEmployeeByUsername(String username);

    void deleteEmployeeById(Long id);
    Employee assignRole(String username, String roleName);

    Employee rejectRole(String username, String roleName);

    Employee getUserByUsername(String username);
}
