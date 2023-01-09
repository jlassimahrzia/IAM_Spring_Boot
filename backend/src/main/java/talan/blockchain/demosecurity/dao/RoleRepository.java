package talan.blockchain.demosecurity.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import talan.blockchain.demosecurity.entities.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Role findByRolename(String rolename);
    int deleteByRolename(String rolename);
}
