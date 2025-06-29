package com.example.Nobg.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RemoveBGresponse {
    private boolean success;
    private String statusCode;
    private Object data;
}
