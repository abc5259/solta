package com.solta.service;

import com.solta.domain.ApiTokenPeriod;

public record CreateApiTokenRequest(
        Long memberId,
        ApiTokenPeriod apiTokenPeriod
) {
}
