import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboard,
  faSquarePlus,
  faStar,
  faUser,
} from "@fortawesome/free-regular-svg-icons";

const Container = styled.div`
  display: flex;
`;

const MenuBtn = styled.div`
  background-color: #b8aeab;
  box-sizing: border-box;
  width: 100px;
  height: 60px;
`;

const SLink = styled(Link)`
  display: grid;
  grid-gap: 5px;
  place-items: center;
  margin-top: 5px;
  text-align: center;
  color: #fff;
  text-decoration: none;
`;

export const Navbar = () => {
  return (
    <Container>
      <MenuBtn>
        <SLink to="my_recipes">
          <FontAwesomeIcon icon={faClipboard} size="2x" />
          나의 레시피
        </SLink>
      </MenuBtn>
      <MenuBtn>
        <SLink to="favorites">
          <FontAwesomeIcon icon={faStar} size="2x" />
          즐겨찾기
        </SLink>
      </MenuBtn>
      <MenuBtn>
        <SLink to="add_recipe">
          <FontAwesomeIcon icon={faSquarePlus} size="2x" />
          레시피 추가
        </SLink>
      </MenuBtn>
      <MenuBtn>
        <SLink to="mypage">
          <FontAwesomeIcon icon={faUser} size="2x" />
          마이페이지
        </SLink>
      </MenuBtn>
    </Container>
  );
};
