package com.noteTogether.entities

import org.bson.types.ObjectId
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document("view_analytics")
data class ViewLog(
        val video: String,
        val startTime: String,
        val endTime: String,
        val created_at: String
)