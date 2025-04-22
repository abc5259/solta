package com.solta.domain;

import java.time.Period;

public enum ApiTokenPeriod {
    SEVEN_DAYS(Period.ofDays(7)),
    ONE_MONTH(Period.ofMonths(1)),
    TWO_MONTHS(Period.ofMonths(2)),
    THREE_MONTHS(Period.ofMonths(3)),
    ONE_YEAR(Period.ofYears(1)),
    ;


    private final Period period;

    ApiTokenPeriod(Period period) {
        this.period = period;
    }
}
