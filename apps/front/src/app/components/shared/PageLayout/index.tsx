import { ArrowBack } from '@mui/icons-material';
import { Container, Grid, IconButton, Stack, Typography } from '@mui/material'
import { FC, PropsWithChildren } from 'react'
import { useNavigate } from 'react-router-dom';

type Props = PropsWithChildren<{
  title: string;
  extraAction?: JSX.Element;
}>

const PageLayout: FC<Props> = ({ children, title, extraAction }) => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ height: '100%' }}>
      <Stack height="100vh" gap={4} sx={{ py: 2 }}>
        <Stack>
          <Grid container justifyContent="space-between" alignItems="center">
            <IconButton onClick={() => navigate(-1)}>
              <ArrowBack />
            </IconButton>
            {extraAction}
          </Grid>
          <Typography variant="h5" textAlign="center">
            {title}
          </Typography>
        </Stack>

        {children}
      </Stack>
    </Container>
  )
}

export default PageLayout