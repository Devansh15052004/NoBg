package com.example.Nobg.controller;

import com.example.Nobg.dto.UserDTO;
import com.example.Nobg.response.RemoveBGresponse;
import com.example.Nobg.service.UserService;
import lombok.Generated;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpResponse;
import java.util.HashMap;
import java.util.Map;

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
    @GetMapping("/credits")
    public ResponseEntity<?> getUserCredits(Authentication authentication){
        RemoveBGresponse response=null;
        try {
            if(authentication.getName().isEmpty()|| authentication.getName()==null){
                response=RemoveBGresponse.builder()
                        .statusCode(String.valueOf(HttpStatus.FORBIDDEN))
                        .data("User does not have permission/access to this resourse")
                        .success(false)
                        .build();
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
            }
            String clerkId = authentication.getName();
            UserDTO  existingUser = userService.getUserByClerkId(clerkId);
            Map<String,Integer>map=new HashMap<>();
            map.put("credits",existingUser.getCredits());
            response = RemoveBGresponse.builder()
                            .statusCode(String.valueOf(HttpStatus.OK))
                            .data(map)
                            .success(true)
                            .build();
            return ResponseEntity.status(HttpStatus.OK).body(response);

        }catch (Exception e){
            response = RemoveBGresponse.builder()
                    .statusCode(String.valueOf(HttpStatus.INTERNAL_SERVER_ERROR))
                    .data("Something went wrong")
                    .success(false)
                    .build();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
