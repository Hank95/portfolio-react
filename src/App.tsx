import React, { useEffect, useState } from "react";
import "./App.css";
import { supabase } from "./supabaseClient";

const App: React.FC = () => {
  // const [data, setData] = useState<any[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     let { data: items, error } = await supabase.from('items').select('*');
  //     if (error) console.error('Error fetching data:', error);
  //     else setData(items);
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-5xl font-bold underline bg-red">Supabase Data</h1>
        {/* <ul>
          {data.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul> */}
      </header>
    </div>
  );
};

export default App;
