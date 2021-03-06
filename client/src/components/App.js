import React, { useEffect, useState } from 'react'
import { hot } from "react-hot-loader/root"

import RecipesList from './RecipesList'
import NewRecipeForm from './NewRecipeForm'
import ErrorList from './ErrorList'

const App = (props) => {
  const [recipes, setRecipes] = useState([])
  const [errors, setErrors] = useState({})
  
  const addRecipe = async (formPayload) => {
    debugger
    try {
      const response = await fetch('/api/v1/recipes', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(formPayload)
      })
      debugger
      if (!response.ok) {
        if(response.status === 422) {
          const body = await response.json()
          setErrors(body.errors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw(error)
        }
      }
      // This fetch-related `.json()` is parsing it with JSON.parse()
      const body = await response.json()
      const currentRecipes = recipes
      debugger
      setErrors({})
      console.log("body", body);
      console.log("recipes", recipes);
      setRecipes(currentRecipes.concat(body.recipe))
      debugger
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  const getAllRecipes = async () => {
    try {
      const response = await fetch('/api/v1/recipes')
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const recipeData = await response.json()
      setRecipes(recipeData.recipes)
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }
  
  useEffect(() => {
    getAllRecipes()
  }, [])

  return(
    <div className="container">
      <h1>Sprout Fetcher</h1>
      <RecipesList
        recipes={recipes}
      />
      <NewRecipeForm
        addRecipe={addRecipe}
      />
      <ErrorList errors={errors} />
    </div>
  )
}

export default hot(App)
