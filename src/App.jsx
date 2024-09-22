import { useState } from 'react';
import './App.css';

function App() {
  const [recipe,setRecipe]= useState('')
  const [display, setDisplay]= useState(false)
  
  async function fetchrecipe() {
    setDisplay(true)
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=1517e44b457648ca9b2975d04d12d320`);
      const data = await response.json();
      
      const meal = data.recipes[0];
      const ingredients = meal.extendedIngredients.map(ingredient => (
        <li key={ingredient.id}>{`${ingredient.amount} ${ingredient.unit} ${ingredient.name}`}</li>
      ));
  
      setRecipe({
        title: meal.title,
        ingredients: ingredients,
        instructions: meal.instructions,
        sourceUrl: meal.sourceUrl,
        image: meal.image
      });
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  }
  


  return (
    <div className='App'>
     <div className='recipe-display'>
            {display && 
             <>
             <h2>{recipe.title}</h2>
             <ul>
               {recipe.ingredients}
             </ul>
             <p><strong>Instructions:</strong> {recipe.instructions}</p>
             <p><strong>Source:</strong> <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer">Recipe Source</a></p>
             {recipe.image && <img src={recipe.image} alt={recipe.title} />}
           </>
            
            
            
            }
            
      </div>

      <button onClick={fetchrecipe}>generate new recipe</button>
    </div>
  );
}

export default App;
