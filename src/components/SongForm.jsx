import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { addSongRequested, updateSongRequested } from "../store/slices/songsSlice";

const FormContainer = styled.form`
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.shape.borderRadius * 2}px; /* More rounded */
  padding: ${({ theme }) => theme.spacing(4)}; /* Increased padding */
  box-shadow: ${({ theme }) => theme.shadows[4]}; /* More prominent shadow */
  border: 1px solid ${({ theme }) => theme.colors.divider};
  max-width: 550px; /* Slightly wider form */
  margin: ${({ theme }) => theme.spacing(6)} auto; /* More margin top/bottom */
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)}; /* Increased gap between form groups */

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin: ${({ theme }) => theme.spacing(4)} auto;
    padding: ${({ theme }) => theme.spacing(3)};
    border-radius: ${({ theme }) => theme.shape.borderRadius}px;
    box-shadow: ${({ theme }) => theme.shadows[2]};
  }
`;

const FormTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary.main};
  font-size: ${({ theme }) => theme.typography.h2.fontSize};
  font-weight: ${({ theme }) => theme.typography.h2.fontWeight};
  margin: 0 0 ${({ theme }) => theme.spacing(3)} 0; /* More margin below title */
  text-align: center;
  text-shadow: 0.5px 0.5px 1px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.body1.fontSize}; /* Slightly larger label */
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing(1.5)};
  border: 1px solid ${({ theme }) => theme.colors.divider};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  transition: all 0.2s ease;
  background-color: ${({ theme }) => theme.colors.background.default};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary.main}; /* Stronger focus glow */
  }
`;

const Select = styled.select`
  padding: ${({ theme }) => theme.spacing(1.5)};
  border: 1px solid ${({ theme }) => theme.colors.divider};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  transition: all 0.2s ease;
  background-color: ${({ theme }) => theme.colors.background.default};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary.main};
  }
`;

const Button = styled.button`
  padding: ${({ theme }) => theme.spacing(1.5)} ${({ theme }) => theme.spacing(3)};
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.shape.borderRadius * 1.5}px; /* More rounded */
  font-size: ${({ theme }) => theme.typography.button.fontSize};
  font-weight: ${({ theme }) => theme.typography.button.fontWeight};
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  margin-top: ${({ theme }) => theme.spacing(2)}; /* Margin for buttons */

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.dark}; 
    transform: translateY(-2px); /* Lift effect */
    box-shadow: ${({ theme }) => theme.shadows[2]};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.action.disabledBackground};
    cursor: not-allowed;
    opacity: 0.7;
    transform: none;
    box-shadow: none;
  }

  &.cancel-button {
    background-color: ${({ theme }) => theme.colors.text.secondary};
    margin-top: ${({ theme }) => theme.spacing(1)};

    &:hover {
      background-color: #616161; /* Darker gray for cancel hover */
      transform: translateY(-2px);
      box-shadow: ${({ theme }) => theme.shadows[2]};
    }
    &:disabled {
      background-color: ${({ theme }) => theme.colors.action.disabledBackground};
    }
  }
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error.main};
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing(1)};
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
  const [localErrorMessage, setLocalErrorMessage] = useState(null); 

  useEffect(() => {
    if (editingSong) {
      setFormData(editingSong);
    } else {
      setFormData(initialFormState); 
    }
    setLocalErrorMessage(null); 
  }, [editingSong]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setLocalErrorMessage(null); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalErrorMessage(null); 

    if (!formData.title || !formData.artist || !formData.year) {
      setLocalErrorMessage("Title, Artist, and Year are required.");
      return;
    };

    if (editingSong) {
      dispatch(updateSongRequested({ id: editingSong.id, ...formData }));
    } else {
      dispatch(addSongRequested(formData));
    }
    setFormData(initialFormState);
    onFormClose();
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
        <Button type="button" onClick={onFormClose} disabled={isLoading} className="cancel-button">
          Cancel
        </Button>
      )}

      {localErrorMessage && <ErrorMessage>{localErrorMessage}</ErrorMessage>}
    </FormContainer>
  );
}

export default SongForm;
