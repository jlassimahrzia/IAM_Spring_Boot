package talan.blockchain.demosecurity.services.interfaces;

import talan.blockchain.demosecurity.entities.Role;

import java.util.List;

public interface RoleService {
    Role saveRole(Role role);
    List<Role> getRole();
    Role updateRoleByName(String oldname, Role newRole);
    int deleteRoleByName(String rolename);

    Role assignAuthority(String roleName, String authorityName);
}
