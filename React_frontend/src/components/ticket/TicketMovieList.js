/*
	23-04-28 예매 페이지 영화 컴포넌트 수정(오병주)
*/
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import styled from "styled-components";
import { TICKET_MOVIE_LIST_REQUEST, TICKET_MOVIE_SELECT, TICKET_MOVIE_RESET } from "../../reducer/R_ticket";

const TicketMovieList = () => {
  const dispatch = useDispatch();

	// 필요한 리덕스 상태들
	const { MOVIE_LIST, MOVIE, THEATER, DAY } = useSelector(
		state => ({
			MOVIE_LIST: state.R_ticket.MOVIE_LIST,
			MOVIE: state.R_ticket.MOVIE,
			THEATER: state.R_ticket.THEATER,
			DAY: state.R_ticket.DAY
		}),
		shallowEqual
	);

	// 영화 조회 useEffect
  useEffect(() => {
		dispatch({
			type: TICKET_MOVIE_LIST_REQUEST,
			data: {
				miday: DAY.miday,
				tid: THEATER.tid
			}
		});
  }, [DAY, THEATER, dispatch]);

  // 영화를 선택하는 함수
  const onClickMovie = useCallback((movie) => {
		// 상영스케줄이 존재할 경우
		if (movie.reserve) {
			dispatch({
				type: TICKET_MOVIE_SELECT,
				data: movie
			});
		}
		// 상영스케줄이 없을경우
		else {
			if (!window.confirm("선택한 영화에 원하시는 상영스케줄이 없습니다.\n계속하겠습니까? (선택한 극장 및 날짜가 해제됩니다.)")) {
				return;
			}
			else {
				dispatch({
					type: TICKET_MOVIE_RESET,
					data: movie
				});
			}
		}
  }, [dispatch]);

	// 정렬 넣을꺼면 넣기
	// 다른곳에서 넘어왔을때 useRef로 스크롤 위치를 바꿔줘야하나 고민이 되기도함 --> 날짜도 마찬가지로

  return (
    <MovieWrapper>
      <MovieTitle>
        <p>
					영화
				</p>
      </MovieTitle>
      <MovieSelector>
        <MovieSelectorText>
					전체
				</MovieSelectorText>
      </MovieSelector>
      <MovieListWrapper>
        {MOVIE_LIST.map((movie) => 
					<MovieList title={movie.mtitle} key={movie.mid} onClick={() => {onClickMovie(movie);}} select_movie={MOVIE.mid} movie={movie.mid}>
            <MovieListMovieName className={movie.reserve ? "" : "disable"}>
              <Img src={`img/age/${movie.mrating}.png`} alt="영화" />
              {movie.mtitle}
            </MovieListMovieName>
          </MovieList>
        )}
      </MovieListWrapper>
    </MovieWrapper>
  );
};

const MovieWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
	border-left: 1px solid #d8d9db;
  border-right: 1px solid #d8d9db;
  background-color: #f2f0e5;
`;

const MovieTitle = styled.div`
  color: #222;
  position: relative;
  height: 33px;
  line-height: 33px;
  text-align: center;
  font-size: 20px;
  padding: 15px 0 15px 10px;
  font-weight: bold;
  top: -12px;

  p {
		margin-top: 14px;
    display: block;
    position: relative;
    left: -4px;
  }
`;

const MovieSelector = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
`;

const MovieSelectorText = styled.div`
  border: 1px solid #d8d9db;
  border-bottom: none;
  height: 35px;
  margin-left: 20px;
	margin-right: 20px;
  font-size: 16px;
  text-align: center;
  padding-top: 5px;
`;

const MovieListWrapper = styled.div`
	margin-top: 5px;
  padding: 10px 0px 10px 15px;
	width: 271px;
  height: 403px;
  display: flex;
  overflow-x: scroll;
  overflow-x: hidden;
  flex-direction: column;
`;

const MovieList = styled.div`
  clear: both;
  float: left;
  height: 35px;
  line-height: 35px;
  margin-bottom: 1px;
  position: relative;
  background-color: #f2f0e5;
  cursor: pointer;
	background-color: ${(props) => props.select_movie === props.movie ? "#333333" : "#f2f0e5"};
	color: ${(props) => props.select_movie === props.movie ? "white" : "black"};

  .disable {
    cursor: default;
    opacity: 0.5;
  }
`;

const MovieListMovieName = styled.div`
  font-size: 13px;
  margin-left: 10px;
	font-weight: 600;
	width: 235px;
	overflow: hidden;
  text-overflow: ellipsis;
	white-space: nowrap;
	display: inline-block;
`;

const Img = styled.img`
  width: 23px;
  height: 20px;
  position: relative;
  top: 5px;
  padding-right: 12px;
`;

export default TicketMovieList;
