import React from 'react';

const CharacterCard = ({ character, onClick }) => {
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'status-alive';
      case 'dead':
        return 'status-dead';
      default:
        return 'status-unknown';
    }
  };

  return (
    <div className="character-card" onClick={() => onClick(character.id)}>
      <img 
        src={character.image} 
        alt={character.name} 
        className="character-image" 
      />
      <div className="character-info">
        <h2 className="character-name">
          {character.name}
          <span className={`status-badge ${getStatusClass(character.status)}`}>
            {character.status}
          </span>
        </h2>
        <p><strong>Species:</strong> {character.species}</p>
        {character.type && <p><strong>Type:</strong> {character.type}</p>}
        <p><strong>Gender:</strong> {character.gender}</p>
        <p><strong>Origin:</strong> {character.origin.name}</p>
        <p><strong>Location:</strong> {character.location.name}</p>
        <p><strong>Episodes:</strong> {character.episode.length}</p>
      </div>
    </div>
  );
};

export default CharacterCard;
