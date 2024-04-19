import { ArrowBack } from '@mui/icons-material';
import { Container, Grid, IconButton, Stack, Typography } from '@mui/material'
import { FC, PropsWithChildren } from 'react'
import { useNavigate } from 'react-router-dom';

type Props = PropsWithChildren<{
  title: string;
}>

const PageLayout: FC<Props> = ({ children, title }) => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ height: '100%' }}>
      <Stack height="100vh" gap={4} sx={{ py: 2 }}>
        <Grid>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h5" textAlign="center">
            {title}
          </Typography>
        </Grid>
        {children}
      </Stack>
    </Container>
  )
}

export default PageLayout