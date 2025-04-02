import React from 'react';

const CharacterModal = ({ character, onClose }) => {
  if (!character) return null;
  
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        <div className="modal-character-details">
          <img 
            src={character.image} 
            alt={character.name} 
            className="modal-character-image" 
          />
          <div className="modal-character-info">
            <h2>{character.name}</h2>
            <div className="character-attributes">
              <p><strong>Status:</strong> <span className={`status-badge ${character.status.toLowerCase()}`}>{character.status}</span></p>
              <p><strong>Species:</strong> {character.species}</p>
              {character.type && <p><strong>Type:</strong> {character.type}</p>}
              <p><strong>Gender:</strong> {character.gender}</p>
              <p><strong>Origin:</strong> {character.origin.name}</p>
              <p><strong>Location:</strong> {character.location.name}</p>
              <p><strong>Created:</strong> {new Date(character.created).toLocaleDateString()}</p>
              
              <div className="episode-list">
                <p><strong>Episodes ({character.episode.length}):</strong></p>
                <ul>
                  {character.episode.slice(0, 5).map((ep, index) => (
                    <li key={index}>Episode {ep.split('/').pop()}</li>
                  ))}
                  {character.episode.length > 5 && <li>...and {character.episode.length - 5} more</li>}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterModal;
