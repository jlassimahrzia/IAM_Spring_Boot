package talan.blockchain.demosecurity.controller;

import org.springframework.web.bind.annotation.*;
import talan.blockchain.demosecurity.DTO.AssignRoleDTO;
import talan.blockchain.demosecurity.DTO.DeleteDTO;
import talan.blockchain.demosecurity.DTO.UpdateDTO;
import talan.blockchain.demosecurity.entities.Employee;
import talan.blockchain.demosecurity.services.interfaces.EmployeeService;

import java.util.List;

@RestController
@RequestMapping("/api/employee")
@CrossOrigin("*")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping("/save")
    Employee saveEmployee(@RequestBody Employee employee){
        return employeeService.saveEmployee(employee);
    }

    @GetMapping("/list")
    List<Employee> getEmployees(){
        return employeeService.getEmployee();
    }

    @PutMapping("/update")
    Employee updateEmployeeByUsername(@RequestBody UpdateDTO<Employee> employeeDTO){
        return employeeService.updateEmployeeByUsername(employeeDTO.getName(), employeeDTO.getNewValues());
    }

    @DeleteMapping("/delete")
    int deleteEmployeeByUsername(@RequestBody DeleteDTO deleteDTO){
        return employeeService.deleteEmployeeByUsername(deleteDTO.getName());
    }

    @DeleteMapping("/delete/{id}")
    void deleteEmployeeById(@PathVariable Long id){
        employeeService.deleteEmployeeById(id);
    }

    @PutMapping("/assignRole")
    Employee assignRole(@RequestBody AssignRoleDTO assignRoleDTO){
        return employeeService.assignRole(assignRoleDTO.getUsername(), assignRoleDTO.getRoleName());
    }

    @GetMapping("/loadUser/{username}")
    Employee loadUserByUsername(@PathVariable String username){
        return employeeService.getUserByUsername(username);
    }

}
