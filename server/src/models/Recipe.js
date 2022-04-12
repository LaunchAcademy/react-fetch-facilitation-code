import fs from "fs"

const recipesPath = "recipes.json"

class Recipe {
  constructor({ name }) {
    this.name = name
  }

  static findAll() {
    const recipeData = JSON.parse(fs.readFileSync(recipesPath)).recipes
    let recipes = []
    recipeData.forEach(recipe => {
      const newRecipe = new Recipe(recipe)
      recipes.push(newRecipe)
    })
    return recipes
  }

  isValid() {
    this.errors = {}
    const requiredFields = ["name"]
    let isValid = true

    for(const requiredField of requiredFields) {
      this.errors[requiredField] = []
      if(!this[requiredField]) {
        isValid = false
        this.errors[requiredField].push("can't be blank")
      }
    }
    return isValid
  }

  save() {
    if(this.isValid()) {
      delete this.errors
      const recipes = this.constructor.findAll()
      recipes.push(this)
      console.log(recipes)
      const data = { recipes: recipes }
      fs.writeFileSync(recipesPath, JSON.stringify(data))
      return true
    } else {
      return false
    }
  }
}

export default Recipe