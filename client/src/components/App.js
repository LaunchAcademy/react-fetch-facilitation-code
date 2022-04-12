import React, { useEffect, useState } from 'react'
import { hot } from "react-hot-loader/root"

import RecipesList from './RecipesList'
import NewRecipeForm from './NewRecipeForm'

const App = (props) => {
  const [recipes, setRecipes] = useState([])
  
  const addRecipe = async (newRecipeObjectFromForm) => {
    const recipeResponse = await fetch("/api/v1/recipes", { 
      method: "POST",
      body: JSON.stringify({recipe: newRecipeObjectFromForm}),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    const parsedRecipe = await recipeResponse.json()

    setRecipes(recipes.concat(parsedRecipe.recipe))
  }

  const getAllRecipes = async () => {
    try {
      const response = await fetch("/api/v1/recipes")
      if (!response.ok){
        const newError = new Error("OH NO EVERYTHING WENT WRONG THAT COULD GO WRONG")
        throw(newError)
      }
  
      const parsedRecipeData = await response.json()
      setRecipes(parsedRecipeData.recipes)
    } catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    getAllRecipes()

    console.log("useEffect running again...")
  }, [])


  return(
    <div className="container">
      <h1>Recipes App</h1>
      <RecipesList
        recipes={recipes}
      />
      <NewRecipeForm
        addRecipe={addRecipe}
      />
    </div>
  )
}

export default hot(App)
