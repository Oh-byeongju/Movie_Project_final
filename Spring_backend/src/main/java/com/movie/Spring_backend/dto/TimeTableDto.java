package com.movie.Spring_backend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.List;

@Getter
@NoArgsConstructor
public class TimeTableDto {
    private Long mid;
    private String mtitle;
    private Integer mtime;
    private String mrating;
    private String theaterName;
    private List<CinemaDto> cinemaDtoList;

    @Builder
    public TimeTableDto(Long mid, String mtitle, Integer mtime, String mrating,
                        String theaterName, List<CinemaDto> cinemaDtoList) {
        this.mid = mid;
        this.mtitle = mtitle;
        this.mtime = mtime;
        this.mrating = mrating;
        this.theaterName = theaterName;
        this.cinemaDtoList = cinemaDtoList;
    }
}



