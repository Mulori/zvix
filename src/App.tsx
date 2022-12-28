import React from 'react';
import Login from './pages/login';
import Painel from './pages/painel';

function App() {

  const zvix_user_id = localStorage.getItem('zvix_user_id');

  if(zvix_user_id){
    return(
      <div>
        <Painel />
      </div>
    )
  }else{
    return(
      <div>
        <Login />
      </div>
    )
  }

}

export default App;
