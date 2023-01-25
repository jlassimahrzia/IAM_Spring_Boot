package talan.blockchain.demosecurity.services.interfaces;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;
import talan.blockchain.demosecurity.DTO.ChangeImageProfileDTO;
import talan.blockchain.demosecurity.DTO.ImageUploadDTO;
import talan.blockchain.demosecurity.DTO.UpdateUserInfoDTO;
import talan.blockchain.demosecurity.entities.Employee;
import talan.blockchain.demosecurity.entities.Role;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface EmployeeService {
    Employee saveEmployee(Employee employee);
    ImageUploadDTO uploadImage(MultipartFile file) throws IOException;
    List<Employee> getEmployee();
    Employee changeEmployeePassword(String username, String newPassword);
    Employee UpdateEmployeeInfo(UpdateUserInfoDTO updateUserInfoDTO);
    int deleteEmployeeByUsername(String username);
    void deleteEmployeeById(Long id);
    Employee assignRole(String username, String roleName);
    Employee rejectRole(String username, String roleName);
    Employee getUserByUsername(String username);
    Employee updateProfileImage(ChangeImageProfileDTO changeImageProfileDTO);

}
