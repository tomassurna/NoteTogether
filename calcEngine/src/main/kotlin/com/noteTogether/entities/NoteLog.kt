package com.noteTogether.entities

import org.springframework.data.mongodb.core.mapping.Document

@Document("note_analytics")
data class NoteLog(
        val video: String,
        val tag: String,
        val timestamp: String,
        val created_at: String
)