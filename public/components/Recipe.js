import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import style from '../style/recipe.module.css';

const Recipe = ({ title, calories, image, ingredients, postLikedRecipe }) => {
    const [showDetails, setShowDetails] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
        postLikedRecipe(title); 
    };

    return (
        <div className={`${style.recipe} ${showDetails ? style.expanded : ''}`}>
            <img className={style.image} src={image} alt="" />
            <h1>{title}</h1>
            <button onClick={toggleDetails}>
                {showDetails ? "Hide Details" : "Show Details"}
            </button>
            <button className={style.btn} onClick={toggleFavorite}>
              <FontAwesomeIcon
                icon={faHeart}
                color={isFavorite ? 'red' : 'gray'}
                style={{ fontSize: '20px' }}
              />
            </button>
            {showDetails && (
                <>
                    <h2>Ingredients:</h2>
                    <ol>
                        {ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient.text}</li>
                        ))}
                    </ol>
                    <p>Calories: {calories}</p>
                </>
            )}
        </div>
    );
};

export default Recipe;
