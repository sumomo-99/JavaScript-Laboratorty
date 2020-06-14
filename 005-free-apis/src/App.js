import React, {useState, useEffect} from 'react';
import axios from "axios";
import Header from "./Header";
import Categories from "./Categories";
import Contents from "./Contents";
import Footer from "./Footer";

function App() {
  const [jsonData, setJsonData] = useState({categories: [], data: []});

  useEffect(() => {
    let ignore = false;

    const fetchData = async() => {
    const result = await axios("http://localhost:8080/data")
    if (!ignore) setJsonData(result.data);
  };
  fetchData();
  return() => {ignore = true};
  }, []);

  return (
    <div>
      <Header />
      <Categories categories={jsonData.categories}/>
      <Contents data={jsonData.data}/>
      <Footer />
    </div>
  );
}

export default App;
