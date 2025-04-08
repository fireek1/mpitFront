import React from 'react';
import './TagSelector.css';

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
  const handleClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onRemove(tag);
    } else if (selectedTags.length < maxTags) {
      onSelect(tag);
    }
  };

  return (
    <div className="tag-selector">
      <label className="label-selector">
        Выберите интересы (макс. {maxTags}):
      </label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', margin: '10px 0' }}>
        {allTags.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          return (
            <div
              key={tag}
              onClick={() => handleClick(tag)}
              className='button-select'
              style={{
                backgroundColor: isSelected ? '#FF6A00' : '#FFF',
                color: isSelected ? 'white' : 'black',
                transition: '0.2s',
              }}
            >
              {tag}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TagSelector;
