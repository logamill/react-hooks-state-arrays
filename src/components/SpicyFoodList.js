import React, { useState } from "react";
import { spicyFoods, getNewSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);
  const [filter, filterBy] = useState('All')

  function handleAddFood() {
    const newFood = getNewSpicyFood();
    const newFoodArray = [...foods, newFood]
    setFoods(newFoodArray)
  }
  
  function selectHandler(event) {
    filterBy(event.target.value)
  }

  const optionArray = foods.filter((food) => {
    if (filter === 'All') {
      return true;
    }  else {
      return food.cuisine === filter;
    }
  })

  function clickHandler(id) { 
    const removedFoodArray = foods.map((food) => {
      if (food.id === id) {
        return {
          ...food,
          heatLevel: food.heatLevel + 1,
        };
      }else{
        return food;
      }
    })
    setFoods(removedFoodArray)
  }

  const foodList = optionArray.map((food) => (
    <li key={food.id} onClick={() => clickHandler(food.id)}>
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
    </li>
  ));

  return (
    <div>
      <select name="filter" onChange={selectHandler}>
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
    </select>
      <button onClick={handleAddFood}>Add New Food</button>
      <ul>{foodList}</ul>
    </div>
  );
}

export default SpicyFoodList;
