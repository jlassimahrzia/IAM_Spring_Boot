package talan.blockchain.demosecurity.controller;

import org.springframework.web.bind.annotation.*;
import talan.blockchain.demosecurity.DTO.AssignAuthorityDTO;
import talan.blockchain.demosecurity.DTO.DeleteDTO;
import talan.blockchain.demosecurity.DTO.UpdateDTO;
import talan.blockchain.demosecurity.entities.Role;
import talan.blockchain.demosecurity.services.interfaces.RoleService;

import java.util.List;

@RestController
@RequestMapping("/api/role")
public class RoleController {

    private final RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @PostMapping("/save")
    Role saveRole(@RequestBody Role role){
        return roleService.saveRole(role);
    }

    @GetMapping("/list")
    List<Role> getRoles(){
        return roleService.getRole();
    }

    @PutMapping("/update")
    Role updateRoleByUsername(@RequestBody UpdateDTO<Role> roleDTO){
        return roleService.updateRoleByName(roleDTO.getName(), roleDTO.getNewValues());
    }

    @DeleteMapping("/delete")
    int deleteRoleByUsername(@RequestBody DeleteDTO deleteDTO){
        return roleService.deleteRoleByName(deleteDTO.getName());
    }

    @PostMapping("assignAuthority")
    Role assignAuthority(@RequestBody AssignAuthorityDTO assignAuthorityDTO){
        return roleService.assignAuthority(assignAuthorityDTO.getRoleName(), assignAuthorityDTO.getAuthorityName());
    }

}
