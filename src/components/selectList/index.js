import React, { useState } from "react";

import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import RemoveIcon from '@material-ui/icons/Remove';
import ReplayIcon from '@material-ui/icons/Replay';
import Select from "@material-ui/core/Select";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "250px",
    minHeight: "115px"
  },
  select: {
    width: "100%"
  },
  divActions: {
    display: "flex",
    flexWrap: "wrap",
    width: "75px",
  },
  action: {
    minWidth: "100%",
    height: "32px",
    backgroundColor: "transparent"
  }
}));

const names = [
  "Item 1",
  "Item 2",
];


const MultipleSelect = () => {
  const classes = useStyles();
  const [itemsSelected, setSelectedItems] = useState([]);
  const [previousItems, setPreviousItems] = useState([]);
  const [items, setItems] = useState(names);
  const [openDialog, handleDialog] = useState(false);
  const [inputText, setInputText] = useState("");

  const handleChangeMultiple = event => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setSelectedItems(value);
  }
  
  const handleSetItems = () => {
    setPreviousItems(items);
    setItems(items =>[...items,inputText]);
    handleDialog(false);
    setInputText('');
  }
  const handleRemoveItems = () => {
    let itemsAll = items;
    setPreviousItems(items);
    itemsAll = itemsAll.filter(each => {  
        return !itemsSelected.includes(each)
    });
    setItems(itemsAll);
  }
  const handleRollback = () => {
    setItems(previousItems);
  }
  const handleDoubleClick = (e) => {
    const name = e.target.value;
    setPreviousItems(items);
    setItems(items.filter(item => item !== name));
  }
  return (
    <div className={classes.root}>
      <FormControl data-testid="FormControl" className={classes.formControl}>
        <InputLabel shrink htmlFor="select-multiple-native">
          List Items test offer
        </InputLabel>
        <Select data-testid="Select" className={classes.select}
          multiple
          native
          value={itemsSelected}
          onChange={handleChangeMultiple}
          onDoubleClick={handleDoubleClick}
          inputProps={{
            id: "select-multiple-native"
          }}
        >
          {items.map(name => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </Select>
      </FormControl>
      <Box className={classes.divActions} >
        <Button data-testid="AddItemButton" variant="contained" className={classes.action} onClick={e=> handleDialog(true)}><AddIcon /></Button>
        <Button variant="contained" className={classes.action} onClick={handleRemoveItems}><RemoveIcon /></Button>
        <Button variant="contained" className={classes.action} onClick={handleRollback}><ReplayIcon /></Button>
      </Box>
      <Dialog
        open={openDialog}
        onClose={e=> handleDialog(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Item</DialogTitle>
        <TextField
            required
            color="primary"
            margin="dense"
            id="textItem"
            label="item"
            value={inputText}
            onChange={e=> setInputText(e.target.value)}
            fullWidth
          />
        <Button onClick={handleSetItems}> Add</Button>
        
      </Dialog>
    </div>
  );
}

export default MultipleSelect;