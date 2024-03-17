import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchResult from "./components/SearchResult/SearchResult";

export const BASE_URL = "http://localhost:9000";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterData, setFilterData] = useState(null) 
  const [selectedBtn, setSelectedBtn] = useState("all")

 useEffect(()=>{
  const fetchFoodData = async () => {
    setLoading(true);
    try {
      const response = await fetch(BASE_URL);
      const json = await response.json();
      setData(json);
      setFilterData(json);
      setLoading(false);
    } catch (error) {
      setError("Unable to fetch data");
    }
  };
  fetchFoodData()
 }, [])

const serachFood = (e) =>{
  const searchValue = e.target.value

  if (searchValue === ""){
    setFilterData(null);
  }
  const filter = data.filter((food) => 
    food.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  setFilterData(filter)
}

const filterFood = (types) =>{
  if(types === "all"){
    setFilterData(data);
    setSelectedBtn("all");
    return;
  }

  const filter = data?.filter((food) =>
    food.type.toLowerCase().includes(types.toLowerCase())
  );
  setFilterData(filter)
  setSelectedBtn(types)
};

const filterBtns = [
  {
    name: "All",
    types: "all",
  },
  {
    name: "Breakfast",
    types: "breakfast",
  },
  {
    name: "Lunch",
    types: "lunch",
  },
  {
    name: "Dinner",
    types: "dinner",
  },
];

  if(error){
    return <div>{error}</div>
  }

  if(loading){
    return <div>loading...</div>
  }

  return (
    <>
    <Container>
      <TopContainer>
        <div className="logo">
          <img src="/logo.svg" alt="logo" />
        </div>
        <div className="search">
          <input onChange={serachFood} placeholder="Search Food..." />
        </div>
      </TopContainer>

      <FilterContainer>
        {
          filterBtns.map((value) =>
          <Button key={value.name} onClick={()=> filterFood(value.types)}>{value.name}</Button>
          )
        }
      </FilterContainer>
      
    </Container>
    <SearchResult data={filterData}/>
    </>
  );
}

export default App;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const TopContainer = styled.section`
  min-height: 140px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;

  .search input {
    background-color: transparent;
    border: 1px solid red;
    border-radius: 5px;
    height: 40px;
    font-size: 16px;
    padding: 10px;
    color: white;
  }
`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding-bottom: 40px;
`;

export const Button = styled.button`
  background-color: #ff4343;
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
  cursor: pointer;
  &:hover{
    background-color: #f22f2f;
  }
`;


