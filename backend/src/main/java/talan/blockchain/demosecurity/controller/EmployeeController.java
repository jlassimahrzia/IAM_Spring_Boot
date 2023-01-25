package talan.blockchain.demosecurity.controller;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import talan.blockchain.demosecurity.DTO.*;
import talan.blockchain.demosecurity.entities.Employee;
import talan.blockchain.demosecurity.services.interfaces.EmployeeService;
import talan.blockchain.demosecurity.utils.FileUploadUtil;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/employee/")
@CrossOrigin("*")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping("save")
    Employee saveEmployee(@RequestBody Employee employee){
        return employeeService.saveEmployee(employee);
    }

    @PostMapping("/saveimage")
    ImageUploadDTO  uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        return employeeService.uploadImage(file);
    }

    @GetMapping("list")
    List<Employee> getEmployees(){
        return employeeService.getEmployee();
    }

    @PutMapping("changePassword")
    Employee changeEmployeePassword(@RequestBody ChangePasswordDTO changePasswordDTO){
        return employeeService.changeEmployeePassword(changePasswordDTO.getUsername(), changePasswordDTO.getNewPassword());
    }

    @PutMapping("updateProfile")
    Employee updateEmployeeInfo(@RequestBody UpdateUserInfoDTO updateUserInfoDTO){
        return employeeService.UpdateEmployeeInfo(updateUserInfoDTO);
    }

    @DeleteMapping("delete")
    int deleteEmployeeByUsername(@RequestBody DeleteDTO deleteDTO){
        return employeeService.deleteEmployeeByUsername(deleteDTO.getName());
    }

    @DeleteMapping("delete/{id}")
    void deleteEmployeeById(@PathVariable Long id){
        employeeService.deleteEmployeeById(id);
    }

    @PutMapping("assignRole")
    Employee assignRole(@RequestBody roleEmployeeDTO assignRoleDTO){
        return employeeService.assignRole(assignRoleDTO.getUsername(), assignRoleDTO.getRoleName());
    }

    @PutMapping("rejectRole")
    Employee rejectRole(@RequestBody roleEmployeeDTO assignRoleDTO){
        return employeeService.rejectRole(assignRoleDTO.getUsername(), assignRoleDTO.getRoleName());
    }

    @GetMapping("loadUser/{username}")
    Employee loadUserByUsername(@PathVariable String username){
        return employeeService.getUserByUsername(username);
    }

    @GetMapping("/image/{imagename}")
    public @ResponseBody Map<String, String> getImage(@PathVariable String imagename) throws IOException {
        return FileUploadUtil.getFile(imagename);
    }

    @PutMapping("/changeProfileImage")
    public Employee changeProfileImage(@RequestBody ChangeImageProfileDTO changeImageProfileDTO) {
        System.out.println(changeImageProfileDTO);
        return employeeService.updateProfileImage(changeImageProfileDTO);
    }



}
