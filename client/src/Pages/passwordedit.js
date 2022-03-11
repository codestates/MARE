import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";

const serverPath = process.env.REACT_APP_SERVER_PATH;

export const PasswordEdit = ({ loginToken }) => {
  const [newPassword, setNewPassword] = useState("");
  // 새로운 패스워드
  // 쓰임새 1 : 밑에 새로운 비밀번호 버튼
  const [passwordCheck, setPasswordCheck] = useState("");
  // 패스워드 체크
  // 쓰임새 1 : 밑에 비밀번호 확인 버튼
  const [disabled, setDisabled] = useState(false);
  // 문제가 있으면
  const [activeSubmit, setActiveSubmit] = useState(false);
  // 비밀번호 변경하기 (조건이 다 성립)

  useEffect(() => {
    if (newPassword === passwordCheck && newPassword.length > 0) {
      setActiveSubmit(true);
    } else {
      setActiveSubmit(false);
    }
  }, [newPassword, passwordCheck]);

  // 새로운 비밀번호 핸들러
  const onPasswordHandler = (event) => {
    setNewPassword(event.target.value);
  };

  // 새로운 비밀번호 체크 핸들러
  const onCheckedPasswordHandler = (event) => {
    setPasswordCheck(event.target.value);
  };

  const changePassword = async (e) => {
    // changePassword의 변경여부를 API를 이용하여 확인한다.
    e.preventDefault();

    const headers = {
      headers: {
        Authorization: `Bearer ${loginToken}`,
      },
    };

    const res = await axios.patch(
      `${serverPath}/users/data`,
      { password: newPassword },
      headers
    );
  };

  const SubmitBtn = () => {
    return activeSubmit ? (
      <button onClick={changePassword}>비밀번호 변경하기</button>
    ) : (
      <button disabled>비밀번호 변경하기</button>
    );
    // disabled 로 인해 조건이 성립하면 비밀번호 변경하기 창이 활성화 비활성화 된다.
  };

  return (
    <div>
      {/* 버튼 클릭시 반응 _ 메세지 문구 */}
      <form>
        <div className="newpassword_input">
          <h3>새로운 비밀번호 입력</h3>
          <input
            type="password"
            placeholder="새로운 비밀번호 입력"
            value={newPassword}
            onChange={onPasswordHandler}
          />
        </div>

        <div className="passwordcheck_input">
          <h3>새로운 비밀번호 확인</h3>
          <input
            type="password"
            placeholder="새로운 비밀번호 확인"
            value={passwordCheck}
            onChange={onCheckedPasswordHandler}
          />
          {newPassword === passwordCheck ? (
            <span></span>
          ) : (
            <span>비밀번호가 다릅니다!</span>
          )}
        </div>
        <SubmitBtn />
        <hr />
        <hr />
      </form>
    </div>
  );
};
