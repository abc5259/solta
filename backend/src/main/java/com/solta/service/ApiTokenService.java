package com.solta.service;

import com.solta.domain.ApiToken;
import com.solta.domain.ApiTokenRepository;
import com.solta.domain.Member;
import com.solta.domain.MemberRepository;
import jakarta.transaction.Transactional;
import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class ApiTokenService {

    private final MemberRepository memberRepository;
    private final ApiTokenRepository apiTokenRepository;

    public CreatApiTokenResponse createApiToken(CreateApiTokenRequest createApiTokenRequest) {
        Member member = memberRepository.findById(createApiTokenRequest.memberId())
                .orElseThrow(
                        () -> new IllegalArgumentException("Invalid member id: " + createApiTokenRequest.memberId()));
        // TODO: token 생성 방식 정하기
        ApiToken apiToken = new ApiToken("token", LocalDate.now(), createApiTokenRequest.apiTokenPeriod(), member);
        apiTokenRepository.save(apiToken);
        return new CreatApiTokenResponse(apiToken.getToken());
    }
}
