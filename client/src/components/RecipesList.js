import React from "react";
import SproutTile from "./SproutTile";

const RecipesList = (props) => {
  // debugger;
  const sprouts = props.recipes.map((recipe) => {
    return <SproutTile key={recipe.name} recipe={recipe} />;
  });
  return <ul>{sprouts}</ul>;
};

export default RecipesList;
