package com.example.Nobg.controller;

import com.example.Nobg.dto.UserDTO;
import com.example.Nobg.response.RemoveBGresponse;
import com.example.Nobg.service.UserService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.UserDatabase;
import org.aspectj.weaver.patterns.IVerificationRequired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyEmitter;

@RestController
@RequestMapping("api/webhooks")
@RequiredArgsConstructor
public class ClerkWebHookController {

    @Value("${clerk.webhook.secret}")
    private String webhookSecret;

    private final UserService userService;

    @PostMapping("/clerk")
    public ResponseEntity<?> handleClerkWebhook(@RequestHeader("svix-id") String svixId,
                                                @RequestHeader("svix-timestamp") String svixTimestamp,
                                                @RequestHeader("svix-signature") String svixSignature,
                                                @RequestBody String payload){
        RemoveBGresponse response=null;
        try {
            boolean isValid = verifyWebhookSignature();
            if(!isValid){
                response=RemoveBGresponse.builder()
                        .statusCode(String.valueOf(HttpStatus.UNAUTHORIZED))
                        .data("Invalid webhook signature")
                        .success(false)
                        .build();
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(response);
            }
            ObjectMapper objectMapper=new ObjectMapper();
            JsonNode rootNode=objectMapper.readTree(payload);
            String eventType=rootNode.path("type").asText();
            switch (eventType){
                case "user.created":
                    handleUserCreated(rootNode.path("data"));
                    break;
                case "user.updated":
                    handleUserUpdated(rootNode.path("data"));
                    break;
                case "user.deleted":
                    handleUserDeleted(rootNode.path("data"));
                     break;
            }
            return ResponseEntity.ok().build();
        }catch(Exception e){
            response=RemoveBGresponse.builder()
                    .statusCode(String.valueOf(HttpStatus.INTERNAL_SERVER_ERROR))
                    .data("Something went wrong")
                    .success(false)
                    .build();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(response);
        }
    }

    private void handleUserDeleted(JsonNode data) {
        String clerkId=data.path("id").asText();
        userService.deleteUserByClerkId(clerkId);
    }

    private void handleUserUpdated(JsonNode data) {

        String clerkId = data.path("id").asText();
        System.out.println("Updating user: " + clerkId);
        System.out.println("New Email: " + data.path("email_addresses").path(0).path("email_address").asText());
        System.out.println("First Name: " + data.path("first_name").asText());

        UserDTO existingUser = userService.getUserByClerkId(clerkId);
        existingUser.setEmail(data.path("email_addresses").path(0).path("email_address").asText());
        existingUser.setFirstName(data.path("first_name").asText());
        existingUser.setLastName(data.path("last_name").asText());
        existingUser.setPhotoUrl(data.path("image_url").asText());
        userService.saveUser(existingUser);
        System.out.println("Updating user: " + clerkId);
        System.out.println("New Email: " + data.path("email_addresses").path(0).path("email_address").asText());
        System.out.println("First Name: " + data.path("first_name").asText());

    }

    private void handleUserCreated(JsonNode data) {
        UserDTO newUSer= UserDTO.builder()
                .clerkId(data.path("id").asText())
                .email(data.path("email_addresses").path(0).path("email_address").asText())
                .firstName(data.path("first_name").asText())
                .lastName(data.path("last_name").asText())
                .build();
        userService.saveUser(newUSer);
    }

    private boolean verifyWebhookSignature() {
        return true;
    }
}
