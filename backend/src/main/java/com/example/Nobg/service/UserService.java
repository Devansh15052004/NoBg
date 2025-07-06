package com.example.Nobg.service;

import com.example.Nobg.dto.UserDTO;

public interface UserService {
    UserDTO saveUser(UserDTO userDTO);

    UserDTO getUserByClerkId(String clerkId);
    void deleteUserByClerkId(String clerkId);
}
