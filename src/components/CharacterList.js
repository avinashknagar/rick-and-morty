import React from 'react';
import CharacterCard from './CharacterCard';

const CharacterList = ({ characters }) => {
  if (!characters || characters.length === 0) {
    return <div>No characters found</div>;
  }

  return (
    <div className="character-grid">
      {characters.map(character => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
};

export default CharacterList;
