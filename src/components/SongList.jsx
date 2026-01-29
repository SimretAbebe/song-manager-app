import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchSongsRequested,
  deleteSongRequested,
} from "../store/slices/songsSlice";
import songService from "../services/songService";

// Container for the entire song list component
const SongListContainer = styled.div`
  width: 100%;
`;

// Section title
const ListTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.h2.fontSize};
  font-weight: ${({ theme }) => theme.typography.h2.fontWeight};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  text-align: center;
`;

const SongItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background.paper};
  border: 1px solid ${({ theme }) => theme.colors.divider};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  padding: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  box-shadow: ${({ theme }) => theme.shadows[1]};
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows[2]};
  }
`;

const SongInfo = styled.div`
  flex: 1;
`;

const SongTitle = styled.h4`
  margin: 0 0 ${({ theme }) => theme.spacing(1)} 0;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  font-weight: 600;
`;

const SongMeta = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  line-height: 1.4;
`;

const GenreTag = styled.span`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing(0.5)} ${({ theme }) => theme.spacing(1)};
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  margin-left: ${({ theme }) => theme.spacing(1)};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing(4)};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
`;

const SongActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const Button = styled.button`
  padding: ${({ theme }) => theme.spacing(0.75)} ${({ theme }) => theme.spacing(1.5)};
  border: none;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  background-color: ${(props) =>
    props.primary
      ? props.theme.colors.primary
      : props.danger
      ? props.theme.colors.error
      : props.theme.colors.action.disabledBackground};
  color: white;

  &:hover {
    background-color: ${(props) =>
    props.primary
      ? "#1565c0"
      : props.danger
      ? "#d32f2f"
      : props.theme.colors.action.disabledBackground};
  }
`;

function SongList() {
  // Use useSelector to get state from the Redux store
  const songs = useSelector((state) => state.songs.songs);
  const isLoading = useSelector((state) => state.songs.isLoading);
  const error = useSelector((state) => state.songs.error);

  //  Use useDispatch to get the dispatch function
  const dispatch = useDispatch();

  // Dispatch the fetchSongsRequested action when the component mounts
  useEffect(() => {
    dispatch(fetchSongsRequested());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this song?")) {
      dispatch(deleteSongRequested(id));
    }
  };

  // Conditional rendering based on global Redux state
  if (isLoading) {
    return (
      <SongListContainer>
        <ListTitle>Loading Ethiopian Music...</ListTitle>
        <EmptyState>Please wait while we fetch the songs.</EmptyState>
      </SongListContainer>
    );
  }

  if (error) {
    return (
      <SongListContainer>
        <ListTitle>Error Loading Music</ListTitle>
        <EmptyState>Error: {error}. Please try again later.</EmptyState>
      </SongListContainer>
    );
  }

  if (songs.length === 0) {
    return (
      <SongListContainer>
        <ListTitle>Ethiopian Music Collection</ListTitle>
        <EmptyState>No songs available. Add some Ethiopian music!</EmptyState>
      </SongListContainer>
    );
  }

  return (
    <SongListContainer>
      <ListTitle>Ethiopian Music Collection</ListTitle>

      {songs.map((song) => (
        <SongItem key={song.id}>
          <SongInfo>
            <SongTitle>{song.title}</SongTitle>
            <SongMeta>
              {song.artist} • {song.album} • {song.year}
              <GenreTag>{song.genre}</GenreTag>
            </SongMeta>
          </SongInfo>
          <SongActions>
            <Button primary>Edit</Button>
            <Button danger onClick={() => handleDelete(song.id)}>Delete</Button>
          </SongActions>
        </SongItem>
      ))}
    </SongListContainer>
  );
}

export default SongList;