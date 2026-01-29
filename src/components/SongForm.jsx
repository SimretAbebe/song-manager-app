import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { addSongRequested, updateSongRequested } from "../store/slices/songsSlice";


const FormContainer = styled.form`
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  padding: ${({ theme }) => theme.spacing(3)};
  box-shadow: ${({ theme }) => theme.shadows[1]};
  border: 1px solid ${({ theme }) => theme.colors.divider};
  max-width: 500px;
  margin: ${({ theme }) => theme.spacing(4)} auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const FormTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.h2.fontSize};
  font-weight: ${({ theme }) => theme.typography.h2.fontWeight};
  margin: 0 0 ${({ theme }) => theme.spacing(2)} 0;
  text-align: center;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing(0.5)};
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing(1.5)};
  border: 1px solid ${({ theme }) => theme.colors.divider};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.primary};
  }
`;

const Select = styled.select`
  padding: ${({ theme }) => theme.spacing(1.5)};
  border: 1px solid ${({ theme }) => theme.colors.divider};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.primary};
  }
`;

const Button = styled.button`
  padding: ${({ theme }) => theme.spacing(1.5)} ${({ theme }) => theme.spacing(3)};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  font-size: ${({ theme }) => theme.typography.button.fontSize};
  font-weight: ${({ theme }) => theme.typography.button.fontWeight};
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    background-color: #1565c0; // Slightly darker primary
    box-shadow: ${({ theme }) => theme.shadows[2]};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.text.disabled};
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  text-align: center;
`;

function SongForm({ editingSong, onFormClose }) {
  const initialFormState = {
    title: '',
    artist: '',
    album: '',
    year: '',
    genre: '',
  };
  const [formData, setFormData] = useState(initialFormState); 

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.songs.isLoading);
  const error = useSelector((state) => state.songs.error);


  useEffect(() => {
    if (editingSong) {
      setFormData(editingSong);
    } else {
      setFormData(initialFormState); 
    }
  }, [editingSong]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.artist && formData.year) {
      if (editingSong) {
        dispatch(updateSongRequested({ id: editingSong.id, ...formData }));
      } else {
        dispatch(addSongRequested(formData));
      }
      setFormData(initialFormState);
      onFormClose(); 
    } else {
      console.error("Form validation failed: Title, Artist, and Year are required.");
    }
  };

  const ethiopianGenres = [
    "Ethio-Jazz", "Traditional", "Ethiopian Pop", "Blues", "Soul"
  ];

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormTitle>{editingSong ? 'Edit Song' : 'Add New Ethiopian Song'}</FormTitle>
      
      <FormGroup>
        <Label htmlFor="title">Title:</Label>
        <Input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g., Tizita"
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="artist">Artist:</Label>
        <Input
          id="artist"
          name="artist"
          type="text"
          value={formData.artist}
          onChange={handleChange}
          placeholder="e.g., Mulatu Astatke"
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="album">Album:</Label>
        <Input
          id="album"
          name="album"
          type="text"
          value={formData.album}
          onChange={handleChange}
          placeholder="e.g., Éthiopiques Vol. 4"
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="year">Year:</Label>
        <Input
          id="year"
          name="year"
          type="number"
          value={formData.year}
          onChange={handleChange}
          placeholder="e.g., 1966"
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="genre">Genre:</Label>
        <Select
          id="genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          required
        >
          <option value="">Select a Genre</option>
          {ethiopianGenres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </Select>
      </FormGroup>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? (editingSong ? 'Updating...' : 'Adding Song...') : (editingSong ? 'Update Song' : 'Add Song')}
      </Button>
      {editingSong && (
        <Button type="button" onClick={onFormClose} disabled={isLoading}>
          Cancel
        </Button>
      )}

      {error && <ErrorMessage>Error: {error}</ErrorMessage>}
    </FormContainer>
  );
}

export default SongForm;
