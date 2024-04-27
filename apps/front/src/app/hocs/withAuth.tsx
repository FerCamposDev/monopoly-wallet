import { FC, useEffect } from 'react';
import { JSX } from 'react/jsx-runtime';
import { useGame } from '../context/game/useGame';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../commons/enums/routes.enum';
import { getRoomPath } from '../commons/helpers/routes';

const withAuth = (Component: FC) => {
  const WithAuth = (props: JSX.IntrinsicAttributes) => {
    const { player, game } = useGame();
    const navigate = useNavigate();
    
    useEffect(() => {
      if (!game?.room) {
        navigate(Routes.Home);
      } else if (!player) {
        navigate(getRoomPath(game.room));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [player, game?.room]);

    return <Component {...props} />;
  };

  // WithAuth.displayName = `withAuth(${Component.displayName || Component.name})`;
  return WithAuth;
};

export default withAuth;

