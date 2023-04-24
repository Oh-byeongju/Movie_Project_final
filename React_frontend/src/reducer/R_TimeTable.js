/*
	23-04-22 ~ 24 상영 시간표 페이지 리듀서 수정(오병주)
*/
// 영화 목록 조회 리스트
export const TIMETABLE_MOVIE_LIST_REQUEST = "TIMETABLE_MOVIE_LIST_REQUEST";
export const TIMETABLE_MOVIE_LIST_SUCCESS = "TIMETABLE_MOVIE_LIST_SUCCESS";
export const TIMETABLE_MOVIE_LIST_FAILURE = "TIMETABLE_MOVIE_LIST_FAILURE";
export const TIMETABLE_MOVIE_SELECT = "TIMETABLE_MOVIE_SELECT";
export const TIMETABLE_AREA_SELECT = "TIMETABLE_AREA_SELECT";

// 극장 목록 조회 리스트
export const TIMETABLE_THEATER_LIST_REQUEST = "TIMETABLE_THEATER_LIST_REQUEST";
export const TIMETABLE_THEATER_LIST_SUCCESS = "TIMETABLE_THEATER_LIST_SUCCESS";
export const TIMETABLE_THEATER_LIST_FAILURE = "TIMETABLE_THEATER_LIST_FAILURE";
export const TIMETABLE_THEATER_SELECT = "TIMETABLE_THEATER_SELECT";

// 날짜 목록 조회 리스트
export const TIMETABLE_DAY_LIST_REQUEST = "TIMETABLE_DAY_LIST_REQUEST";
export const TIMETABLE_DAY_LIST_SUCCESS = "TIMETABLE_DAY_LIST_SUCCESS";
export const TIMETABLE_DAY_LIST_FAILURE = "TIMETABLE_DAY_LIST_FAILURE";
export const TIMETABLE_DAY_SELECT = "TIMETABLE_DAY_SELECT";

// 상영정보 조회 리스트(영화선택)
export const TIMETABLE_MOVIEINFO_LIST_MOVIE_REQUEST = "TIMETABLE_MOVIEINFO_LIST_MOVIE_REQUEST";
export const TIMETABLE_MOVIEINFO_LIST_MOVIE_SUCCESS = "TIMETABLE_MOVIEINFO_LIST_MOVIE_SUCCESS";
export const TIMETABLE_MOVIEINFO_LIST_MOVIE_FAILURE = "TIMETABLE_MOVIEINFO_LIST_MOVIE_FAILURE";

// 상영정보 조회 리스트(극장선택)
export const TIMETABLE_MOVIEINFO_LIST_THEATER_REQUEST = "TIMETABLE_MOVIEINFO_LIST_THEATER_REQUEST";
export const TIMETABLE_MOVIEINFO_LIST_THEATER_SUCCESS = "TIMETABLE_MOVIEINFO_LIST_THEATER_SUCCESS";
export const TIMETABLE_MOVIEINFO_LIST_THEATER_FAILURE = "TIMETABLE_MOVIEINFO_LIST_THEATER_FAILURE";



// 아래로 수정
export const MOVIE_DATAS = "MOVIE_DATAS";
export const AREA_DATAS = "AREA_DATAS"
export const THEATER_DATAS="THEATER_DATAS" 
export const DAY_DATAS = "DAY_DATAS"

export const MOVIE_REQUEST = "MOVIE_REQUEST"
export const MOVIE_SUCCESS = "MOVIE_SUCCESS"
export const MOVIE_FAILURE = "MOVIE_FAILURE"

export const SELECT_SC_THEATER_REQUEST = "SELECT_SC_THEATER_REQUEST"
export const SELECT_SC_THEATER_SUCCESS = "SELECT_SC_THEATER_SUCCESS"
export const SELECT_SC_THEATER_FAILURE = "SELECT_SC_THEATER_FAILURE"


const initalState = {
	MOVIE_LIST_loading: false,
  MOVIE_LIST_done: false,
  MOVIE_LIST_error: false,
	MOVIE_LIST: [],
	MOVIE: '',
	AREA: '서울',

	THEATER_LIST_loading: false,
  THEATER_LIST_done: false,
  THEATER_LIST_error: false,
	THEATER_LIST: [],
	THEATER: '',

	DAY_LIST_loading: false,
  DAY_LIST_done: false,
  DAY_LIST_error: false,
	DAY_LIST: [],
	DAY: '',

	MOVIEINFO_LIST_MOVIE_loading: false,
  MOVIEINFO_LIST_MOVIE_done: false,
  MOVIEINFO_LIST_MOVIE_error: false,
	MOVIEINFO_LIST_MOVIE: [],

	MOVIEINFO_LIST_THEATER_loading: false,
  MOVIEINFO_LIST_THEATER_done: false,
  MOVIEINFO_LIST_THEATER_error: false,
	MOVIEINFO_LIST_THEATER: [],

	// 아래로 수정
    select_theater_loading:false,
    select_theater_done:false,
    select_theater_error:null,

    MOVIE_loading:false,
    MOVIE_done:false,
    MOVIE_error:null,

    day_loading:false,
    day_done:false,
    day_error:null,
    theater:[],
    area:"",
    movie:[],
    city:"",
    date:[],
    allMovie:[],
    dayone:""
};

const R_TimeTable = (state = initalState, action) => {
	switch (action.type) {
		// 영화 조회 케이스들
    case TIMETABLE_MOVIE_LIST_REQUEST:
      return {
        ...state,
        MOVIE_LIST_loading: true,
        MOVIE_LIST_done: false,
        MOVIE_LIST_error: false
      };
    case TIMETABLE_MOVIE_LIST_SUCCESS:
      return {
        ...state,
        MOVIE_LIST_loading: false,
        MOVIE_LIST_done: true,
        MOVIE_LIST_error: false,
        MOVIE_LIST: action.data,
        MOVIE: action.data[0]
      };
    case TIMETABLE_MOVIE_LIST_FAILURE:
      return {
        ...state,
        MOVIE_LIST_loading: false,
        MOVIE_LIST_done: false,
        MOVIE_LIST_error: true
      };
    case TIMETABLE_MOVIE_SELECT:
      return {
        ...state,
        MOVIE: action.data
      };
		case TIMETABLE_AREA_SELECT:
			return {
				...state,
				AREA: action.data
			};
		// 극장 조회 케이스들
		case TIMETABLE_THEATER_LIST_REQUEST:
			return {
				...state,
				THEATER_LIST_loading: true,
				THEATER_LIST_done: false,
				THEATER_LIST_error: false
			};
		case TIMETABLE_THEATER_LIST_SUCCESS:
			return {
				...state,
				THEATER_LIST_loading: false,
				THEATER_LIST_done: true,
				THEATER_LIST_error: false,
				THEATER_LIST: action.data,
				THEATER: action.data[0]
			};
		case TIMETABLE_THEATER_LIST_FAILURE:
			return {
				...state,
				THEATER_LIST_loading: false,
				THEATER_LIST_done: false,
				THEATER_LIST_error: true
			};
		case TIMETABLE_THEATER_SELECT:
			return {
				...state,
				THEATER: action.data
			};
		// 날짜 조회 케이스들
		case TIMETABLE_DAY_LIST_REQUEST:
			return {
				...state,
				DAY_LIST_loading: true,
				DAY_LIST_done: false,
				DAY_LIST_error: false
			};
		case TIMETABLE_DAY_LIST_SUCCESS:
			return {
				...state,
				DAY_LIST_loading: false,
				DAY_LIST_done: true,
				DAY_LIST_error: false,
				DAY_LIST: action.data,
				DAY: action.data[0].miday
			};
		case TIMETABLE_DAY_LIST_FAILURE:
			return {
				...state,
				DAY_LIST_loading: false,
				DAY_LIST_done: false,
				DAY_LIST_error: true
			};
		case TIMETABLE_DAY_SELECT:
			return {
				...state,
				DAY: action.data
			};
		// 상영정보 조회(영화선택) 케이스들
		case TIMETABLE_MOVIEINFO_LIST_MOVIE_REQUEST:
			return {
				...state,
				MOVIEINFO_LIST_MOVIE_loading: true,
				MOVIEINFO_LIST_MOVIE_done: false,
				MOVIEINFO_LIST_MOVIE_error: false
			};
		case TIMETABLE_MOVIEINFO_LIST_MOVIE_SUCCESS:
			return {
				...state,
				MOVIEINFO_LIST_MOVIE_loading: false,
				MOVIEINFO_LIST_MOVIE_done: true,
				MOVIEINFO_LIST_MOVIE_error: false,
				MOVIEINFO_LIST_MOVIE: action.data
			};
		case TIMETABLE_MOVIEINFO_LIST_MOVIE_FAILURE:
			return {
				...state,
				MOVIEINFO_LIST_MOVIE_loading: false,
				MOVIEINFO_LIST_MOVIE_done: false,
				MOVIEINFO_LIST_MOVIE_error: true
			};
		// 상영정보 조회(극장선택) 케이스들
		case TIMETABLE_MOVIEINFO_LIST_THEATER_REQUEST:
			return {
				...state,
				MOVIEINFO_LIST_THEATER_loading: true,
				MOVIEINFO_LIST_THEATER_done: false,
				MOVIEINFO_LIST_THEATER_error: false
			};
		case TIMETABLE_MOVIEINFO_LIST_THEATER_SUCCESS:
			return {
				...state,
				MOVIEINFO_LIST_THEATER_loading: false,
				MOVIEINFO_LIST_THEATER_done: true,
				MOVIEINFO_LIST_THEATER_error: false,
				MOVIEINFO_LIST_THEATER: action.data
			};
		case TIMETABLE_MOVIEINFO_LIST_THEATER_FAILURE:
			return {
				...state,
				MOVIEINFO_LIST_THEATER_loading: false,
				MOVIEINFO_LIST_THEATER_done: false,
				MOVIEINFO_LIST_THEATER_error: true
			};




		// 아래로 수정
		//전체 영화 검색 movie reduecer 의 값 변경이 안되서 새로 만듬
			case MOVIE_DATAS:
					return{
							...state,
							movie:action.data
					}
			case AREA_DATAS:
				return{
					...state,
					area:action.data,
				}
			case THEATER_DATAS:
				return{
					...state,
					city:action.data
				}
			case DAY_DATAS:
				return{
					...state,  
					dayone:action.data
				}
			case SELECT_SC_THEATER_REQUEST:
				return{
					...state,
					select_theater_loading:true,
					select_theater_done:false,
					select_theater_error:null,
				}
			case SELECT_SC_THEATER_SUCCESS:
				return{
					...state,
					select_theater_loading:false,
					select_theater_done:true,
					select_theater_error:null,
					theater:action.data
				}
			case SELECT_SC_THEATER_FAILURE:
				return{
					...state,
					select_theater_loading:false,
					select_theater_done:false,
					select_theater_error:action.error,
				}

				case MOVIE_REQUEST:
					return{
						...state,
						MOVIE_loading:true,
						MOVIE_done:false,
						MOVIE_error:null,
					}
				case MOVIE_SUCCESS:
					return{
						...state,
						MOVIE_loading:false,
						MOVIE_done:true,
						MOVIE_error:null,
						allMovie:action.data
					}
				case MOVIE_FAILURE:
					return{
						...state,
						MOVIE_loading:false,
						MOVIE_done:false,
					MOVIE_error:action.error,
					}

		default:
			return state;
	}
};

export default R_TimeTable;
  