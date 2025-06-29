package com.example.Nobg.controller;

import com.example.Nobg.dto.UserDTO;
import com.example.Nobg.response.RemoveBGresponse;
import com.example.Nobg.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping
    public RemoveBGresponse createOrUpdateUser(@RequestBody UserDTO userDTO){
        try{
            UserDTO user = userService.saveUser(userDTO);
            RemoveBGresponse.builder()
                    .success(true)
                    .data(user)
                    .statusCode(HttpStatus.CREATED)
                    .build();
        }catch (Exception e){
            return RemoveBGresponse.builder()
                    .success(false)
                    .data(e.getMessage())
                    .statusCode(HttpStatus.CREATED)
                    .build();
        }
    }
}
