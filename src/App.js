import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [friend, setFriend] = useState([
    {
      id: 4423412,
      name: "David",
      total: -7,
      img: "https://i.pravatar.cc/50?img=65",
    },
    {
      id: 44237545,
      name: "Jenny",
      total: 44,
      img: "https://i.pravatar.cc/50?img=44",
    },
    {
      id: 55341232,
      name: "Sam",
      total: 0,
      img: "https://i.pravatar.cc/50?img=13",
    },
  ]);
  const [selectedFrnd, setSelectedFrnd] = useState(null);
  const [friendAddOpen, setFriendAddOpen] = useState(false);

  console.log(selectedFrnd);
  console.log(friendAddOpen);

  function handleSelected(friend) {
    setSelectedFrnd((cur) => (cur?.id === friend.id ? null : friend));
    setFriendAddOpen(false);
  }

  function handleOpenAddFriend() {
    setFriendAddOpen(!friendAddOpen);
  }

  function handleNewFriend(id, name, img) {
    setFriend([...friend, { id, name, img, total: 0 }]);
  }

  function handleBill(pays, myBill) {
    setFriend(
      friend.map((frnd) =>
        frnd.id === selectedFrnd.id
          ? {
              ...frnd,
              total: pays === "you" ? frnd.total + myBill : frnd.total - myBill,
            }
          : frnd
      )
    );
    setSelectedFrnd(null);
  }

  return (
    <div className="App">
      <div className="friends">
        <FriendsList
          friend={friend}
          selectedFrnd={selectedFrnd}
          onSelect={handleSelected}
        />
        {friendAddOpen && <AddFriends onSubmit={handleNewFriend} />}
        <Button onClick={handleOpenAddFriend}>
          {friendAddOpen ? "Close" : "Add-Friend"}
        </Button>
      </div>
      <div className="bill">
        {selectedFrnd && (
          <SplitBill
            handleBill={handleBill}
            friend={friend}
            selectedFrnd={selectedFrnd}
          />
        )}
      </div>
    </div>
  );
}

function FriendsList({ friend, onSelect, selectedFrnd }) {
  return (
    <div className="listMain">
      {friend.map((friends) => (
        <Friends
          key={friends.id}
          selectedFrnd={selectedFrnd}
          onSelect={onSelect}
          friends={friends}
        />
      ))}
    </div>
  );
}

function Friends({ friends, onSelect, selectedFrnd }) {
  const isSelected = selectedFrnd?.id === friends.id;

  return (
    <div className="friendsEach">
      <ul style={{ listStyleType: "none" }}>
        <li className={isSelected ? "selected" : ""}>
          <img
            style={{ borderRadius: "50px" }}
            src={friends.img}
            alt={friends.name}
          />
          <div className="nameSum">
            <h3 style={{ margin: "0px" }}>{friends.name}</h3>
            <p
              style={{
                color:
                  friends.total === 0
                    ? ""
                    : friends.total > 0
                    ? "#0F9D58"
                    : "#DB4437",
                margin: "0px",
              }}
            >
              {friends.total === 0 && `You And ${friends.name} Are Even`}
              {friends.total > 0 &&
                `${friends.name} owes you ${friends.total}$ `}
              {friends.total < 0 &&
                `You owe ${friends.name} ${Math.abs(friends.total)}$`}
            </p>
          </div>
          <Button onClick={() => onSelect(friends)}>
            {isSelected ? "Close" : "Select"}
          </Button>
        </li>
      </ul>
    </div>
  );
}

function AddFriends({ onSubmit }) {
  const [name, setName] = useState("");
  const [img, setImg] = useState("https://i.pravatar.cc/48");
  const id = crypto.randomUUID();

  console.log(name);

  function SubmitForm(e) {
    e.preventDefault();
    if (!name || !img) return;

    onSubmit(id, name, img);
  }

  console.log(id);
  return (
    <form onSubmit={SubmitForm} className="addFriends">
      <label htmlFor="friendName">Friend Name:</label>
      <input
        onChange={(e) => setName(e.target.value)}
        value={name}
        id="friendName"
      />
      <label htmlFor="friendUrl">Image Url:</label>
      <input
        onChange={(e) => setImg(e.target.value)}
        value={img}
        id="friendUrl"
      />
      <Button>Add</Button>
    </form>
  );
}

function SplitBill({ selectedFrnd, friend, handleBill }) {
  const [bill, setBill] = useState("");
  const [myBill, setMyBill] = useState("");
  const [pays, setPays] = useState("you");
  const othersBill = bill - myBill;

  function handleSubmit(e) {
    e.preventDefault();

    handleBill(pays, myBill);
  }

  return (
    <div className="billForm">
      <form onSubmit={handleSubmit}>
        <h2>SPLIT A BILL WITH {selectedFrnd.name.toUpperCase()}</h2>
        <div className="billFormInputs">
          <label>💸Bill Value:</label>
          <input
            onChange={(e) => setBill(Number(e.target.value))}
            type="number"
          />
        </div>
        <div className="billFormInputs">
          <label>🫵Your expense:</label>
          <input
            onChange={(e) => setMyBill(Number(e.target.value))}
            type="number"
          />
        </div>
        <div className="billFormInputs">
          <label>☝️{selectedFrnd.name}'s expense:</label>
          <input value={othersBill} disabled type="number" />
        </div>
        <div className="billFormInputs">
          <label>🤔Who is paying the bill?</label>
          <select onChange={(e) => setPays(e.target.value)} value={pays}>
            <option value="you">You!</option>
            <option value={selectedFrnd.name}>
              Nah fam, {selectedFrnd.name} is paying
            </option>
          </select>
        </div>
        <Button>asd</Button>
      </form>
    </div>
  );
}

function Button({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: "#F4B400",
        borderRadius: "5px",
        padding: "10px",
        cursor: "pointer",
        border: "none",
        margin: "10px",
      }}
    >
      {children}
    </button>
  );
}

export default App;
