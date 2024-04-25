import { FC, useEffect, useState } from "react"
import { LocalStorageKey } from "../../../commons/enums/storage.enum";
import { Button, Collapse, Grid, Paper, Stack, styled, Typography } from "@mui/material";
import { gt } from "semver";

const StyledCollapse = styled(Collapse)({
  position: 'absolute',
  zIndex: 1,
  bottom: 10,
  left: 0,
  right: 0,
  margin: '0 auto',
});

const AppVersionDetector: FC = () => {
  const [isOldVersion, setIsOldVersion] = useState(false);
  const [lastVersion, setLastVersion] = useState('');

  const checkLastVersion = async () => {
    const storageVersion = localStorage.getItem(LocalStorageKey.Version) || '0.1.0';

    try {
      const meta = await fetch('/meta.json');
      const data = await meta.json();
      if (storageVersion && data?.appVersion) {
        setLastVersion(data?.appVersion);
        const isGreater = gt(data.appVersion, storageVersion);
        setIsOldVersion(isGreater);
      }
    } catch (error) {
      console.log('Meta file error >> ', error);
    }
  };

  const update = async () => {
    const newUrl =  window.location.href + "?no-cache=" + new Date().getTime();
    await fetch(newUrl, {
      headers: {
          Pragma: 'no-cache',
          Expires: '-1',
          'Cache-Control': 'no-cache',
      },
  });
    localStorage.setItem(LocalStorageKey.Version, lastVersion);
    window.location.href = newUrl;
  }

  useEffect(() => {
    checkLastVersion();
  }, []);

  return (
    <StyledCollapse in={isOldVersion}>
      <Paper sx={{ py: 2, px: 1 }}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Stack>
            <Typography variant="h6">
              New Version Available!
            </Typography>
            <Typography variant="subtitle1">
              Please, update to get the last features.
            </Typography>
          </Stack>
          <Grid item>
            <Button variant="contained" onClick={update}>
              Update
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </StyledCollapse>
  )
}

export default AppVersionDetector