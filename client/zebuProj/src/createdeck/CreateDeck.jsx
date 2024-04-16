import React from 'react'
import './CreateDeck.css'

const CreateDeck = ({setModalIsOpen}) => {
  return (
    <div>
      <p>Name your deck:</p>
      <input type="text" />
      <div>
        <button onClick={() => console.log("ok clicked")}>OK</button>
        <button onClick={() => setModalIsOpen(false)}>Cancel</button>
      </div>
    </div>
  )
}

export default CreateDeck