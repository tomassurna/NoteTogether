package com.noteTogether.noteTogether.configuration

import com.mongodb.client.MongoClient
import com.mongodb.client.MongoClients
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.mongodb.core.MongoTemplate
import org.web3j.protocol.Web3j
import org.web3j.protocol.http.HttpService


@Configuration
class AppConfig {

    @Bean
    fun mongoClient(): MongoClient? {
        return MongoClients.create("mongodb+srv://notetogether:5dXYKLOJEtYzmqeK@notetogether.fyxby.mongodb.net/note_together?retryWrites=true\n")
    }

    @Bean
    fun mongoTemplate(): MongoTemplate? {
        return MongoTemplate(mongoClient()!!, "note_together")
    }

    @Bean
    fun web3j(): Web3j {
        return Web3j.build(HttpService("https://ropsten.infura.io/v3/e2634f64bdc749f19aa98dea65d4e289"))
    }
}