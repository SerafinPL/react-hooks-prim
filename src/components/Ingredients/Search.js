import React, {useState, useEffect, useRef} from 'react';

import Card from '../UI/Card';
import './Search.css';
import useHttp from '../../hooks/http-hook';
import ErrorModal from '../UI/ErrorModal';

const Search = React.memo(props => {

  const { onLoadIngr } = props;

  const [inputState, setInputState] = useState('');

  const inputRef = useRef();

  const {isLoading, data, error, sendRequest, clearErr} = useHttp();

  useEffect(() => {

    const timer = setTimeout(() => {
      if(inputState === inputRef.current.value){
          const query = inputState.length === 0 ? '' : `?orderBy="title"&equalTo="${inputState}"`;
          sendRequest('https://hooks-e900b-default-rtdb.firebaseio.com/ingredients.json' + query, 'GET',)
          // fetch('https://hooks-e900b-default-rtdb.firebaseio.com/ingredients.json' + query)
          //   .then(response => response.json())
          //     .then(responseData => {
          //       

            
      };
      }, 500);
    return () => {
        clearTimeout(timer);
    }

  }, [inputState, inputRef, sendRequest]); // useEffect

  useEffect(() => {
    if (!isLoading && !error && data){
      const loadedIngredients = [];
      for (const key in data){
              loadedIngredients.push({id: key, ...data[key]})
            }
      onLoadIngr(loadedIngredients);
    }
  }, [data, isLoading, error, onLoadIngr]); // useEffect

  return (
    <section className="search">
      {error && <ErrorModal onClose={clearErr}>{error}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {isLoading && <span>Wczytuje...</span>}
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
