import React, {useState, useEffect, useRef} from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {

  const { onLoadIngr } = props;

  const [inputState, setInputState] = useState('');

  const inputRef = useRef();

  useEffect(() => {

    const timer = setTimeout(() => {
      if(inputState === inputRef.current.value){
          const query = inputState.length === 0 ? '' : `?orderBy="title"&equalTo="${inputState}"`;
          fetch('https://hooks-e900b-default-rtdb.firebaseio.com/ingredients.json' + query)
            .then(response => response.json())
              .then(responseData => {
                const loadedIngredients = [];
                for (const key in responseData){
                  loadedIngredients.push({id: key, ...responseData[key]})
                }
                onLoadIngr(loadedIngredients);
              });
      }
       
    }, 500);
    return () => {clearTimeout(timer);}

  }, [inputState, onLoadIngr, inputRef]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input 
            ref={inputRef}
            type="text" 
            value={inputState} 
            onChange={event => setInputState(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
