package com.kotlin.websocket.config

import io.github.oshai.kotlinlogging.KotlinLogging
import org.springframework.context.event.EventListener
import org.springframework.stereotype.Component
import org.springframework.web.socket.messaging.SessionConnectEvent

@Component
class WebSocketEventHandler {
    private val logger = KotlinLogging.logger {}

    @EventListener
    fun handleWebSocketSessionConnectEventListener(event: SessionConnectEvent) {
        logger.info {">>> Received a SessionConnectEvent"}
    }

    @EventListener
    fun handleWebSocketSessionSubscribeEventListener(event: SessionConnectEvent) {
        logger.info {">>> Received a SessionSubscribe"}
    }

    @EventListener
    fun handleWebSocketSessionUnsubscribeEventListener(event: SessionConnectEvent) {
        logger.info {">>> Received a SessionUnSubscribe"}
    }

    @EventListener
    fun handleWebSocketSessionConnectedEventListener(event: SessionConnectEvent) {
        logger.info {">>> Received a SessionConnectedEvent"}
    }

    @EventListener
    fun handleWebSocketSessionDisconnectEventListener(event: SessionConnectEvent) {
        logger.info {">>> Received a SessionDisconnectEvent"}
    }
}