package talan.blockchain.demosecurity.services.interfaces;

import talan.blockchain.demosecurity.entities.Authority;

import java.util.List;

public interface AuthorityService {
    Authority saveAuthority(Authority authority);
    List<Authority> getAuthority();
    Authority updateAuthorityByAuthorityName(String authorityname, Authority newAuthority);
    int deleteByAuthorityName(String authorityname);
}
