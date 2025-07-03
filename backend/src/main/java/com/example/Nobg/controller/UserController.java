package com.example.Nobg.controller;

import com.example.Nobg.dto.UserDTO;
import com.example.Nobg.response.RemoveBGresponse;
import com.example.Nobg.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.http.HttpResponse;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping
    public ResponseEntity<?> createOrUpdateUser(@RequestBody UserDTO userDTO, Authentication authentication){
        RemoveBGresponse response=null;
        try{
            if(!authentication.getName().equals(userDTO.getClerkId())){
              response = RemoveBGresponse.builder()
                        .success(false)
                        .data("User does not have permission to access the resources")
                        .statusCode(String.valueOf(HttpStatus.FORBIDDEN))
                        .build();
               return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
            }

            UserDTO user = userService.saveUser(userDTO);
            response= RemoveBGresponse.builder()
                    .success(true)
                    .data(user)
                    .statusCode(String.valueOf(HttpStatus.OK))
                    .build();
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e){
             response= RemoveBGresponse.builder()
                    .success(false)
                    .data(e.getMessage())
                    .statusCode(String.valueOf(HttpStatus.INTERNAL_SERVER_ERROR))
                    .build();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
