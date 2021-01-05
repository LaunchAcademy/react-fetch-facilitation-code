import React, { useState } from 'react'

const NewRecipeForm = props => {
  const [name, setName] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
    debugger
    let formPayload = {
      recipe: {
        name: name
      }
    }
    debugger
    props.addRecipe(formPayload)
    debugger
    setName("")
  }

  const handleChange = (event) => {
    setName(event.target.value)
  }

  return (
    <form className="callout" onSubmit={handleSubmit}>
      <label>Recipe Name
        <input
          name="name"
          type="text"
          value={name}
          onChange={handleChange}
        />
      </label>
      <input className="button" type="submit" value="Submit" />
    </form>
  )
}

export default NewRecipeForm