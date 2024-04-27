import { Grid, ListItem, useTheme } from '@mui/material';
import { useThemeActions } from '../../../theme/ThemeContext';
import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';

const ToggleThemeButton = () => {
  const { toggleThemeMode } = useThemeActions();
  const { palette } = useTheme();

  const isDark = palette.mode === 'dark';
  
  return (
    <ListItem onClick={toggleThemeMode}>
      <Grid container gap={1} justifyContent="space-between" alignItems="center">
        {isDark ? 'Dark' : 'Light'}
        {isDark ? <DarkModeOutlined /> : <LightModeOutlined />}
      </Grid>
    </ListItem>
  );
};

export default ToggleThemeButton;