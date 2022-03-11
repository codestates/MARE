import React from "react";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";

const serverPath = process.env.REACT_APP_SERVER_PATH;
// 환경변수에 저장되어 있는 서버 주소

export const EnterPassword = ({ loginToken }) => {
  const [password, setPassword] = useState("");
  // 패스워드
  const [disabled, setDisabled] = useState(false);
  // 문제가 있으면
  const [activeEnterBtn, setActiveEnterBtn] = useState(false);

  // #.2
  // 비밀번호 이밴트 핸들러 -> 상태변경
  //
  const PasswordHandler = (event) => {
    console.log(event, "너뭐야");
    setPassword(event.target.value);
  };

  // #.4
  const passwordCheck = async (e) => {
    // 작성된 패스워드를 post로 요청 보낸다(패스워드 확인)
    e.preventDefault();

    const headers = {
      headers: {
        Authorization: `Bearer ${loginToken}`,
      },
    };
    const res = await axios.post(
      `${serverPath}/users/password`,
      { password: password },
      headers
    );

    if (res.status === 200) {
      setActiveEnterBtn(true);
    } else {
      setActiveEnterBtn(false);
    }
  };

  const checkPassword = () => {
    // 입력된 패스워드가 맞는 지 확인하기 위한 함수
    axios.patch(`${serverPath}/users/password`, { password: password });
  };

  return (
    <div>
      <form>
        {/* 비밀번호 입력 */}
        <div className="password_input">
          <h3>비밀번호 수정을 위해 비밀번호를 입력해주세요.</h3>
          <input
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={PasswordHandler}
          />
        </div>
        <br />
        {/* 비밀번호 입력버튼 */}
        <div className="password_enter">
          <button onClick={passwordCheck}>
            <h3>비밀번호 입력버튼</h3>
          </button>
        </div>
      </form>
    </div>
  );
};
