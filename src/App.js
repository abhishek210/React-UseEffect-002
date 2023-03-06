
import { useEffect, useState } from "react";

function App() {
  const [name, setName] = useState([]);
  const [search, setSearch] = useState("");
  const [searchm, setSearchm] = useState("iron man");

  const searched = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const buttonClick = () => {
    setSearch("")
    setSearchm(search);
  };

  useEffect(() => {
    if (searchm.trim() !== "") {
      (async () => {
        const response = await fetch(
          `https://www.omdbapi.com/?s=${searchm}&apikey=8b66c5da`
        );
        const json1 = await response.json();
        if (json1.Response === "True") {
          setName(json1.Search);
        } else {
          setName([]);
        }
      })();
    }
  }, [searchm]);

  return (
    <div className="main">
      <div className="hooks">
        <h1>HOOKS</h1>
      </div>
      <div className="search">
        <div>
          <input type="text" value={search} onChange={searched} />
          <button onClick={buttonClick}>search</button>
        </div>
        <p>Sharing a few of our favourite movies</p>
      </div>
      {searchm.trim() === "" ? (
        <div className="error">
          <h1>Please type something</h1>
        </div>
      ) : name.length === 0 ? (
        <div className="error">
          <h1>No movies found</h1>
        </div>
      ) : (
        <div className="card">
          {name.map((ele,idx) => {
            return (
              <div key={idx} className="moviecard">
                <h1>{ele.Title}</h1>
                <img src={ele.Poster} alt="poster" />
                <p>{ele.Year}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;

