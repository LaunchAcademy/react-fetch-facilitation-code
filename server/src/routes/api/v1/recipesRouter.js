import express from "express"
import _ from "lodash"

import Recipe from "../../../models/Recipe.js"

const recipesRouter = new express.Router()

recipesRouter.get("/", (req, res) => {
  res.set({ 'Content-Type': 'application/json' }).status(200).json({ recipes: Recipe.findAll() })
})

recipesRouter.get("/random", (req, res) => {
  const recipes = Recipe.findAll()
  const randomRecipe = _.sample(recipes)
  res.set({ 'Content-Type': 'application/json' }).status(200).json({ recipe: randomRecipe })
})

recipesRouter.post('/', (req, res) => {
  const recipe = new Recipe(req.body.recipe)
  debugger
  if(recipe.save()) {
    // `res.json()` stringifies our data, and sets the Content-Type header to "application/json"
    res.status(201).json({ recipe })
  } else {
    res.status(422).json({ errors: recipe.errors })
  }
})

export default recipesRouter