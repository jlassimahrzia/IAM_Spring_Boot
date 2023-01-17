package talan.blockchain.demosecurity.controller;

import org.springframework.web.bind.annotation.*;
import talan.blockchain.demosecurity.DTO.DeleteDTO;
import talan.blockchain.demosecurity.DTO.UpdateDTO;
import talan.blockchain.demosecurity.entities.Authority;
import talan.blockchain.demosecurity.entities.Role;
import talan.blockchain.demosecurity.services.interfaces.AuthorityService;

import java.util.List;

@RestController
@RequestMapping("/api/authority/")
public class AuthorityController {

    private final AuthorityService authorityService;

    public AuthorityController(AuthorityService authorityService) {
        this.authorityService = authorityService;
    }

    @PostMapping("save")
    Authority saveAuthority(@RequestBody Authority authority){
        return authorityService.saveAuthority(authority);
    }

    @GetMapping("list")
    List<Authority> getAuthorities(){
        return authorityService.getAuthority();
    }

    @PutMapping("update")
    Authority updateAuthorityByAuthorityname(@RequestBody UpdateDTO<Authority> roleDTO){
        return authorityService.updateAuthorityByAuthorityName(roleDTO.getName(), roleDTO.getNewValues());
    }

    @DeleteMapping("delete")
    int deleteAuthorityByAuthorityname(@RequestBody DeleteDTO deleteDTO){
        return authorityService.deleteByAuthorityName(deleteDTO.getName());
    }
}
