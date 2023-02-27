package talan.blockchain.demosecurity;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.ApplicationContext;
import org.web3j.protocol.Web3j;
import talan.blockchain.demosecurity.utils.BlockchainUtils;

import java.io.IOException;
import java.util.concurrent.ExecutionException;


@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class DemoSecurityApplication {

    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(DemoSecurityApplication.class, args);
    }

}
