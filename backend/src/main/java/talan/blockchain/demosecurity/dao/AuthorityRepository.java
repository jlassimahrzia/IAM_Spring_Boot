package talan.blockchain.demosecurity.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import talan.blockchain.demosecurity.entities.Authority;

public interface AuthorityRepository extends JpaRepository<Authority, Long> {
    Authority findByAuthorityname(String authorityname);
    int deleteByAuthorityname(String authorityname);
}
