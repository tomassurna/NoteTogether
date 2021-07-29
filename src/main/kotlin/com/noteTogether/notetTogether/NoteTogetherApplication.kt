package com.noteTogether.notetTogether

import com.mongodb.client.MongoClient
import com.noteTogether.repositories.NoteLogRepository
import com.noteTogether.services.AnalyticsService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories

@SpringBootApplication(scanBasePackages = ["com.noteTogether.*"])
@EnableMongoRepositories(basePackages = ["com.noteTogether.*"])
class NoteTogetherApplication {
    @Autowired
    fun init(mongoClient: MongoClient, analyticsService: AnalyticsService) {
        mongoClient.startSession()
    }
}


fun main(args: Array<String>) {
    runApplication<NoteTogetherApplication>(*args)
}
