import React, { useState } from "react";
const Card = ({ pokemon, loading, infoPokemon, type, text }) => {
  return (
    <>
      {" "}
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        pokemon
          .slice(0.1)
          .filter((e) =>
            type == "all"
              ? e && e.name.includes(text.toLowerCase())
              : e.abilities.filter((el) => el.ability.name == type).length &&
                e.name.includes(text.toLowerCase())
          )
          .map((item) => {
            return (
              <>
                <div
                  className="card"
                  key={item.id}
                  onClick={() => infoPokemon(item)}
                >
                  <h2>{item.id}</h2>
                  <img src={item.sprites.front_default} alt="" />
                  <h2>{item.name}</h2>
                </div>
              </>
            );
          })
      )}
    </>
  );
};
export default Card;
