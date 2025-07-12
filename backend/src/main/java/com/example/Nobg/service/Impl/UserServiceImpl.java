package com.example.Nobg.service.Impl;

import com.example.Nobg.dto.UserDTO;
import com.example.Nobg.entity.UserEntity;
import com.example.Nobg.repository.UserRepository;
import com.example.Nobg.service.UserService;
import lombok.RequiredArgsConstructor;
import org.hibernate.service.UnknownServiceException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;


    @Override
    @Transactional
    public UserDTO saveUser(UserDTO userDTO) {
        Optional<UserEntity> optionalUser=userRepository.findByClerkId(userDTO.getClerkId());
        if(optionalUser.isPresent()){
            UserEntity existingUser=optionalUser.get();
            existingUser.setEmail(userDTO.getEmail());
            existingUser.setFirstName(userDTO.getFirstName());
            existingUser.setLastName(userDTO.getLastName());
            existingUser.setPhotoUrl(userDTO.getPhotoUrl());
            if(userDTO.getCredits()!=null){
                existingUser.setCredits(userDTO.getCredits());
            }
            existingUser=userRepository.save(existingUser);
           return mapToDTO(existingUser);
        }
        UserEntity newUser=mapToEntity(userDTO);
        newUser.setCredits(5);
        userRepository.save(newUser);
        return mapToDTO(newUser);
    }

    @Override
    public UserDTO getUserByClerkId(String clerkId) {
        UserEntity user=userRepository.findByClerkId(clerkId)
                .orElseThrow(()->new UsernameNotFoundException("User not found"));
        return mapToDTO(user);
    }

    @Override
    public void deleteUserByClerkId(String clerkId) {
        UserEntity user=userRepository.findByClerkId(clerkId)
                .orElseThrow(()->new UsernameNotFoundException("User not found"));
        userRepository.delete(user);
    }

    private UserDTO mapToDTO(UserEntity newUser){
       return UserDTO.builder()
                .clerkId(newUser.getClerkId())
                .credits(newUser.getCredits())
                .email(newUser.getEmail())
                .firstName(newUser.getFirstName())
                .lastName(newUser.getLastName())
                .build();
    }
    private UserEntity mapToEntity(UserDTO userDTO){
       return UserEntity.builder()
                .clerkId(userDTO.getClerkId())
                .email(userDTO.getEmail())
                .firstName(userDTO.getFirstName())
                .lastName(userDTO.getLastName())
                .photoUrl(userDTO.getPhotoUrl())
                .build();
    }
}
