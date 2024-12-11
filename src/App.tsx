// Create a simple React application that displays a list of countries and their capitals
// The application should have the following features:

import { useEffect, useState } from "react";

// The list of countries and capitals should be fetched from an API
// Each country should be displayed in a separate component

// The user should be able to filter the list by capital

/**
  To fetch all countries use the '/all' endpoint
 */

const BASE_URL = "https://restcountries.com/v3.1";
/**
  To filter by capital city, use the '/capital/{capital}' endpoint
 */

const FILTERABLE_CAPITALS = ["Tallinn", "Helsinki", "Stockholm", "Oslo", "Copenhagen", "Reykjavik"] as const;

type Capital = (typeof FILTERABLE_CAPITALS)[number];

interface Country {
  name: {
    common: string;
  };
  capital: string;
}

const Row = ({ name, capital }: Country) => {
  return (
    <div>
      <p>
        {name.common} ,{capital}
      </p>
    </div>
  );
};

export default function App() {
  const [data, setData] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState<Capital>();

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}${value ? `/capital/${value}` : "/all"}`);
      const data = await response.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [value]);

  return (
    <div className="App">
      <h1>React Interview</h1>
      <select onChange={handleChange}>
        {FILTERABLE_CAPITALS.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
      {/* <input placeholder="Search me" value={value} onChange={(e) => setValue(e.target.value as never)} /> */}
      {loading ? (
        <p>loading....</p>
      ) : (
        data.map((item, index) => <Row key={index} name={item.name as never} capital={item?.capital} />)
      )}
    </div>
  );
}
