package com.noteTogether.controllers

import com.noteTogether.entities.NoteLog
import com.noteTogether.entities.ViewLog
import com.noteTogether.entities.json.NoteLogJson
import com.noteTogether.entities.json.ViewLogJson
import com.noteTogether.repositories.NoteLogRepository
import com.noteTogether.repositories.ViewLogRepository
import com.noteTogether.services.AnalyticsService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*


/**
 *
 * Graph 1:
 *
 * Line graph showing the number of notes in a thirty second period
 * Multiple lines based on the tag type
 *
 * Graph 2:
 *
 *
 *
 * Graph 3:
 *
 */

@Controller
@RequestMapping("/analytics")
class AnalyticsController(
        private val analyticsService: AnalyticsService,
        private val noteLogRepository: NoteLogRepository,
        private val viewLogRepository: ViewLogRepository
) {

    @CrossOrigin(origins = ["http://localhost:3001", "http://localhost:8080", "http://localhost:80"])
    @GetMapping("/generateNoteLogGraphData")
    fun generateNoteLogGraphData(@RequestParam video: String): ResponseEntity<Map<String, Map<String, Int>>> {
        return ResponseEntity.ok(analyticsService.generateNoteLogGraphData(video))
    }

    @CrossOrigin(origins = ["http://localhost:3001", "http://localhost:8080", "http://localhost:80"])
    @GetMapping("/generateViewLogGraphData")
    fun generateViewLogGraphData(@RequestParam video: String): ResponseEntity<Map<String, Map<String, Int>>> {
        return ResponseEntity.ok(analyticsService.generateViewLogGraphData(video))
    }

    @CrossOrigin(origins = ["http://localhost:3001", "http://localhost:8080", "http://localhost:80"])
    @PostMapping("/saveNoteLog")
    fun saveNoteLog(@RequestBody noteLogJson: NoteLogJson): ResponseEntity<NoteLog> {
        val noteLog: NoteLog = noteLogRepository.insert(NoteLog(noteLogJson.video, noteLogJson.tag, noteLogJson.timestamp, noteLogJson.created_at))

        return ResponseEntity(noteLog, HttpStatus.OK)
    }

    @CrossOrigin(origins = ["http://localhost:3001", "http://localhost:8080", "http://localhost:80"])
    @PostMapping("/saveViewLog")
    fun saveViewLog(@RequestBody viewLogJson: ViewLogJson): ResponseEntity<ViewLog> {
        val viewLog: ViewLog = viewLogRepository.insert(ViewLog(viewLogJson.video, viewLogJson.startTime, viewLogJson.endTime, viewLogJson.created_at))

        return ResponseEntity(viewLog, HttpStatus.OK)
    }
}