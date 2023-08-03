import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: true },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Charger", quantity: 1, packed: false },
// ];

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]); //add a new item into existing array
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id)); // delete item with the exact id
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats />
    </div>
  );

  function Logo() {
    return <h1>🏝️ Far Away 🧳</h1>;
  }

  function Form({ onAddItems }) {
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);

    function handleSubmit(e) {
      e.preventDefault();
      if (!description) return;

      const newItem = {
        description,
        quantity,
        packed: false,
        id: Date.now(),
      };

      onAddItems(newItem);

      setDescription("");
      setQuantity(1);
    }

    return (
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>What do you need for your trip?</h3>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Item..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button>Add</button>
      </form>
    );
  }

  function PackingList({ items, onDeleteItem, onToggleItem }) {
    return (
      <ul className="list">
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
    );
  }

  function Item({ item, onDeleteItem, onToggleItem }) {
    return (
      <li>
        <input
          type="checkbox"
          value={item.packed}
          onChange={() => onToggleItem(item.id)}
        />
        <span style={item.packed ? { textDecoration: "line-through" } : {}}>
          {item.quantity} {item.description}
        </span>
        <button onClick={() => onDeleteItem(item.id)}>❌</button>
      </li>
    );
  }

  function Stats() {
    return (
      <footer className="stats">
        <em>
          You have ... items on your list, and you have already packed ...
          (...%)
        </em>
      </footer>
    );
  }
}
