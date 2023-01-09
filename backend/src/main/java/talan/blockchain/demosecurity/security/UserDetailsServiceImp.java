package talan.blockchain.demosecurity.security;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import talan.blockchain.demosecurity.dao.EmployeeRepository;
import talan.blockchain.demosecurity.entities.Employee;

import java.util.ArrayList;
import java.util.Collection;

@Service
@Transactional

public class UserDetailsServiceImp implements UserDetailsService {
    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("Before search");
        Employee employee = employeeRepository.findByUsername(username);
        System.out.println("After search : "+employee);
        if(employee == null) throw  new UsernameNotFoundException("employee not exist ...");

        // Preparer les authorisations sous forme de collection d'objets comprehenssible par spring security contexte
        // ici j'ai pas tester si l'emplyee est activé ou non, ni son le role, ni ses autorities. S'il ya besoin juste faire un teste sur la variable enable
        Collection<GrantedAuthority> authorisations = new ArrayList<>();
        if (employee.getRoles() != null) {
            employee.getRoles().forEach(role -> {
                if (role.getAuthorities() != null) {
                    role.getAuthorities().forEach(authority ->
                            authorisations.add(new SimpleGrantedAuthority(authority.getAuthorityname())));
                }
            });
        }
        return new User(employee.getUsername(),employee.getPassword(),authorisations);
    }
}
