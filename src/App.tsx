import babydata from "./babynamesdata.json";
import { useState } from "react";
import sort from "./utils/sort";

const maleNames = babydata
  .filter((x) => x.sex === "m")
  .sort((a, b) => sort(a.name, b.name));
const femaleNames = babydata
  .filter((x) => x.sex === "f")
  .sort((a, b) => sort(a.name, b.name));
const anyNames = babydata.sort((a, b) => sort(a.name, b.name));

interface Properties {
  id: number;
  name: string;
  sex: string;
}

function App(): JSX.Element {
  const [Names, setNames] = useState<Properties[]>(anyNames);
  const [Fav, setFav] = useState<Properties[]>([]);

  const maleClick = () => setNames(maleNames);
  const femaleClick = () => setNames(femaleNames);
  const anyClick = () => setNames(anyNames);
  // const addToFav = () => setFav()
  return (
    <>
      <input
        onChange={(e) =>
          setNames(
            Names.filter(
              (x) =>
                x.name.toLowerCase().indexOf(e.target.value.toLowerCase()) === 0
            )
          )
        }
      />
      <button onClick={maleClick} className={"button"}>
        👦
      </button>
      <button onClick={femaleClick} className={"button"}>
        👧
      </button>
      <button onClick={anyClick} className={"button"}>
        ‍👧‍👦
      </button>
      <h1>BABY NAMES DATABASE</h1>
      <hr />
      <h2>Your Favorite Baby Names</h2>
      {Fav.map((x) => (
        <li
          key={x.id}
          className={x.sex}
          onClick={() => {
            setFav(Fav.filter((y) => y !== x));
          }}
        >
          {x.name}
        </li>
      ))}
      <hr />
      <main className="Main">
        {Names.filter((x) => !Fav.includes(x)).map((x, id) => (
          <li
            key={x.id}
            className={x.sex}
            onClick={() => {
              setFav([...Fav, x]);
            }}
          >
            {x.name}
          </li>
        ))}
      </main>
    </>
  );
}

export default App;
