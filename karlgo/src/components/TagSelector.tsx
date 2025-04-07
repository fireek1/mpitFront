import React from 'react';

type TagSelectorProps = {
  allTags: string[];
  selectedTags: string[];
  onSelect: (tag: string) => void;
  onRemove: (tag: string) => void;
  maxTags?: number;
};

const TagSelector: React.FC<TagSelectorProps> = ({
  allTags,
  selectedTags,
  onSelect,
  onRemove,
  maxTags = 3,
}) => {
  const availableTags = allTags.filter((tag) => !selectedTags.includes(tag));

  return (
    <div>
      <label>Выберите интересы (макс. {maxTags}):</label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', margin: '10px 0' }}>
        {availableTags.map((tag) => (
          <div
            key={tag}
            onClick={() => selectedTags.length < maxTags && onSelect(tag)}
            style={{
              padding: '5px 10px',
              backgroundColor: '#eee',
              color: 'black',
              borderRadius: '20px',
              cursor: 'pointer',
            }}
          >
            {tag}
          </div>
        ))}
      </div>

      <label>Выбранные:</label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {selectedTags.map((tag) => (
          <div
            key={tag}
            onClick={() => onRemove(tag)}
            style={{
              padding: '5px 10px',
              backgroundColor: '#a68df5',
              color: 'white',
              borderRadius: '20px',
              cursor: 'pointer',
            }}
          >
            {tag} ✕
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagSelector;
