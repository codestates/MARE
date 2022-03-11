import { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlusSquare, faMinusSquare } from "@fortawesome/free-regular-svg-icons"

// Styled Component

const Container = styled.div`
    display: grid ;
    place-items: center;
    background-color: #dfd5d2;;
    box-sizing: border-box;
    width: 410px;
    padding: 5px;
  `

const ILists = styled.div`
    display: flex;
    width: 400px;
    justify-content: center ;
  `

const IListsItems = styled.div`
    display: flex;
    justify-content: center;
    width: 100px;
  `

const Sinput = styled.input`
    margin: 0 3px;
  `

const SFontAwesomeIcon = styled(FontAwesomeIcon)`
  display: inline-block ;
  color: black;
  cursor: pointer;
`

// Component

// 재료 작성 폼
const IngredientForms = ({ allIngredients, setAllIngredients }) => {
  
  const [ingredient, setIngredient] = useState('')
  const [amounts, setAmounts] = useState('')

  const handleIngredient = (e) => {
    setIngredient(e.target.value)
  }

  const handleAmounts = (e) => {
    setAmounts(e.target.value)
  }

  const handlePlus = () => {
    handleAllIngredients(ingredient, amounts)

    setIngredient('')
    setAmounts('')
  }

  const handleAllIngredients = (name, amounts) => {
    let data = {
      id: uuidv4(),
      name: name,
      amounts: amounts
    }
    setAllIngredients(
      [...allIngredients, data]
    )
  }

  return (
    <div>
      <Sinput className="ingredient_input" type="text" placeholder="재료 이름을 입력하세요." onChange={handleIngredient} value={ingredient} />
      <Sinput className="amount_input" type="text" placeholder="재료의 양을 입력하세요." onChange={handleAmounts} value={amounts} />
      <SFontAwesomeIcon icon={faPlusSquare} size="lg" onClick={handlePlus} />
    </div>
  )
}

// 재료 표시
const ShowIngredients = ({ data, allIngredients, setAllIngredients }) => {

  const { id, name, amounts } = data

  const handleMinus = () => {
    setAllIngredients(
      allIngredients.filter((el) => {
        return el.id !== id
      })
    )
  }

  return (
    <ILists>
      <IListsItems>{name}</IListsItems>
      <IListsItems>{amounts}</IListsItems>
      <SFontAwesomeIcon icon={faMinusSquare} size="lg" onClick={handleMinus} />
    </ILists>
  )
}

// Render
export const AddIngredients = ({ updateIngre, setIngredients } ) => {
  const [allIngredients, setAllIngredients] = useState([])

  useEffect(() => {
    setIngredients(allIngredients)
  }, [allIngredients])

  return (
    <Container>
      <h3>필요한 재료</h3>
      {allIngredients.map((data) => {
        return <ShowIngredients key={data.id} data={data} allIngredients={allIngredients} setAllIngredients={setAllIngredients} />
      })}
      <IngredientForms allIngredients={allIngredients} setAllIngredients={setAllIngredients}/>

    </Container>
  )
}