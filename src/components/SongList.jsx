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
  padding: ${({ theme }) => theme.spacing(2)}; /* Add some internal padding */
`;

const ListTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary.main};
  font-size: ${({ theme }) => theme.typography.h3.fontSize};
  font-weight: ${({ theme }) => theme.typography.h3.fontWeight};
  margin-bottom: ${({ theme }) => theme.spacing(4)}; /* More space below title */
  text-align: center;
  text-shadow: 0.5px 0.5px 1px rgba(0, 0, 0, 0.1);
`;

const SongItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background.paper}; /* Use paper background for items */
  border: 1px solid ${({ theme }) => theme.colors.divider};
  border-radius: ${({ theme }) => theme.shape.borderRadius * 1.5}px; /* Slightly more rounded */
  padding: ${({ theme }) => theme.spacing(2.5)}; /* Increased padding */
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  box-shadow: ${({ theme }) => theme.shadows[1]}; /* Subtle initial shadow */
  transition: box-shadow 0.3s ease, transform 0.3s ease; /* Smooth transitions */

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows[4] || '0px 6px 10px rgba(0,0,0,0.1)'}; /* More prominent shadow on hover */
    transform: translateY(-3px); /* Lift effect on hover */
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: flex-start;
    padding: ${({ theme }) => theme.spacing(2)};
  }
`;

const SongInfo = styled.div`
  flex: 1;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: ${({ theme }) => theme.spacing(2)};
  }
`;

const SongTitle = styled.h4`
  margin: 0 0 ${({ theme }) => theme.spacing(1)} 0;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.h4 ? theme.typography.h4.fontSize : '1.1rem'};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const SongMeta = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  line-height: 1.4;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const GenreTag = styled.span`
  background-color: ${({ theme }) => theme.colors.secondary}; /* Use secondary for distinct tags */
  color: white;
  padding: ${({ theme }) => theme.spacing(0.75)} ${({ theme }) => theme.spacing(1.5)}; /* Larger padding */
  border-radius: 20px; /* Pill shape */
  font-size: 0.8rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-left: ${({ theme }) => theme.spacing(2)}; /* More space from meta info */
  white-space: nowrap;
  box-shadow: ${({ theme }) => theme.shadows[0]}; /* Subtle shadow for tags */

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-top: ${({ theme }) => theme.spacing(1)};
    margin-left: 0;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing(6)}; /* Increased padding */
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.h4 ? theme.typography.h4.fontSize : '1.2rem'};
  font-style: italic;
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: ${({ theme }) => theme.colors.primary.main};
  border-radius: 50%;
  width: 40px; /* Larger spinner */
  height: 40px;
  animation: spin 1s linear infinite;
  margin: ${({ theme }) => theme.spacing(5)} auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(1.5)}; /* Increased gap */
  margin-top: ${({ theme }) => theme.spacing(5)}; /* More space above pagination */
`;

const PageButton = styled.button`
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2.5)}; /* Adjusted padding */
  border: 1px solid ${({ theme }) => theme.colors.divider};
  border-radius: ${({ theme }) => theme.shape.borderRadius * 1.5}px; /* More rounded buttons */
  background-color: ${(props) =>
    props.active ? props.theme.colors.primary.main : props.theme.colors.background.paper};
  color: ${(props) => (props.active ? "white" : props.theme.colors.text.primary)};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: all 0.2s ease;
  min-width: 40px; /* Ensure consistent width for buttons */

  &:hover {
    background-color: ${(props) =>
    props.active ? props.theme.colors.primary.dark : props.theme.colors.action.hover};
    transform: translateY(-2px); /* Slight lift on hover */
    box-shadow: ${({ theme }) => theme.shadows[1]};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    transform: none;
    box-shadow: none;
  }
`;

const SongActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1.5)}; /* Increased gap for buttons */

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
    justify-content: space-around;
  }
`;

const Button = styled.button`
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)}; /* Adjusted padding */
  border: none;
  border-radius: ${({ theme }) => theme.shape.borderRadius * 1.5}px;
  font-size: 0.85rem; /* Slightly larger font */
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;

  background-color: ${(props) =>
    props.primary
      ? props.theme.colors.primary.main
      : props.danger
      ? props.theme.colors.error.main
      : props.theme.colors.action.disabledBackground};
  color: white;

  &:hover {
    background-color: ${(props) =>
    props.primary
      ? props.theme.colors.primary.dark
      : props.danger
      ? props.theme.colors.error.dark
      : props.theme.colors.action.hover};
    transform: translateY(-2px); /* Stronger lift on hover */
    box-shadow: ${({ theme }) => theme.shadows[2]}; /* Add shadow on hover */
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.action.disabledBackground};
    cursor: not-allowed;
    opacity: 0.7;
    transform: none;
    box-shadow: none;
  }
`;

function SongList({ onEditClick }) {
  const songs = useSelector((state) => state.songs.songs);
  const isLoading = useSelector((state) => state.songs.isLoading);
  const error = useSelector((state) => state.songs.error);
  const currentPage = useSelector((state) => state.songs.currentPage);
  const songsPerPage = useSelector((state) => state.songs.songsPerPage);

  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the saga action to fetch songs
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
        <EmptyState>Error: {error}. Please try again later.</EmptyState>
        <Button onClick={() => dispatch(fetchSongsRequested())}>Retry</Button>
      </SongListContainer>
    );
  }

  if (songs.length === 0 && !isLoading && !error) {
    return (
      <SongListContainer>
        <ListTitle>Ethiopian Music Collection</ListTitle>
        <EmptyState>
          No songs available. Start by adding a new Ethiopian song above!
        </EmptyState>
      </SongListContainer>
    );
  }

  // If there are songs but currentSongs is empty (e.g., deleted last song on page)
  if (currentSongs.length === 0 && songs.length > 0 && currentPage > 1) {
    dispatch(setCurrentPage(currentPage - 1)); // Go to previous page if current page is empty
    return null; // Don't render anything while redirecting page
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
            <Button primary onClick={() => onEditClick(song)} disabled={isLoading}>Edit</Button>
            <Button danger onClick={() => handleDelete(song.id)} disabled={isLoading}>Delete</Button>
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
