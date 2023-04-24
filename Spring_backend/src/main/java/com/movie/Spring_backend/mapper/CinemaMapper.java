package com.movie.Spring_backend.mapper;

import com.movie.Spring_backend.dto.CinemaDto;
import com.movie.Spring_backend.dto.MovieInfoDto;
import com.movie.Spring_backend.entity.MovieInfoEntity;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class CinemaMapper {
    // 상영관에 있는 상영정보 매핑해주는 메소드(상영시간표에 사용)
    public List<CinemaDto> MappingCinemaUseTheater(List<Long> cinemaIds, List<MovieInfoEntity> entityList) {

        List<CinemaDto> cinemas = new ArrayList<>();
        // 반복문 시작하는 위치
        int start = 0;

        // 상영관 ID 개수만큼 반복
        for (Long cid : cinemaIds) {
            List<MovieInfoDto> movieInfos = new ArrayList<>();

            // 매개변수로 전달받은 movieInfo 리스트 크기만큼 반복
            for (int i = start; i < entityList.size(); i++) {
                // 반복되고 있는 리스트들의 상영관 ID가 같을경우
                if (entityList.get(i).getCinema().getCid().equals(cid)) {
                    // 상영정보 배열에 값 추가
                    movieInfos.add(MovieInfoDto.builder()
                            .miid(entityList.get(i).getMiid())
                            .mistarttime(entityList.get(i).getMistarttime())
                            .miendtime(entityList.get(i).getMiendtime())
                            .cntSeatInfo(entityList.get(i).getCntSeatInfo()).build());
                    // 반복문의 시작위치 조정을 위해 변수값 조정
                    start++;
                }
                // ID 값이 다를경우 break
                else {
                    break;
                }
            }
            // 가공된 정보 삽입
            cinemas.add(CinemaDto.builder()
                    .cid(entityList.get(start-1).getCinema().getCid())
                    .cseat(entityList.get(start-1).getCinema().getCseat())
                    .ctype(entityList.get(start-1).getCinema().getCtype())
                    .cname(entityList.get(start-1).getCinema().getCname())
                    .tname(entityList.get(start-1).getCinema().getTheater().getTname())
                    .movieInfoDtoList(movieInfos).build());
        }
        return cinemas;
    }



    // dlrp이게 좀 이상함 고쳐야함함 매핑을 다시 생각해보기
    //상영번호로 하는게 아니라...

    //상영관에 있는 상영정보 매핑해주는 메소드(상영시간표에 사용)
    public List<CinemaDto> MappingCinemaUseMovie(List<Long> cinemaIds, List<MovieInfoEntity> entityList) {

        List<CinemaDto> cinemas = new ArrayList<>();
        // 반복문 시작하는 위치
        int start = 0;

        // 상영관 ID 개수만큼 반복
        for (Long cid : cinemaIds) {
            List<MovieInfoDto> movieInfos = new ArrayList<>();

            // 매개변수로 전달받은 movieInfo 리스트 크기만큼 반복
            for (int i = start; i < entityList.size(); i++) {
                // 반복되고 있는 리스트들의 상영관 ID가 같을경우
                if (entityList.get(i).getCinema().getCid().equals(cid)) {
                    // 상영정보 배열에 값 추가
                    movieInfos.add(MovieInfoDto.builder()
                            .miid(entityList.get(i).getMiid())
                            .mistarttime(entityList.get(i).getMistarttime())
                            .miendtime(entityList.get(i).getMiendtime())
                            .cntSeatInfo(entityList.get(i).getCntSeatInfo()).build());
                    // 반복문의 시작위치 조정을 위해 변수값 조정
                    start++;
                }
                // ID 값이 다를경우 break
                else {
                    break;
                }
            }
            // 가공된 정보 삽입
            cinemas.add(CinemaDto.builder()
                    .cid(entityList.get(start-1).getCinema().getCid())
                    .cseat(entityList.get(start-1).getCinema().getCseat())
                    .ctype(entityList.get(start-1).getCinema().getCtype())
                    .cname(entityList.get(start-1).getCinema().getCname())
                    .mid(entityList.get(start-1).getMovie().getMid())
                    .mtitle(entityList.get(start-1).getMovie().getMtitle())
                    .mtime(entityList.get(start-1).getMovie().getMtime())
                    .mrating(entityList.get(start-1).getMovie().getMrating())
                    .movieInfoDtoList(movieInfos).build());
        }
        return cinemas;
    }
}
