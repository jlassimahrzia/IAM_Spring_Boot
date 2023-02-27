package talan.blockchain.demosecurity.utils;

import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.response.EthBlockNumber;
import org.web3j.protocol.http.HttpService;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

public class BlockchainUtils {

    public static Web3j initializeWeb3j(){
        String urlProvider = System.getenv("spring.web3j.providerurl");
        System.out.println("urlProvider"+ urlProvider);
        Web3j web3j = Web3j.build(new HttpService("http://127.0.0.1:8545/"));
        System.out.println("web3j"+ web3j);
        return web3j;
    }

    public static EthBlockNumber getBlockNumber(Web3j web3j) throws ExecutionException, InterruptedException {
        EthBlockNumber result = new EthBlockNumber();
        result = web3j.ethBlockNumber()
                .sendAsync()
                .get();
        return result;
    }

    public static Map<String,Object> getEthAccounts(Web3j web3j) throws IOException {
        Map<String,Object> accounts= new HashMap<String,Object>();
        java.util.List<String> accountAddress=web3j.ethAccounts().send().getAccounts();
        accounts.put("account", accountAddress);
        return accounts;
    }

}
