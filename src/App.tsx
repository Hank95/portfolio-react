import { Outlet } from "react-router-dom";
import "./App.css";

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

  return <Outlet />;
};

export default App;
