package com.noteTogether.repositories

import com.noteTogether.entities.SeekLog
import org.springframework.data.mongodb.repository.MongoRepository

interface SeekLogRepository : MongoRepository<SeekLog, String>