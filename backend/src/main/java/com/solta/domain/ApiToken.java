package com.solta.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ApiToken {
    @Id
    private String token;

    private LocalDate issuedAt;

    private ApiTokenPeriod apiTokenPeriod;

    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    public ApiToken(String token, LocalDate issuedAt, ApiTokenPeriod apiTokenPeriod, Member member) {
        this.token = token;
        this.issuedAt = issuedAt;
        this.apiTokenPeriod = apiTokenPeriod;
        this.member = member;
    }
}
