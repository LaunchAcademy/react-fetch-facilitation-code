import React from 'react';

const SproutTile = props => {
  console.log(props.recipe.name);
  return(
    <li>{props.recipe.name}</li>
  )
}

export default SproutTile;
