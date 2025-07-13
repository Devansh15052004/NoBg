package com.example.Nobg.controller;

import com.example.Nobg.dto.UserDTO;
import com.example.Nobg.response.RemoveBGresponse;
import com.example.Nobg.service.Impl.RemoveBackgroundServiceImpl;
import com.example.Nobg.service.UserService;
import com.fasterxml.jackson.databind.ser.Serializers;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.multipart.MultipartFile;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/images")
@RequiredArgsConstructor
public class ImageController {
    private final RemoveBackgroundServiceImpl removeBackgroundService;
    private final UserService userService;

    @PostMapping("/remove-background")
    public ResponseEntity<?> removeBackground(@RequestParam("image_file")MultipartFile file, Authentication authentication){
        RemoveBGresponse response=null;
        Map<String, Object> responseMap=new HashMap<>();

        try {
            if(authentication.getName().isEmpty() || authentication.getName()==null){
                response = RemoveBGresponse.builder()
                        .statusCode(String.valueOf(HttpStatus.FORBIDDEN))
                        .success(false)
                        .data("user does not have permission/access to resourse")
                        .build();
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
            }
            UserDTO userDTO=userService.getUserByClerkId(authentication.getName());
            if(userDTO.getCredits()==0){
                responseMap.put("message","No credit balance");
                responseMap.put("creditBalance",userDTO.getCredits());
                response=RemoveBGresponse.builder()
                        .success(false)
                        .data(responseMap)
                        .statusCode(String.valueOf(HttpStatus.OK))
                        .build();
                return ResponseEntity.ok(response);
             }
            byte[] imageBytes=removeBackgroundService.removeBackground(file);
            String base64Image= Base64.getEncoder().encodeToString(imageBytes);

            userDTO.setCredits(userDTO.getCredits()-1);
            userService.saveUser(userDTO);
            return ResponseEntity.ok()
                    .contentType(MediaType.TEXT_PLAIN)
                    .body(base64Image);
        }catch (Exception e){
            response = RemoveBGresponse.builder()
                    .statusCode(String.valueOf(HttpStatus.INTERNAL_SERVER_ERROR))
                    .success(false)
                    .data("Something went wrong")
                    .build();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
