package com.noteTogether.notetTogether.configuration

import com.mongodb.client.MongoClient
import com.mongodb.client.MongoClients
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.mongodb.core.MongoTemplate


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
}