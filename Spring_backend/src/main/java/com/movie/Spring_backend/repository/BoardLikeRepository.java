package com.movie.Spring_backend.repository;

import com.movie.Spring_backend.entity.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BoardLikeRepository extends JpaRepository<BoardLikeEntity, Long> {
    // 게시물 좋아요 조회 메소드
    Optional<BoardLikeEntity> findByBoardAndMemberAndBllikeTrueAndBoardcommentIsNull(BoardEntity board, MemberEntity member);

    // 게시물 싫어요 조회 메소드
    Optional<BoardLikeEntity> findByBoardAndMemberAndBlunlikeTrueAndBoardcommentIsNull(BoardEntity board, MemberEntity member);

    // 게시물 좋아요 삭제하는 메소드
    void deleteByBoardAndMemberAndBllikeTrueAndBoardcommentIsNull(BoardEntity board, MemberEntity member);

    // 게시물 싫어요 삭제하는 메소드
    void deleteByBoardAndMemberAndBlunlikeTrueAndBoardcommentIsNull(BoardEntity board, MemberEntity member);

    // 댓글 좋아요 조회 메소드
    List<BoardLikeEntity> findByBoardAndMemberAndBllikeTrueAndBoardcommentIsNotNull(BoardEntity board, MemberEntity member);

    // 댓글 싫어요 조회 메소드
    List<BoardLikeEntity> findByBoardAndMemberAndBlunlikeTrueAndBoardcommentIsNotNull(BoardEntity board, MemberEntity member);

    // 아래로 수정
    // 옵셔널 써라
    // jpql 안써도 되는애들이 많은듯

//    //삭제, 댓글좋아요 // 이것들 다 이상함
//    @Modifying
//    @Query("delete from BoardLikeEntity as bl where bl.board.bid = :bid and bl.member.uid = :uid " +
//            "and bl.bllike = true and bl.blunlike = false and bl.boardcomment.bcid = :bcid")
//    void CommentDeleted(@Param("bid")Long bid, @Param("uid")String uid,
//                               @Param("bcid")Long bcid);

}
