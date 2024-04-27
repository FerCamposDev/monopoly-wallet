import { INewPlayer } from '@monopoly-wallet/shared-types';
import { Avatar, Button, Container, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Radio, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useGame } from '../context/game/useGame';
import { useGameSockets } from '../context/sockets/useGameSockets';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../commons/enums/routes.enum';
import { getTokenImagePath } from '../commons/helpers/images';
import withAuth from '../hocs/withAuth';
import { TokenOption } from '../commons/interfaces';
import { ArrowBackOutlined } from '@mui/icons-material';
import { useThemeActions } from '../theme/ThemeContext';
import { colorByToken } from '../commons/mappers/tokens';

const LobbyPage = () => {
  const navigate = useNavigate();

  const { availableTokens, game, reset } = useGame();
  const { actions, socket } = useGameSockets();
  const { setPrimaryColor } = useThemeActions();

  const [selectedToken, setSelectedToken] = useState<TokenOption>();
  const [username, setUsername] = useState('');

  const handleLeaveRoom = () => actions.leaveRoom(reset);

  const handleSelection = (option: TokenOption) => {
    setSelectedToken(option);
    setPrimaryColor(colorByToken[option.value]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedToken) {
      const player: INewPlayer = {
        name: username,
        token: selectedToken.value,
      };

      if (selectedToken.usedBy) {
        actions.joinGameToToken(player);
        return;
      }

      actions.joinGame(player);
    }
  };

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
      <form onSubmit={handleSubmit}>
        <Stack maxHeight="100vh" gap={4} p={{ xs: 2, sm: 4 }}>
          <Grid>
            <IconButton onClick={handleLeaveRoom}>
              <ArrowBackOutlined />
            </IconButton>
            <Typography variant="h5" textAlign="center">
              Welcome to {game?.room}
            </Typography>
          </Grid>
          <TextField
            fullWidth
            required
            label="Username"
            name="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <List dense sx={{ width: '100%', bgcolor: 'background.paper', overflowY: 'scroll' }}>
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
            type="submit"
            disabled={!selectedToken}
          >
            Enter
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default withAuth(LobbyPage);
