import React from 'react';

const changeText = (event) => {
  console.log(event.target);
  event.target.innerText = event.target.innerText + "被點了";
}

function App() {
  const styleArgument = { 
    color: 'blue', 
    cursor: 'pointer' 
  };

  return (
    <div className="App">
      <h1 style={styleArgument} onClick={changeText}>
        hello CGU!!
      </h1>
    </div>
  );
}

export default App;