package com.bits.chatbot.controller;

import com.bits.chatbot.service.OpenAIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    private OpenAIService openAIService;

    @PostMapping("/message")
    public String getResponse(@RequestBody String userMessage) {
        return openAIService.getChatbotResponse(userMessage);
    }
}

