import { useState, useEffect } from 'react'


function App() {
  const [listData, setListData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchListData() {
      try {

        const response = await fetch("http://localhost:3001/todos");

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
      <div>{listData.map((listItem) => {return (<div>{listItem.task}</div>)})}</div>
    </>
  )
}

export default App
