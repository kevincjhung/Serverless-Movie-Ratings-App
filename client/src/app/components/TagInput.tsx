import React, { useState } from 'react';

import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';


const TagInput: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      setTags((prevTags) => [...prevTags, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleButtonClick = () => {
    if (inputValue.trim() !== '') {
      setTags((prevTags) => [...prevTags, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleDelete = (tagToDelete: string) => () => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <div>
      <TextField
        label="Enter tags"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        fullWidth
        variant="outlined"
        margin="normal"
        placeholder="Type and press Enter or click the button to add a tag"
      />
      <Button variant="contained" color="primary" onClick={handleButtonClick}>
        Add Tag
      </Button>
      <div style={{ marginTop: 20 }}>
        {tags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            onDelete={handleDelete(tag)}
            color="primary"
            variant="outlined"
            style={{ margin: 4 }}
          />
        ))}
      </div>
    </div>
  );
};

export default TagInput;
