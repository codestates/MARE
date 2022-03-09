import { useEffect, useState, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { } from "@fortawesome/free-regular-svg-icons"

import { AddIngredients } from "../Components/addIngredients";

const IMGBB_API_KEY = "0d8b2c1f68fcd3c31a904c9a80a932da"
const serverPath = process.env.REACT_APP_SERVER_PATH

const Container = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  width: 400px;
  background-color: beige;
`
const ImgUploadBtn = styled.div`
  display: grid;
  place-items: center;
  width: 400px;
  height: 200px;
  background: ${props => props.bg ? `url(${props.bg})` : 'beige'};
  background-size: cover;
  background-position: center;

  color: ${props => props.bg ? 'transparent' : 'black'} ;;
  cursor: pointer;
`

const ImgDeleteBtn = styled.div`
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;

  position: absolute;
  right: 10px;
  top: 160px;
  z-index: 1;
  cursor : pointer;

  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 2px rgba(0, 0, 0, 0.2);
`

const TitleInput = styled.input`
  width: 80%;
`

const Textarea = styled.textarea`
  width: 80%;
  min-height: 350px;
  box-sizing: border-box;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
`

const SubmitBtn = styled.div`
  display: grid;
  place-items: center;
  width: 80%;
  height: 40px;
  background-color: #fff;

  margin-top: 5px;
  border : 1px solid #000;

  border-radius: 5px;
  cursor : pointer;
`

export const AddRecipe = () => {
  // 필요한 상태 : 
  // 1. 사진을 업로드 하고 전달받은 url
  // 2. 제목
  // 3. 재료 목록
  // 4. 본문
  const inputBtn = useRef()


  const [isLoading, setIsLoading] = useState(false)
  const [isImgUpload, setIsImgUpload] = useState(false)
  const [previewImgUrl, setPreviewImgUrl] = useState('')
  const [imgBase64, setImgBase64] = useState('')
  const [imgHostUrl, setImgHostUrl] = useState('')

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [ingredients, setIngredients] = useState([])

  const uploadTumbnail = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setIsImgUpload(true)
    const img = e.target.files[0]
    setPreviewImgUrl(URL.createObjectURL(img))

    let reader = new FileReader()

    reader.readAsDataURL(img)
    reader.onload = () => {
      setImgBase64(reader.result.split(',')[1])
    }
    
  }

  const imgUploadBtnClick = (e) => {
    e.preventDefault()
    inputBtn.current.click()
  }

  const deleteImg = () => {
    setIsImgUpload(false)
    setPreviewImgUrl('')
    setImgBase64('')
  }

  // 제목 저장하기
  const handleTitle = (e) => {
    setTitle(e.target.value)
  }

  // 본분저장하기
  const handleContent = (e) => {
    setContent(e.target.value)
  }

  const handleSubmit = async () => {
      const body = {
        "title": title,
        "photo": imgHostUrl,
        "ingredient": ingredients,
        "contents": content
      }
      const tempToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMjVjNWY5ZjI2NTdlN2I4Y2I1YjhiNSIsImlhdCI6MTY0NjcyMDc5MywiZXhwIjoxNjQ2ODA3MTkzfQ.ZjN2O8A_Cz-FBIo1Z460PmXYP5hoU896jh0QlfQDM5I'
      const headers = {
        headers: {
          "Authorization": `Bearer ${tempToken}`
        }
      }
      axios.post(`${serverPath}/recipe/content`, body, headers)
  }

  useEffect(() => {
    const uploadImg = async () => {
      let form = new FormData()

      form.append('key', IMGBB_API_KEY)
      form.append('image', `${imgBase64}`)

      const imgHosting = await axios.post('https://api.imgbb.com/1/upload', form)
      setImgHostUrl(imgHosting.data.data.url)
      setIsLoading(false)
    }
    if (imgBase64) uploadImg()
  }, [imgBase64])

  return (
    <Container>
      {/* 사진 업로드 */}
      <input style={{ display: "none" }} type="file" accept="image/*" onChange={uploadTumbnail} ref={inputBtn} />

      {
        isLoading ? <ImgUploadBtn>업로드 중입니다...</ImgUploadBtn>
          : <ImgUploadBtn onClick={imgUploadBtnClick} bg={previewImgUrl}>여기를 눌러 사진을 업로드하세요.</ImgUploadBtn>
      }

      {previewImgUrl ? <ImgDeleteBtn onClick={deleteImg}>✕</ImgDeleteBtn> : <></>}

      {/* 제목 작성 */}
      <h3>레시피 제목</h3>
      <TitleInput type="text" placeholder="레시피 제목 입력" onChange={handleTitle} />

      <AddIngredients setIngredients={setIngredients} />

      {/* 본문 작성 */}
      <h3>레시피 작성</h3>
      <Textarea placeholder="레시피를 작성해주세요" onChange={handleContent} />
      <SubmitBtn onClick={handleSubmit}>업로드 하기</SubmitBtn>
    </Container>
  )
}