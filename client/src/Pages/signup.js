import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Topbar } from "../Components/topbar";
import { useNavigate } from "react-router-dom";

const serverPath = process.env.REACT_APP_SERVER_PATH;
// api 주소

const Container = styled.div`
  height: 600px;
  box-sizing: border-box;
  padding: 10px;
  `

const InputSet = styled.div`
  display: flex;
`
const Input = styled.input`
    width: 200px;
    height: 30px;
    margin-top: 2px;
    margin-bottom: 7px;
    margin-left: -1px;
  `

const InputTitle = styled.h3`
  margin-top: 15px;
  font-size: 1.1rem;
  font-weight: bold;
`

const StyledValidateBtn = styled.div`
  display: grid;
  place-items: center;
  margin-left: 7px;
  width: 63px;
  height: 33px;
  border: 1px solid gray;
  background-color: #fff;
  cursor : pointer
`

const StyledSubmitBtn = styled.button`
  margin-top: 20px;
  width: 100%;
  height: 35px;
  font-size: 1rem;
`

const Signup = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const [isNotUsingEmail, setIsNotUsingEmail] = useState(false);
  const [isNotUsingNickname, setIsNotUsingNickname] = useState(false);
  const [activeSubmit, setActiveSubmit] = useState(false);

  const nav = useNavigate()

  useEffect(() => {
    if (
      isNotUsingEmail &&
      isNotUsingNickname &&
      password === checkPassword &&
      password.length > 0
    ) {
      setActiveSubmit(true);
    } else {
      setActiveSubmit(false);
    }
  }, [isNotUsingEmail, isNotUsingNickname, password, checkPassword]);

  function validateEmail(email) {
    // 이메일 유효성 검사(스택 오버플로)
    const re =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }

  const setValue = (e, setTarget) => {
    // input에 입력된 값을 원하는 상태에 저장합니다.
    setTarget(e.target.value);
  };

  const emailValidateCheck = async () => {
    // 이메일의 중복여부를 API를 이용하여 확인한다.
    const res = await axios.post(`${serverPath}/users/email`, {
      email: email,
    });
    if (res.status === 200) {
      setIsNotUsingEmail(true);
    } else {
      setIsNotUsingEmail(false);
    }
  };
  const nicknameValidateCheck = async () => {
    // 닉네임의 중복여부를 API를 이용하여 확인한다.
    const res = await axios.post(`${serverPath}/users/nickname`, {
      nickname: nickname,
    });

    if (res.status === 200) {
      setIsNotUsingNickname(true);
    } else {
      setIsNotUsingNickname(false);
    }
  };

  const signinHandler = async () => {
    // 작성된 내용을 요청의 바디로 전달한다.
    const res = await axios.post(`${serverPath}/users/signup`, {
      email: email,
      nickname: nickname,
      password: password,
    });
    if (res.status === 201) {
      nav("/login")
    }
  };

  const ValidateBtn = ({ validCheckFn }) => {
    // 중복확인 버튼을 누를 경우 해당하는 함수를 실행합니다.
    return <StyledValidateBtn onClick={validCheckFn}>중복확인</StyledValidateBtn>;
  };

  const SubmitBtn = () => {
    return activeSubmit ? (
      <StyledSubmitBtn onClick={signinHandler}>회원가입 하기</StyledSubmitBtn>
    ) : (
        <StyledSubmitBtn disabled>회원가입 하기</StyledSubmitBtn>
    );
  };

  const EmailNotification = () => {
    if (email.length === 0) {
      return <span></span>;
    }
    if (!validateEmail(email)) {
      return <span>올바른 이메일을 입력하세요.</span>;
    }
    if (!isNotUsingEmail && email.length > 0 && validateEmail(email)) {
      return <span>이메일 중복확인을 해주세요.</span>;
    }
    if (isNotUsingEmail && email.length > 0 && validateEmail(email)) {
      return <span>사용 가능한 이메일입니다.</span>;
    }
  };

  const NicknameNotification = () => {
    if (nickname.length === 0) {
      return <span></span>;
    }
    if (nickname.length < 2) {
      return <span>닉네임은 2글자 이상입니다.</span>;
    }
    if (!isNotUsingNickname && nickname.length > 1) {
      return <span>닉네임 중복확인을 해주세요.</span>;
    }
    if (isNotUsingNickname && nickname.length > 1) {
      return <span>사용 가능한 닉네임입니다.</span>;
    }
  };

  return (
    <div>
      <Topbar pageTitle={"회원가입"} />
      <Container>
        {/* 이메일 입력 */}
        <InputTitle>이메일 입력</InputTitle>
        <InputSet>
          <Input
            type="email"
            placeholder="이메일 입력"
            onChange={(e) => {
              setValue(e, setEmail);
              setIsNotUsingEmail(false);
            }}
          />
          <ValidateBtn validCheckFn={emailValidateCheck} />
        </InputSet>
          <div>
            <EmailNotification />
          </div>
        

        {/* 닉네임 입력 */}
        <InputTitle>닉네임 입력</InputTitle>
        <InputSet>
          <Input
            type="text"
            placeholder="닉네임 입력"
            onChange={(e) => {
              setValue(e, setNickname);
              setIsNotUsingNickname(false);
            }}
          />
          <ValidateBtn validCheckFn={nicknameValidateCheck} />
        </InputSet>
          <div>
            <NicknameNotification />
          </div>
        

        {/* 비밀번호 */}
        <div className="password_input">
          <InputTitle>비밀번호 입력</InputTitle>
          <Input
            type="password"
            placeholder="비밀번호 입력"
            onChange={(e) => setValue(e, setPassword)}
          />
        </div>

        {/* 비밀번호 체크 */}
        <div className="password_check_input">
          <InputTitle>비밀번호 확인</InputTitle>
          <Input
            type="password"
            placeholder="비밀번호 확인"
            onChange={(e) => {
              setValue(e, setCheckPassword);
            }}
          />
        </div>
        <div>
          {password === checkPassword ? (
            <span></span>
          ) : (
            <span>비밀번호가 다릅니다!</span>
          )}
        </div>
        <SubmitBtn />
      </Container>
    </div>
  );
};

export default Signup;
