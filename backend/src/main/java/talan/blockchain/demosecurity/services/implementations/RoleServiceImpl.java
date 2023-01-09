package talan.blockchain.demosecurity.services.implementations;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import talan.blockchain.demosecurity.dao.AuthorityRepository;
import talan.blockchain.demosecurity.dao.EmployeeRepository;
import talan.blockchain.demosecurity.dao.RoleRepository;
import talan.blockchain.demosecurity.entities.Authority;
import talan.blockchain.demosecurity.entities.Employee;
import talan.blockchain.demosecurity.entities.Role;
import talan.blockchain.demosecurity.services.interfaces.RoleService;

import java.util.List;

@Service
@Transactional
public class RoleServiceImpl implements RoleService {

    private RoleRepository roleRepository;
    private AuthorityRepository authorityRepository;

    private EmployeeRepository employeeRepository;

    public RoleServiceImpl(RoleRepository roleRepository, AuthorityRepository authorityRepository, EmployeeRepository employeeRepository) {
        this.roleRepository = roleRepository;
        this.authorityRepository = authorityRepository;
        this.employeeRepository = employeeRepository;
    }

    @Override
    public Role saveRole(Role role) {
        Role role1;
        if((role1 = roleRepository.findByRolename(role.getRolename())) == null){
            role.setId(null);
            role1 = roleRepository.save(role);
        }
        return role1;
    }

    @Override
    public List<Role> getRole() {
        return roleRepository.findAll();
    }

    @Override
    public Role updateRoleByName(String oldRolename, Role newRole) {
        Role role = roleRepository.findByRolename(oldRolename);
        if(role!= null){
            if(role.getRolename() != null){
                newRole.setRolename(newRole.getRolename());
                return roleRepository.save(newRole);
            }
        }
        return null;
    }

    @Override
    public int deleteRoleByName(String roleName) {
        Role role = roleRepository.findByRolename(roleName);
        List<Authority> authorities = role.getAuthorities();
        role.removeAuthorities(authorities);
        List<Employee> employees = employeeRepository.findAll();
        employees.stream().forEach(employee -> employee.removeRole(role));
        return roleRepository.deleteByRolename(roleName);
    }

    @Override
    public Role assignAuthority(String roleName, String authorityName) {
        Role role = roleRepository.findByRolename(roleName);
        Authority authority = authorityRepository.findByAuthorityname((authorityName));
        if(role != null && authority != null){
            role.addAuthority(authority);
            return roleRepository.save(role);
        }
        return null;
    }
}
