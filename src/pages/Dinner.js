import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context";
import List from "../components/List";
import { ThemeProvider } from "@material-ui/core/styles";
import {
  InputLabel,
  FormControl,
  Paper,
  MenuItem,
  Select,
  makeStyles,
} from "@material-ui/core";
const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}));

function Dinner() {
  const classes = useStyles();
  const { theme } = useGlobalContext();

  const [first, setFirst] = useState("");
  const [main, setMain] = useState("");
  const [desert, setDesert] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false); //change value
  const [editID, setEditID] = useState(null); //id-change value
  const clearSteps = () => {
    setFirst("");
    setMain("");
    setDesert("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (first && main && desert && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return {
              ...item,
              firstStep: first,
              mainStep: main,
              desertStep: desert,
            };
          }
          return item;
        })
      );
      clearSteps();
      setEditID(null);
      setIsEditing(false);
    }
    if (first && main && desert && !isEditing) {
      const newItem = {
        id: new Date().getTime().toString(),
        firstStep: first,
        mainStep: main,
        desertStep: desert,
      };
      setList([...list, newItem]);
      clearSteps();
    }
  };
  const handleFirstChange = (e) => {
    setFirst(e.target.value);
    setMain("");
    setDesert("");
  };
  const handleMainChange = (e) => {
    setMain(e.target.value);
    setDesert("");
  };

  const clearList = () => {
    setList([]);
  };
  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id));
  };
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setFirst(specificItem.firstStep);
    setMain(specificItem.mainStep);
    setDesert(specificItem.desertStep);
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <ThemeProvider theme={theme}>
      <Paper style={{ height: "100vh" }}>
        <section className="section-center">
          <form className="guest-form" onSubmit={handleSubmit}>
            <h3>guest list</h3>
            <div className="form-control">
              <FormControl className={classes.formControl}>
                <InputLabel>First</InputLabel>
                <Select
                  id="First"
                  label="First"
                  displayEmpty
                  value={first}
                  onChange={handleFirstChange}
                >
                  <MenuItem value={"Mediterranean salad"}>
                    Mediterranean salad
                  </MenuItem>
                  <MenuItem value={"vegetable soup"}>vegetable soup</MenuItem>
                  <MenuItem value={"Garlic bread"}>Garlic bread</MenuItem>{" "}
                  <MenuItem>Fried cauliflower</MenuItem>{" "}
                </Select>
              </FormControl>
              {((first && !isEditing) || isEditing) && (
                <FormControl className={classes.formControl}>
                  <InputLabel>Main</InputLabel>
                  <Select
                    id="Main"
                    label="Main"
                    displayEmpty
                    value={main}
                    onChange={handleMainChange}
                  >
                    <MenuItem value={"Dennis fish"}>Dennis fish</MenuItem>
                    <MenuItem value={"Chinese chicken"}>
                      Chinese chicken
                    </MenuItem>
                    <MenuItem value={"Steak in sauce"}>Steak in sauce</MenuItem>
                    <MenuItem>Cream pasta</MenuItem>
                  </Select>
                </FormControl>
              )}
              {((main && !isEditing) || isEditing) && (
                <FormControl className={classes.formControl}>
                  <InputLabel>Desert</InputLabel>
                  <Select
                    id="Desert"
                    label="Desert"
                    displayEmpty
                    value={desert}
                    onChange={(e) => setDesert(e.target.value)}
                  >
                    <MenuItem value={"Malaby"}>Malaby</MenuItem>
                    <MenuItem value={"Berry ice-cream"}>
                      Berry ice-cream
                    </MenuItem>
                    <MenuItem value={"Apple Cake"}>Apple Cake</MenuItem>
                    <MenuItem value={"Chocolate Souffle"}>
                      Chocolate Souffle
                    </MenuItem>
                  </Select>
                </FormControl>
              )}
              <button type="submit" className="submit-btn">
                {isEditing ? "edit" : "add guest"}
              </button>
            </div>
          </form>
          {list.length > 0 && (
            <div className="guest-container">
              <List items={list} removeItem={removeItem} editItem={editItem} />
              <button className="clear-btn" onClick={clearList}>
                clear items
              </button>
            </div>
          )}
          <div className="count-list">count: {list.length}</div>
        </section>
      </Paper>
    </ThemeProvider>
  );
}

export default Dinner;
