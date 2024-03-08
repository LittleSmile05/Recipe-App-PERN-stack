import React, { useEffect, useState } from 'react';
import './App.css';
import Recipe from './components/Recipe';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  useEffect(() => {
    const getRecipes = async () => {
      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${process.env.REACT_APP_API_ID}&app_key=${process.env.REACT_APP_API_KEY}`
      );
      const data = await response.json();
      setRecipes(data.hits);
    };

    getRecipes();
  }, [query]);

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  const postLikedRecipe = async (recipeName) => {
    try {
      const response = await fetch('/api/likedRecipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipeName }),
      });
      const data = await response.json();
      console.log('Liked recipe saved:', data);
    } catch (error) {
      console.error('Error saving liked recipe:', error);
    }
  };

  return (
    <div>
      <div className="header">
        <form className="search-form" onSubmit={getSearch}>
          <input
            className="search-bar"
            type="text"
            value={search}
            onChange={updateSearch}
            placeholder="Search for recipes..."
          />
          <button className="search-button" type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </div>
      <div className="content">
        <div className="recipes">
          {recipes && recipes.length > 0 ? (
            recipes.map(recipe => (
              <Recipe
                key={recipe.recipe.label}
                title={recipe.recipe.label}
                calories={recipe.recipe.calories}
                image={recipe.recipe.image}
                ingredients={recipe.recipe.ingredients}
                postLikedRecipe={postLikedRecipe}
              />
            ))
          ) : (
            <p>No recipes found</p>
          )}
        </div>
      </div>
      <footer className="footer">
  <div className="footer__addr">
    <h1 className="footer__logo">Culinary Cloud</h1>
    <h2>Contact</h2>
    <address>
      5534 Somewhere In. The World 22193-10212<br />
      <a className="footer__btn" href="mailto:example@gmail.com">Email Us</a>
    </address>
  </div>
  <ul className="footer__nav">
    <li className="nav__item">
      <h2 className="nav__title">Recipes</h2>
      <ul className="nav__ul">
        <li>
          <a href="#">Breakfast</a>
        </li>
        <li>
          <a href="#">Lunch</a>
        </li>
        <li>
          <a href="#">Dinner</a>
        </li>
        <li>
          <a href="#">Desserts</a>
        </li>
      </ul>
    </li>
    <li className="nav__item nav__item--extra">
      <h2 className="nav__title">About Us</h2>
      <ul className="nav__ul nav__ul--extra">
        <li>
          <a href="#">Our Story</a>
        </li>
        <li>
          <a href="#">Our Team</a>
        </li>
        <li>
          <a href="#">Testimonials</a>
        </li>
        <li>
          <a href="#">FAQ</a>
        </li>
      </ul>
    </li>
    <li className="nav__item">
      <h2 className="nav__title">Connect</h2>
      <ul className="nav__ul">
        <li>
          <a href="#">Facebook</a>
        </li>
        <li>
          <a href="#">Twitter</a>
        </li>
        <li>
          <a href="#">Instagram</a>
        </li>
        <li>
          <a href="#">Pinterest</a>
        </li>
      </ul>
    </li>
  </ul>
  <div className="legal">
    <p>&copy; 2024 Culinary Cloud. All rights reserved.</p>
    <div className="legal__links">
      <span>Made with <span className="heart">♥</span> from the kitchen</span>
    </div>
  </div>
</footer>

    </div>
  );
};

export default App;
