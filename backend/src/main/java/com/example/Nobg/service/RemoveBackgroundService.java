package com.example.Nobg.service;


import org.springframework.web.multipart.MultipartFile;

public interface RemoveBackgroundService {
    byte[] removeBackground(MultipartFile file);
}
