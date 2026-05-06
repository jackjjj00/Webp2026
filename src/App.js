import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AlarmIcon from '@material-ui/icons/Alarm';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const MultiButton = () => {
  var output = [];
  
  output.push(
    <IconButton color="primary" aria-label="add to shopping cart" key="cart">
      <AddShoppingCartIcon />
    </IconButton>
  );
  output.push(
    <IconButton color="primary" aria-label="delete" key="delete">
      <DeleteIcon />
    </IconButton>
  );
  output.push(
    <IconButton color="primary" aria-label="add an alarm" key="alarm">
      <AlarmIcon />
    </IconButton>
  );
  
  return output;
};

export default function App() {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1 style={{ color: 'red', fontSize: '6rem', fontWeight: 'bold' }}>
        hello CGU!!
      </h1>
      <div style={{ marginTop: '30px' }}>
        {MultiButton()}
      </div>
    </div>
  );
}