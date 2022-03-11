import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Topbar } from "../Components/topbar";

const Container = styled.div``;

const Slink = styled(Link)``;

const Button = styled.button``;

const Content = styled.span``;

const Column = styled.div``;

const serverPath = process.env.REACT_APP_SERVER_PATH;

export const Userinfo = ({ loginToken }) => {
  // loginToken에 토큰 들어옴(로그인 해서 확인해 볼 것)
  // 토큰 저장을 위한 변수
  const [user, setUser] = useState({});
  // 유저 상태 저장하기 위한 변수들
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const headers = {
    headers: {
      Authorization: `Bearer ${loginToken}`,
    },
  };

  const getUserInfo = async () => {
    await axios.get(`${serverPath}/users/data`, headers).then((res) => {
      setUser(res.data.data.userInfo);
    });
  };
  // 유저 정보 받아오는 변수
  const deleteUser = async () => {
    await axios.delete(`${serverPath}/users/signout`, {
      headers: {
        Authorization: `Bearer ${loginToken}`,
      },
    });
  };
  // 유저정보 삭제
  useEffect(() => {
    getUserInfo();
  }, []);
  // useEffect사용으로 getUserInfo함수를 실행 하고, 빈배열 추가로 렌더링 될 때만 실행하도록 설정
  // 빈배열 없으면? 무한 함수 실행

  return (
    <Container>
      <Topbar pageTitle={"내계정관리"} />
      <Column>
        <Content>닉네임</Content>
        <Content>{user.nickname}</Content>
      </Column>
      <Column>
        <Content>이메일</Content>
        <Content>{user.email}</Content>
      </Column>
      <Column>
        <Slink to="../changenick">닉네임 수정</Slink>
      </Column>
      <Column>
        <Slink to="../passwordedit">비밀번호 수정</Slink>
      </Column>
      <Button
        to="/"
        onClick={async () => {
          await deleteUser(token);
          localStorage.removeItem("token");
          navigate("/");
        }}
      >
        탈퇴
      </Button>
    </Container>
  );
};
