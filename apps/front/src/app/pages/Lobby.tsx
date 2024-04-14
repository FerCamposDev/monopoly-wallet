import { INewPlayer } from "@monopoly-wallet/shared-types";
import { Avatar, Button, Container, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Radio, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useGame } from "../context/game/useGame";
import { useGameSockets } from "../context/sockets/useGameSockets";
import { useNavigate } from "react-router-dom";
import { Routes } from "../commons/enums/routes.enum";
import { getTokenImagePath } from "../commons/helpers/images";
import withAuth from "../hocs/withAuth";
import { TokenOption } from "../commons/interfaces";

const LobbyPage = () => {
  const { availableTokens, game } = useGame();
  const { actions, socket } = useGameSockets();
  const navigate = useNavigate();
  const [selectedToken, setSelectedToken] = useState<TokenOption>();
  const [username, setUsername] = useState('');

  const handleSelection = (value: TokenOption) => {
    setSelectedToken(value);
  };

  const handleEnter = () => {
    if (game?.room && selectedToken) {
      console.log('Joining', socket.id);
      const player: INewPlayer = {
        name: username,
        token: selectedToken.value,
      }

      if (selectedToken.usedBy) {
        actions.joinGameToToken(player);
        return;
      }

      actions.joinGame(player)
    }
  }

  const playerSockets = game?.players.map(p => p.socketId).toString();

  useEffect(() => {
    const isUserInGame = game?.players.some(p => p.socketId === socket.id);
    if (isUserInGame) {
      navigate(Routes.Game);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerSockets, socket]);

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
                onClick={() => handleSelection(opt)}
                secondaryAction={
                  <Radio
                    edge="end"
                    checked={selectedToken?.value === opt.value}
                  />
                }
                disablePadding
              >
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar
                      alt="token option"
                      src={getTokenImagePath(opt.value)}
                    />
                  </ListItemAvatar>
                  <ListItemText primary={opt.label} secondary={opt.usedBy} />
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

export default withAuth(LobbyPage);
