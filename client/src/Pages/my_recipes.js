import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Thumbnail } from "../Components/thumbnail";
import { Topbar } from "../Components/topbar";

const serverPath = process.env.REACT_APP_SERVER_PATH;

const Container = styled.div`
  width: 400px;
  min-height: 600px;
  background-color: #dfd5d2;
  overflow: scroll;
`
const Message = styled.div`
  display: grid;
  width: 100%;
  height: 600px;
  place-items: center;
`

export const MyRecipes = ({ loginToken }) => {
  const [recipeList, setRecipeList] = useState([]);

  const headers = {
    headers: {
      Authorization: `Bearer ${loginToken}`,
    },
  };
  const getData = async () => {
    await axios.get(`${serverPath}/recipe/content`, headers).then((res) => {
      setRecipeList(res.data.data.recipe);
    });
  };

  const Thumbnails = () => {
    if (recipeList.length > 0) {
      return recipeList.map((el) => {
        return <Thumbnail key={el._id} data={el} />;
      });
    } else {
      return <Message>등록한 레시피가 없습니다.</Message>
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Topbar pageTitle={"나의 레시피"} />
      <Container>
        <Thumbnails />
      </Container>
    </div>
  );
};
