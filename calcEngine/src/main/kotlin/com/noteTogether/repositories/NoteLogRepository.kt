package com.noteTogether.repositories

import com.noteTogether.entities.NoteLog
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Component

interface NoteLogRepository : MongoRepository<NoteLog, String>