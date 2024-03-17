import React, { useEffect, useState } from 'react'

const BASE_URL = "http://localhost:9000/"

function App2() {

    const [data, setData] = useState(null)

    useEffect(()=>{
      fetch(BASE_URL).then((res) =>{
        res.json().then((resp)=>{
            setData(resp)
        })
      })
    }, [])

    const filtrData = (type) =>{
        if(type === "hello")
        {
            console.log(type)
        }
    }

    

  return (
    <div>

        <button onClick={()=>filtrData("hello")}>Type</button>
        {
            data?.map((value, i) =>
                <h1 key={i}>{value.name}</h1>
                
            )
        }
    </div>
  )
}

export default App2