import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from '@fortawesome/free-solid-svg-icons'

import { Topbar } from "../Components/topbar";
import { useParams } from "react-router-dom";

const serverPath = process.env.REACT_APP_SERVER_PATH

const Container = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  width: 400px;
  background-color: #dfd5d2;
`
const RecipeImg = styled.div`
  position : relative;
  display: grid;
  place-items: center;
  width: 400px;
  height: 200px;
  background: url(${props => props.bg});
  background-size: cover;
  background-position: center;

  color: ${props => props.bg ? 'transparent' : 'black'} ;
`

const RecipeTitle = styled.h2`
  margin: 5px 0;
  font-size: 1.2rem;
  font-weight: bold;
`

const Title = styled.h3`
  margin: 5px 0;
`

const BookmarkBtn = styled(FontAwesomeIcon)`
  position : absolute;
  top: 10px;
  right: 10px;

  color : ${props => props.bookmarked ? "#F4406A" : "#aaa"};
  /* 북마크 여부에 따라 조건부 렌더링 */
  cursor: pointer;
`
const ILists = styled.div`
    display: flex;
    margin: 5px 0;
    width: 400px;
    justify-content: center ;
  `

const IListsItems = styled.div`
    display: flex;
    justify-content: center;
    width: 100px;
  `

const RecipeDesc = styled.div`
  margin-top: 5px;
  width: 80%;
  min-height: 350px;
  border: 1px solid black;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 5px;
  background-color: #fff;
`

export const RecipeDetails = ({ loginToken }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState('')

  const [title, setTitle] = useState('')
  const [img, setImg] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [contents, setContents] = useState('')


  const { id } = useParams()

  const getData = async () => {
    const headers = {
      headers: {
        "Authorization": `Bearer ${loginToken}`
      }
    }

    await axios.get(`${serverPath}/recipe/content/${id}`, headers)
      .then((res) => {
        const { title, photo, ingredient, contents, bookmark } = res.data.data.recipe

        setTitle(title)
        setImg(photo)
        setIngredients(ingredient)
        setContents(contents)

        setIsBookmarked(bookmark)
      })
  }

  // 페이지 렌더링시 데이터를 상태에 저장
  useEffect(() => {
    setIsLoading(true)
    getData()
    setIsLoading(false)
  }, [])

  const toggleBookmark = async () => {
    const res = await axios.post(`${serverPath}/recipe/bookmark`, {
      id: id
    })

    if (res.status === 200) {
      setIsBookmarked(!isBookmarked)
      // 정상적으로 변경됐다고 알려주면 상태 Boolean 토글 -> 보여지는 이미지만을 위해서 만든 상태
      // 서버 내부에서는 서버 로직에 따라 토글됨.
    }
  }

  const IngredientsList = () => {
    if(ingredients.length > 0){
    return ingredients.map(el => {
      return (
        <ILists>
          <IListsItems>{el.name}</IListsItems>
          <IListsItems>{el.amounts}</IListsItems>
        </ILists>
      )
    })
    } else {
      return <div>등록된 재료가 없습니다.</div>
    }
  }

  return (
    <Container>
      <Topbar pageTitle='레시피 상세' />
      {/* 썸네일 */}
      <RecipeImg bg={img}>
        {/* 북마크 버튼 */}
        <BookmarkBtn icon={faHeart} size="2x" onClick={toggleBookmark} bookmarked={isBookmarked ? "true" : ""} />
      </RecipeImg>

      {/* 제목 표시 */}
      <RecipeTitle>{title}</RecipeTitle>

      <Title>필요 재료</Title>
      {/* 재료 표시 */}
      <IngredientsList />

      {/* 본문 표시 */}
      <Title>레시피 상세</Title>
      <RecipeDesc>{contents}</RecipeDesc>

    </Container>
  )
}