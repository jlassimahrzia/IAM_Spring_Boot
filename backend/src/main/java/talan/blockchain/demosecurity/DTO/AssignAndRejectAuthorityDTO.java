package talan.blockchain.demosecurity.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode

public class AssignAndRejectAuthorityDTO {
    private String roleName;
    private String authorityName;
}
