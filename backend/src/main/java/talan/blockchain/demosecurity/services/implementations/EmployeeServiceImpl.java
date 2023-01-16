package talan.blockchain.demosecurity.services.implementations;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import talan.blockchain.demosecurity.DTO.UpdateUserInfoDTO;
import talan.blockchain.demosecurity.dao.EmployeeRepository;
import talan.blockchain.demosecurity.dao.RoleRepository;
import talan.blockchain.demosecurity.entities.Employee;
import talan.blockchain.demosecurity.entities.Role;
import talan.blockchain.demosecurity.services.interfaces.EmployeeService;

import java.util.List;
@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final RoleRepository roleRepository;

    @Autowired
    private BCryptPasswordEncoder encoder;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository, RoleRepository roleRepository) {
        this.employeeRepository = employeeRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public Employee saveEmployee(Employee employee) {
        Employee employee1;
        employee1 = employeeRepository.findByUsername(employee.getUsername());
        if(employee1 == null){
            employee.setId(null); /* pour ne pas accepter la valeur, c charger au BD*/
            employee.setPassword(encoder.encode(employee.getPassword()));
            employee1 = employeeRepository.save(employee);
        }
        return employee1;
    }

    @Override
    public List<Employee> getEmployee() {
        return employeeRepository.findAll();
    }

    @Override
    public Employee changeEmployeePassword(String username, String newPassword) {
        Employee employee = employeeRepository.findByUsername(username);
        if(employee!= null) {
            if (employee.getPassword() != null) {
                    employee.setPassword(encoder.encode(newPassword));
                    return employeeRepository.save(employee);
            }
        }
        return null;
    }

    @Override
    public Employee UpdateEmployeeInfo(UpdateUserInfoDTO updateUserInfoDTO) {
        Employee employee = employeeRepository.findByUsername(updateUserInfoDTO.getOldUsername());
        if(employee!= null) {
            employee.setUsername(updateUserInfoDTO.getUsername());
            employee.setFirstName(updateUserInfoDTO.getFirstName());
            employee.setLastName(updateUserInfoDTO.getLastName());
            return employeeRepository.save(employee);
        }
        return null;
    }

    @Override
    public int deleteEmployeeByUsername(String username) {
        Employee employee = employeeRepository.findByUsername(username);
        List<Role> roles = employee.getRoles();
        employee.removeRoles(roles);
        return employeeRepository.deleteByUsername(username);
    }

    @Override
    public void deleteEmployeeById(Long id) {
        Employee employee = employeeRepository.findFirstById(id);
        List<Role> roles = employee.getRoles();
        employee.removeRoles(roles);
        employeeRepository.deleteById(id);
    }

    @Override
    public Employee assignRole(String username, String roleName) {
        Employee employee = employeeRepository.findByUsername(username);
        Role role = roleRepository.findByRolename(roleName);
        if(employee!= null && role != null){
            employee.addRole(role);
            return employeeRepository.save(employee);
        }
        return null;
    }

    @Override
    public Employee rejectRole(String username, String roleName) {
        Employee employee = employeeRepository.findByUsername(username);
        Role role = roleRepository.findByRolename(roleName);
        if(employee!= null && role != null){
            employee.removeRole(role);
            return employeeRepository.save(employee);
        }
        return null;
    }

    @Override
    public Employee getUserByUsername(String username){
        return employeeRepository.findByUsername(username);
    }

}
