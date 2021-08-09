package com.noteTogether.services

import com.noteTogether.entities.NoteLog
import com.noteTogether.entities.ViewLog
import com.noteTogether.repositories.NoteLogRepository
import com.noteTogether.repositories.ViewLogRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import java.time.LocalTime
import java.time.format.DateTimeFormatter


@Component
class AnalyticsService(
        @Autowired
        private val noteLogRepository: NoteLogRepository,
        private val viewLogRepository: ViewLogRepository
) {
    fun generateNoteLogGraphData(video: String): Map<String, Map<String, Int>> {
        val TICK_SIZE = 5

        val noteLogs: List<NoteLog> = noteLogRepository.findAllByVideo(video)

        // Loop through noteLogs and generate graph data where the key is an increment of 30 seconds

        val data = mutableMapOf<String, MutableMap<String, Int>>()

        noteLogs.forEach {
            val localTime = LocalTime.parse(it.timestamp, DateTimeFormatter.ofPattern("HH:mm:ss"))
            val seconds = localTime.toSecondOfDay()
            val tag = it.tag

            // If midPoint < 15 then we go to the tick below, if its midPoint >= we go to the tick above
            val midPoint = seconds % TICK_SIZE
            var tick = seconds / TICK_SIZE

            if (midPoint >= TICK_SIZE / 2) {
                tick++
            }

            val graphSeconds = tick * TICK_SIZE
            val graphTick = getTimeStampFromSeconds(graphSeconds)

            if (!data.containsKey(tag)) {
                data[tag] = mutableMapOf()
            }

            if (!data[tag]!!.containsKey(graphTick)) {
                data[tag]!![graphTick] = 1
            } else {
                data[tag]!!.computeIfPresent(graphTick) { _, v -> v + 1 }

            }

        }

        return data
    }

    fun generateViewLogGraphData(video: String): Map<String, Map<String, Int>> {
        val TICK_SIZE = 30

        val viewLogs: List<ViewLog> = viewLogRepository.findAllByVideo(video)

        // Loop through noteLogs and generate graph data where the key is an increment of 30 seconds
        val data = mutableMapOf<String, MutableMap<String, Int>>()

        viewLogs.forEach {
            val startTime = LocalTime.parse(it.startTime, DateTimeFormatter.ofPattern("HH:mm:ss"))
            val endTime = LocalTime.parse(it.endTime, DateTimeFormatter.ofPattern("HH:mm:ss"))
            val startSeconds = startTime.toSecondOfDay()
            val endSeconds = endTime.toSecondOfDay()
            val tag = "Viewership"

            // If midPoint < 15 then we go to the tick below, if its midPoint >= we go to the tick above
            val startMidPoint = startSeconds % TICK_SIZE
            var startTick = startSeconds / TICK_SIZE

            if (startMidPoint >= TICK_SIZE / 2) {
                startTick++
            }

            val endMidPoint = endSeconds % TICK_SIZE
            var endTick = endSeconds / TICK_SIZE

            if (endMidPoint >= TICK_SIZE / 2) {
                endTick++
            }

            val graphStartSeconds = startTick * TICK_SIZE
            val graphEndSeconds = endTick * TICK_SIZE

            if (!data.containsKey(tag)) {
                data[tag] = mutableMapOf()
            }

            for (i in graphStartSeconds until graphEndSeconds step TICK_SIZE) {
                val currentTimeStamp = getTimeStampFromSeconds(i)

                if (!data[tag]!!.containsKey(currentTimeStamp)) {
                    data[tag]!![currentTimeStamp] = 1
                } else {
                    data[tag]!!.computeIfPresent(currentTimeStamp) { _, v -> v + 1 }
                }
            }
        }

        val noteLogs: List<NoteLog> = noteLogRepository.findAllByVideo(video)

        noteLogs.forEach {
            val localTime = LocalTime.parse(it.timestamp, DateTimeFormatter.ofPattern("HH:mm:ss"))
            val seconds = localTime.toSecondOfDay()
            val tag = it.tag

            // If midPoint < 15 then we go to the tick below, if its midPoint >= we go to the tick above
            val midPoint = seconds % TICK_SIZE
            var tick = seconds / TICK_SIZE

            if (midPoint >= TICK_SIZE / 2) {
                tick++
            }

            val graphSeconds = tick * TICK_SIZE
            val graphTick = getTimeStampFromSeconds(graphSeconds)

            if (!data.containsKey(tag)) {
                data[tag] = mutableMapOf()
            }

            if (!data[tag]!!.containsKey(graphTick)) {
                data[tag]!![graphTick] = 1
            } else {
                data[tag]!!.computeIfPresent(graphTick) { _, v -> v + 1 }

            }

        }

        return data
    }

    // Source https://stackoverflow.com/a/6118983
    fun getTimeStampFromSeconds(totalSecs: Int): String {
        val hours = totalSecs / 3600
        val minutes = (totalSecs % 3600) / 60
        val seconds = totalSecs % 60


        return String.format("%02d:%02d:%02d", hours, minutes, seconds)
    }

}