package com.noteTogether.repositories

import com.noteTogether.entities.ViewLog
import org.springframework.data.mongodb.repository.MongoRepository

interface ViewLogRepository : MongoRepository<ViewLog, String>