import React from 'react'
import './Edit.css'
import Navigation from '../../navigation/Navigation';
import { useParams } from 'react-router-dom';

const Edit = () => {

  
  const {cardId} = useParams();


  const handleUpdate = () => {
    console.log('scllksdf');
    console.log({cardId});
  }

  return (
    <>
      <Navigation/>
      <main className='edit-container'>

        <div>
          <label htmlFor='front'>Front</label>
          <input type='text' id='front'/>
        </div>
        <div>
          <label htmlFor='front'>Back</label>
          <input type='text' id='back'/>
        </div>
        <button onClick={handleUpdate}>Update</button>
      </main>
    </>
  );
}

export default Edit