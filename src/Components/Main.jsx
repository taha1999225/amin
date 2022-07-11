import React from "react";
import Card from "./Card";
import Pokeinfo from "./Pokeinfo";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const Main = () => {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [pokeDex, setPokeDex] = useState();
  const [type, setType] = useState("all");
  const [text, setText] = useState("");

  const pokeFun = async () => {
    setLoading(true);
    const res = await axios.get(url);
    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous);
    getPokemon(res.data.results);
    setLoading(false);
  };
  const getPokemon = async (res) => {
    res.map(async (item) => {
      const result = await axios.get(item.url);
      setPokeData((state) => {
        state = [...state, result.data];
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
        return state;
      });
    });
  };

  useEffect(() => {
    pokeFun();
  }, [url]);
  return (
    <>
      {" "}
      <div className="options">
        <FormControl fullWidth id="web">
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value="all">ALL</MenuItem>
            <MenuItem value="overgrow">overgrow</MenuItem>
            <MenuItem value="torrent">torrent</MenuItem>
            <MenuItem value="chlorophyll">chlorophyll</MenuItem>
            <MenuItem value="swarm">swarm</MenuItem>
            <MenuItem value="blaze">blaze</MenuItem>
            <MenuItem value="tangled-feet">tangled-feet</MenuItem>
            <MenuItem value="big-pecks">big-pecks</MenuItem>
          </Select>
        </FormControl>
        <div className="inputtext">
          {" "}
          <input
            type="text"
            placeholder="search name"
            onChange={(e) => setText(e.target.value)}
          />{" "}
        </div>
      </div>
      <div className="inputsearch"> </div>
      <div className="container">
        <div className="left-content">
          <Card
            type={type}
            pokemon={pokeData}
            loading={loading}
            infoPokemon={(poke) => setPokeDex(poke)}
            text={text}
          />

          <div className="btn-group">
            {prevUrl && (
              <button
                onClick={() => {
                  setPokeData([]);
                  setUrl(prevUrl);
                }}
              >
                Previous
              </button>
            )}

            {nextUrl && (
              <button
                onClick={() => {
                  setPokeData([]);
                  setUrl(nextUrl);
                }}
              >
                Next
              </button>
            )}
          </div>
        </div>
        <div className="right-content">
          <Pokeinfo data={pokeDex} />
        </div>
      </div>
    </>
  );
};
export default Main;
