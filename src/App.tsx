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

  const maleClick = () => setNames(maleNames);
  const femaleClick = () => setNames(femaleNames);
  const anyClick = () => setNames(anyNames);

  return (
    <>
      <input
      onChange={(e)=>setNames(anyNames.filter(x=>(x.name.toLowerCase().indexOf(e.target.value.toLowerCase()))===0))}
      />
      <h1>Baby Names Data</h1>
      <hr />
      <h3>Please Select the sex of your baby</h3>

      <button onClick={maleClick} className={"button"}>
        Male
      </button>
      <button onClick={femaleClick} className={"button"}>
        Female
      </button>
      <button onClick={anyClick} className={"button"}>
        Any
      </button>
      <main className="Main">
        {Names.map((x, id) => (
          <li key={x.id} className={x.sex}>
            {x.name}
          </li>
        ))}
      </main>
    </>
  );
}

export default App;
