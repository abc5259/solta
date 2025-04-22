package com.solta.controller;

import com.solta.service.ApiTokenService;
import com.solta.service.CreatApiTokenResponse;
import com.solta.service.CreateApiTokenRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api-tokens")
@RequiredArgsConstructor
public class ApiTokenController {

    private final ApiTokenService apiTokenService;

    @PostMapping
    public ResponseEntity<CreatApiTokenResponse> issueApiToken(@Login LoginMember loginMember,
                                                               @RequestBody CreateApiTokenRequest createApiTokenRequest) {
        CreatApiTokenResponse apiTokenResponse = apiTokenService.createApiToken(createApiTokenRequest);
        return ResponseEntity.ok().body(apiTokenResponse);
    }
}
