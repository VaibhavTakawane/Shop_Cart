import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import {
  Box,
  InputBase,
  IconButton,
} from "@material-ui/core";

import {
  Search as SearchIcon,
} from "@material-ui/icons";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: 42,
    borderRadius: 10,
    overflow: "hidden",

    backgroundColor: "#ffffff",

    border: "2px solid transparent",

    boxShadow:
      "0 3px 12px rgba(0, 0, 0, 0.12)",

    transition: "all 0.2s ease",

    "&:focus-within": {
      borderColor: "#60a5fa",

      boxShadow:
        "0 4px 16px rgba(96, 165, 250, 0.25)",
    },
  },

  input: {
    flex: 1,

    marginLeft: theme.spacing(1.5),

    fontSize: "0.95rem",

    color: "#111827",

    "& input": {
      padding: "8px 0",
    },

    "& input::placeholder": {
      color: "#6b7280",
      opacity: 1,
    },
  },

  iconButton: {
    width: 42,
    height: 42,

    borderRadius: 0,

    backgroundColor: "#2563eb",

    color: "#ffffff",

    transition: "background-color 0.2s ease",

    "&:hover": {
      backgroundColor: "#1d4ed8",
    },

    "@media (max-width: 700px)": {
      width: 44,
      height: 42,
    },
  },
}));

function SearchBox() {
  const classes = useStyles();

  const [keyword, setKeyword] = useState("");

  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();

    history.push(
      `/?keyword=${keyword}&page=1`
    );
  };

  return (
    <Box
      component="form"
      onSubmit={submitHandler}
      className={classes.root}
    >

      <InputBase
        placeholder="Search for products..."
        className={classes.input}
        value={keyword}
        onChange={(e) =>
          setKeyword(e.target.value)
        }
      />

      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>

    </Box>
  );
}

export default SearchBox;