import axios from "axios";
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { Topbar } from "../Components/topbar";

// get요청으로 유저정보 먼저 불러오기
// post요청으로 수정 버튼 누르기전 페이지(계정 정보창)으로 바로 이동
// 유저의 닉네임만 타겟으로 잡고 정보 변경
// onkeyup이용해서 형식에 맞는지 아닌지 판별 후
// 성공이라면 상태 변경으로 바뀐 닉네임 값 저장
// 저장후 새로고침 필요없음

const Container = styled.div``;

const Form = styled.form``;

const Input = styled.input``;

const Column = styled.div``;

const Button = styled.button``;

// 컴포넌트 태그 모음

// Navigate 추가할 것
const serverPath = process.env.REACT_APP_SERVER_PATH;
// env에 저장된 서버 주소

export const ChangeNick = () => {
  const [nick, setNick] = useState("");
  const [activeChangeBtn, setActiveChangeBtn] = useState(false);

  const nickValue = (e) => {
    // 입력된 닉네임(input)을 타겟으로 지정해서 상태 변경
    setNick(e.target.value);
  };

  const nickCheck = async (e) => {
    // 작성된 닉네임을 post로 요청 보낸다(중복 확인)
    e.preventDefault();
    const res = await axios.post(
      `${serverPath}/users/nickname`,
      { nickname: nick },
      { headers: { "Content-Type": "application/json;charset=utf-8" } }
    );
    if (res.status === 200) {
      setActiveChangeBtn(true);
    } else {
      setActiveChangeBtn(false);
    }
  };

  // 중복확인 끝

  const changeNickname = () => {
    // 바뀐 닉네임을 저장하기 위한 함수
    axios.patch(`${serverPath}/users/data`, { nickname: nick });
  };

  return (
    <Container>
      <Form>
        <Topbar pageTitle={"닉네임 변경"} />
        <Column>
          <Input
            onChange={nickValue}
            placeholder="변경할 닉네임을 입력해 주세요"
          ></Input>
        </Column>
        <Column>
          <Button onClick={nickCheck}>중복확인</Button>
        </Column>
        <Column>
          {activeChangeBtn ? (
            <button onClick={changeNickname}>수정 완료</button>
          ) : (
            <button disabled>수정 완료</button>
          )}
        </Column>
      </Form>
    </Container>
  );
};
