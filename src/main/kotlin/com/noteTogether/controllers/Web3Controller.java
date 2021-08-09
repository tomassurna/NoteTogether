package com.noteTogether.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.response.EthGetTransactionCount;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.atomic.AtomicInteger;

// Controller is in Java because Kotlin is weird about static variables
@Controller
@RequestMapping("/web3j")
public class Web3Controller {

  // Store the server account nonce statically so multiple users can be taking notes without us
  // losing the Nonce position. Since Web3 only checks mined transactions and not pending ones
  private static AtomicInteger nonce;

  @Autowired
  Web3Controller(Web3j web3j) throws ExecutionException, InterruptedException {
    EthGetTransactionCount ethGetTransactionCount =
        web3j
            .ethGetTransactionCount(
                "0x06C2b3c0174Df5a6006c7A0132203A2715Ec9322", DefaultBlockParameterName.LATEST)
            .sendAsync()
            .get();

    nonce = new AtomicInteger(ethGetTransactionCount.getTransactionCount().intValue());
  }

  @CrossOrigin(origins = {"http://localhost:3001", "https://notetogether.azurewebsites.net"})
  @GetMapping(path = "/nonce")
  public ResponseEntity<Integer> getNonce() {
    return ResponseEntity.ok(nonce.getAndIncrement());
  }
}
