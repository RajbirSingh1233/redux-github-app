import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './redux/thunks';
import _debounce from 'lodash/debounce';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [username, setUsername] = useState('');

  const debouncedFetchUser = _debounce((value) => {
    dispatch(fetchUser(value));
  }, 300);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setUsername(inputValue);

    debouncedFetchUser(inputValue);
  };
  
  console.log('Redux Store:', user);


  return (
    <div>
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={handleInputChange}
      />

      {user && (
        <div>
          <h2>User Details</h2>
          <p>Name: {user.name}</p>
          <p>Company: {user.company}</p>
          <p>Email: {user.email}</p>
          <p>Gravatar ID: {user.gravatar_id}</p>
          <img src={`https://www.gravatar.com/avatar/${user.gravatar_id}`} alt="Gravatar" />
          <p>Followers: {user.followers}</p>
          <p>Following: {user.following}</p>
        </div>
      )}
    </div>
  );
}

export default App;
