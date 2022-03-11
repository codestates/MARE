import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Topbar } from "../Components/topbar";

const Container = styled.div`
  display: grid;
  place-items: center;
  width: 400px;
  height: 600px;
  background-color: #dfd5d2;
`;
const Logo = styled.img`
  width: 200px;
  height: 200px;
  margin-bottom: 30px;
`;
const Form = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Input = styled.input`
  margin-bottom: 10px;
  width: 200px;
  height: 30px;
`;

const Btn = styled.div`
  display: grid;
  place-items: center;
  width: 200px;
  height: 35px;
  background-color: #fff;

  margin-top: 5px;
  border: 1px solid #000;

  border-radius: 5px;
  cursor: pointer;
`;

const Column = styled.div``;

const Slink = styled(Link)`
  cursor: pointer;
  &:nth-child(2) {
    margin-left: 1%;
    border-left: 1px solid black;
    border-right: 1px solid black;
    padding: 0 10px;
  }
  &:nth-child(3) {
    margin-left: 1%;
  }
  &:hover {
    transition: 0.2s;
    opacity: 0.5;
  }
`;

const serverPath = process.env.REACT_APP_SERVER_PATH;

export const Login = ({ loginToken }) => {
  // App.js에서 전달받은 프롭스(loginToken)
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [newToken, setNewToken] = useState("");

  const nav = useNavigate();

  const login = async () => {
    // 요청 전달
    const response = await axios.post(
      `${serverPath}/users/login`,
      { email: email, password: pass },
      { headers: { "Content-Type": "application/json;charset=utf-8" } }
    );
    return response;
  };

  useEffect(() => {
    loginToken(newToken);
  }, [newToken]);
  //App.js 전달 받은 상태를 변경해서 전달해주기위함

  const submit = async (e) => {
    // 이메일과 패스워드를 바디로 보내주고 토큰의 상태를 갱신해주는 함수
    e.preventDefault();
    const ok = await login(email, pass);
    if (ok) {
      setNewToken(ok.data.data.accessToken);
    }
    if(ok.status === 200){
      nav("/my_recipes")
    }
  };

  const goToSignup = () => {
    nav("/signup");
  };

  return (
    <div>
      <Topbar pageTitle={"로그인"} />
      <Container>
        <Form>
          <Logo src="https://i.ibb.co/BHJGf1B/76e4875b4e52.png" />
          <Input
            placeholder="아이디"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="비밀번호"
            type="password"
            onChange={(e) => setPass(e.target.value)}
          />
          <Btn onClick={submit}>로그인</Btn>
          <Btn onClick={goToSignup}>회원가입</Btn>
        </Form>
      </Container>
    </div>
  );
};
