import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom"
import styled from "styled-components"



const Container = styled.div`
  display: grid;
  place-items: center;

  position: relative;
  width: 400px;
  height: 50px;
  background-color: #b8aeab;

  color: #fff;
`

const BackBtn = styled(FontAwesomeIcon)`
  
  position: absolute;

  top: 0;
  bottom: 0;
  left: 5px;

  margin: auto 0;
  cursor : pointer;
`

const PageTitle = styled.div`
  font-size: 1.3rem;
`



export const Topbar = ({pageTitle}) => {
  const navigate = useNavigate()
  
  const handleBackBtn = () => {
    navigate(-1)
  }

  return (
    <Container>
      <BackBtn icon={faArrowLeft} size="2x" onClick={handleBackBtn}/>
      <PageTitle>{pageTitle}</PageTitle>
    </Container>
  )
}