package com.noteTogether.repositories

import com.noteTogether.entities.NoteLog
import org.springframework.data.mongodb.repository.MongoRepository

interface NoteLogRepository : MongoRepository<NoteLog, String> {
    fun findAllByVideo(video: String): MutableList<NoteLog>
}