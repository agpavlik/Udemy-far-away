


const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: true },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: false },
];

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  )

function Logo(){
  return(
    <h1>
      🏝️ Far Away 🧳
    </h1>
  )

}

function Form(){
  return(
    <form className="add-form">
      <h3>What do you need for your trip?</h3>
      <select>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
      </select>
      <input type="text" placeholder="Item..." />

      <button>Add</button>
    </form>
  );
  
}

function PackingList(){
  return (
  <ul className="list">
    {initialItems.map(item=><Item item={item} />)}
  </ul>
  )
}

function Item({item}){
  return(
    <li>
      <span style={item.packed ? {textDecoration: "line-through"} : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button> 
    </li>
    
  )
}

function Stats(){
  return(
    <footer className="stats">
      <em>
        You have ... items on your list, and you have already packed ... (...%)
      </em>
    </footer>
  )
  
}



}

