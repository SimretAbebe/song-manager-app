import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchSongsRequested,
  deleteSongRequested,
  setCurrentPage,
} from "../store/slices/songsSlice";



const SongListContainer = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(2)};
`;

const ListTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary.main};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing(6)};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: ${({ theme }) => theme.colors.primary.main};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: ${({ theme }) => theme.spacing(5)} auto;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(1.5)};
  margin-top: ${({ theme }) => theme.spacing(5)};
`;

const PageButton = styled.button`
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
  cursor: pointer;
`;



function SongList({ onEditClick }) {
  const dispatch = useDispatch();

 
  const songs = useSelector((state) => state.songs.songs) || [];
  const isLoading = useSelector((state) => state.songs.isLoading);
  const error = useSelector((state) => state.songs.error);
  const currentPage = useSelector((state) => state.songs.currentPage);
  const songsPerPage = useSelector((state) => state.songs.songsPerPage);

 
  useEffect(() => {
    dispatch(fetchSongsRequested());
  }, [dispatch]);

 
  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = songs.slice(indexOfFirstSong, indexOfLastSong);
  const totalPages = Math.ceil(songs.length / songsPerPage);

  
  useEffect(() => {
    if (songs.length > 0 && currentSongs.length === 0 && currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  }, [songs, currentSongs, currentPage, dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this song?")) {
      dispatch(deleteSongRequested(id));
    }
  };

 

  if (isLoading) {
    return (
      <SongListContainer>
        <ListTitle>Fetching Ethiopian Music...</ListTitle>
        <Spinner />
        <EmptyState>Please wait while we load your songs.</EmptyState>
      </SongListContainer>
    );
  }

  if (error) {
    return (
      <SongListContainer>
        <ListTitle>Error Loading Music</ListTitle>
        <EmptyState>{error}</EmptyState>
      </SongListContainer>
    );
  }

  if (songs.length === 0) {
    return (
      <SongListContainer>
        <ListTitle>Ethiopian Music Collection</ListTitle>
        <EmptyState>No songs available.</EmptyState>
      </SongListContainer>
    );
  }

 

  return (
    <SongListContainer>
      <ListTitle>Ethiopian Music Collection</ListTitle>

      {currentSongs.map((song) => (
        <div key={song.id}>
          <strong>{song.title}</strong> — {song.artist}
          <button onClick={() => onEditClick(song)}>Edit</button>
          <button onClick={() => handleDelete(song.id)}>Delete</button>
        </div>
      ))}

      <PaginationContainer>
        {[...Array(totalPages)].map((_, index) => (
          <PageButton
            key={index}
            onClick={() => dispatch(setCurrentPage(index + 1))}
          >
            {index + 1}
          </PageButton>
        ))}
      </PaginationContainer>
    </SongListContainer>
  );
}

export default SongList;
