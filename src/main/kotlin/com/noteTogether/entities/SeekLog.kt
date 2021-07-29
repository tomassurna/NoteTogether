package com.noteTogether.entities

import org.bson.types.ObjectId
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document("seek_analytics")
data class SeekLog(
        @Id
        val id: ObjectId = ObjectId.get(),
        val video: String,
        val timestamp: String,
        val created_at: String
)