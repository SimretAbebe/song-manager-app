import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchSongsRequested,
  deleteSongRequested,
  setCurrentPage,
} from "../store/slices/songsSlice";
import songService from "../services/songService";


const SongListContainer = styled.div`
  width: 100%;
`;


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

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(1)};
  margin-top: ${({ theme }) => theme.spacing(3)};
`;

const PageButton = styled.button`
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
  border: 1px solid ${({ theme }) => theme.colors.divider};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  background-color: ${(props) =>
    props.active ? props.theme.colors.primary : props.theme.colors.background.paper};
  color: ${(props) => (props.active ? "white" : props.theme.colors.text.primary)};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.body2.fontSize};

  &:hover {
    background-color: ${(props) =>
    props.active ? props.theme.colors.primary : props.theme.colors.action.hover};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
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

function SongList({ onEditClick }) {
  // Use useSelector to get state from the Redux store
  const songs = useSelector((state) => state.songs.songs);
  const isLoading = useSelector((state) => state.songs.isLoading);
  const error = useSelector((state) => state.songs.error);
  const currentPage = useSelector((state) => state.songs.currentPage);
  const songsPerPage = useSelector((state) => state.songs.songsPerPage);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSongsRequested());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this song?")) {
      dispatch(deleteSongRequested(id));
    }
  };

  // Pagination Logic
  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = songs.slice(indexOfFirstSong, indexOfLastSong);
  const totalPages = Math.ceil(songs.length / songsPerPage);

  const paginate = (pageNumber) => dispatch(setCurrentPage(pageNumber));

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

      {currentSongs.map((song) => (
        <SongItem key={song.id}>
          <SongInfo>
            <SongTitle>{song.title}</SongTitle>
            <SongMeta>
              {song.artist} • {song.album} • {song.year}
              <GenreTag>{song.genre}</GenreTag>
            </SongMeta>
          </SongInfo>
          <SongActions>
            <Button primary onClick={() => onEditClick(song)}>Edit</Button>
            <Button danger onClick={() => handleDelete(song.id)}>Delete</Button>
          </SongActions>
        </SongItem>
      ))}

      <PaginationContainer>
        {[...Array(totalPages)].map((_, index) => (
          <PageButton
            key={index + 1}
            onClick={() => paginate(index + 1)}
            active={index + 1 === currentPage}
            disabled={isLoading}
          >
            {index + 1}
          </PageButton>
        ))}
      </PaginationContainer>
    </SongListContainer>
  );
}

export default SongList;