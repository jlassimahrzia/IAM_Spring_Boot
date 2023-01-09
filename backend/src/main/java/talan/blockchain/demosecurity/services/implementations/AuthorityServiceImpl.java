package talan.blockchain.demosecurity.services.implementations;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import talan.blockchain.demosecurity.dao.AuthorityRepository;
import talan.blockchain.demosecurity.dao.RoleRepository;
import talan.blockchain.demosecurity.entities.Authority;
import talan.blockchain.demosecurity.entities.Role;
import talan.blockchain.demosecurity.services.interfaces.AuthorityService;

import java.util.List;

@Service
@Transactional
public class AuthorityServiceImpl implements AuthorityService {

    private AuthorityRepository authorityRepository;

    private RoleRepository roleRepository;

    public AuthorityServiceImpl(AuthorityRepository authorityRepository, RoleRepository roleRepository) {
        this.authorityRepository = authorityRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public Authority saveAuthority(Authority authority) {
        Authority authority1;
        if((authority1 = authorityRepository.findByAuthorityname(authority.getAuthorityname())) == null){
            authority.setId(null);
            authority1 = authorityRepository.save(authority);
        }
        return authority1;
    }

    @Override
    public List<Authority> getAuthority() {
        return authorityRepository.findAll();
    }

    @Override
    public Authority updateAuthorityByAuthorityName(String authorityname, Authority newAuthority) {
        Authority authority = authorityRepository.findByAuthorityname(authorityname);
        if(authority!= null){
            if(authority.getAuthorityname() != null){
                authority.setAuthorityname(newAuthority.getAuthorityname());
                return authorityRepository.save(authority);
            }
        }
        return null;
    }

    @Override
    public int deleteByAuthorityName(String authorityName) {
        Authority authority = authorityRepository.findByAuthorityname(authorityName);
        List<Role> roles = roleRepository.findAll();
        roles.stream().forEach( role -> role.removeAuthority(authority));
        return authorityRepository.deleteByAuthorityname(authorityName);
    }
}
