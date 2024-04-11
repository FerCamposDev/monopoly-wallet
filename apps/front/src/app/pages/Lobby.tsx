import { Token } from "@monopoly-wallet/shared-types";
import { Avatar, Button, Container, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Radio, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useGame } from "../context/game/useGame";
import { useGameSockets } from "../context/sockets/useGameSockets";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../commons/enums/routes.enum";

const LobbyPage = () => {
  const { availableTokens, game } = useGame();
  const { actions, socket } = useGameSockets();
  const navigate = useNavigate();
  const [selectedToken, setSelectedToken] = useState<Token>();
  const [username, setUsername] = useState('');

  const handleSelection = (value: Token) => {
    setSelectedToken(value);
  };

  const handleEnter = () => {
    if (game?.room && selectedToken) {
      console.log('Joining', socket.id);

      actions.joinGame(game?.room, {
        name: username,
        token: selectedToken,
      })
    }
  }

  useEffect(() => {
    const isUserInGame = game?.players.some(p => p.socketId === socket.id);
    if (isUserInGame) {
      navigate(Routes.Game);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game?.players.length, socket]);

  useEffect(() => {
    if (!game?.room) {
      navigate(Routes.Home);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game?.room])

  return (
    <Container maxWidth="sm">
      <Stack gap={4} p={{ xs: 2, sm: 4 }}>
        <Typography variant="h5" textAlign="center">
          Welcome to {game?.room}
        </Typography>
        <TextField
          fullWidth
          autoFocus
          label="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {availableTokens.map((opt) => {
            return (
              <ListItem
                key={opt.value}
                onClick={() => handleSelection(opt.value)}
                secondaryAction={
                  <Radio
                    edge="end"
                    checked={selectedToken === opt.value}
                  />
                }
                disablePadding
              >
                <ListItemButton onClick={() => console.log(`/images/tokens/${opt.value}.png`)}>
                  <ListItemAvatar>
                    <Avatar
                      alt="token option"
                      src={`/assets/images/tokens/${opt.value}.png`}
                    />
                  </ListItemAvatar>
                  <ListItemText primary={opt.label} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <Button
          variant="contained"
          onClick={handleEnter}
          disabled={!username || !selectedToken}
        >
          Enter
        </Button>
      </Stack>
    </Container>
  )
}

export default LobbyPage