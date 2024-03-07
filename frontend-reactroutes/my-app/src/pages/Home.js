import { useState } from "react";
import axios from "axios";

export default function Home(props) {
  const [data, setData] = useState();

  async function fetchData(evt) {
    try{
      evt.preventDefault();
      const response = await axios.post("http://localhost:8080");
      const data = response.data;
      setData(data);
    }catch(err){
      console.log("Error 404")
    };
  };
  console.log(data);

  return (
    <>
      <main>
      {data === undefined? (
        <form method="POST" onSubmit={fetchData}>
          <input placeholder="password" required type="text"></input>
          <button>Send</button>
        </form>
      ):<h1>{data.message}</h1>}
      </main>
    </>
  );
}
