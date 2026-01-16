import React from "react";
import styled from "@emotion/styled";


const mockSongs = [
  {
    id: 1,
    title: "Tizita",
    artist: "Mulatu Astatke",
    album: "Ethiopian Modern Instrumentals",
    year: 1966,
    genre: "Ethio-Jazz"
  },
  {
    id: 2,
    title: "Yegelle Tezeta",
    artist: "Mulatu Astatke",
    album: "Mulatu of Ethiopia",
    year: 1972,
    genre: "Ethio-Jazz"
  },
  {
    id: 3,
    title: "Amanaye",
    artist: "Asnakech Worku",
    album: "Asnakech",
    year: 1978,
    genre: "Traditional"
  },
  {
    id: 4,
    title: "Tezeta",
    artist: "Mahmoud Ahmed",
    album: "Éthiopiques 7",
    year: 1975,
    genre: "Traditional"
  },
  {
    id: 5,
    title: "Fikratchin",
    artist: "Alemayehu Eshete",
    album: "Éthiopiques 9",
    year: 1969,
    genre: "Traditional"
  }
];

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

// Empty state when no songs
const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing(4)};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
`;

function SongList() {
  
  if (!mockSongs || mockSongs.length === 0) {
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

      {mockSongs.map((song) => (
        <SongItem key={song.id}>
          <SongInfo>
            <SongTitle>{song.title}</SongTitle>
            <SongMeta>
              {song.artist} • {song.album} • {song.year}
              <GenreTag>{song.genre}</GenreTag>
            </SongMeta>
          </SongInfo>
        </SongItem>
      ))}
    </SongListContainer>
  );
}

export default SongList;