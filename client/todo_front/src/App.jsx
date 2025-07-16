import { useState, useEffect } from 'react'
import { ListItem } from './Components/ListItem';
import { ListForm } from './Components/ListForm';

export const BASE_URL = "http://localhost:3001/";

function App() {
  const [listData, setListData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchListData() {
      try {

        const response = await fetch(`${BASE_URL}todos`);

        if(!response.ok) {
          throw new Error("Failed to fetch data!");
        }
        const data = await response.json();
        setListData(data);
        
      } catch (error) {
        setErrorMessage(error);
      }
      finally {
        setLoading(false);
      }
    };
    fetchListData();
  }, []);

  if (loading) return (<div>Loading...</div>);
  if (errorMessage) return (<div>Error: {errorMessage}</div>);

  return (
    <>
      <h1>To-Do List</h1>
      <ListForm/>
      <div>{listData.map((listItem) => {return (<ListItem key={listItem.id} item={listItem}/>)})}</div>
    </>
  )
}

export default App
