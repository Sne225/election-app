import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import EdgesensorHighRoundedIcon from '@mui/icons-material/EdgesensorHighRounded';
import ViewQuiltRoundedIcon from '@mui/icons-material/ViewQuiltRounded';
import Lottie from 'react-lottie';
import animationData from '../animations/anima.json';

const items = [
  {
    icon: <ViewQuiltRoundedIcon />,
    title: ' Smart Dashboard',
    description:
      'Get insights and analytics to help you make informed decisions through the use of a dashboard.',

  },
  {
    icon: <EdgesensorHighRoundedIcon />,
    title: 'Mobile integration',
    description:
      'The platform is mobile-friendly, allowing you to access it from anywhere, at any time.',
  },
  {
    icon: <DevicesRoundedIcon />,
    title: 'Real-time Updates',
    description:
      'The platform showcases real-time updates about votes, ballots, and everything in between.',

  },
];

const lottieOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData, // Your imported Lottie animation JSON file
};

export default function Features() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };

  const selectedFeature = items[selectedItemIndex];

  return (
    <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
    <Grid container spacing={6}>
      <Grid item xs={12} md={6}>
        <div>
          <Typography component="h2" variant="h4" color="text.primary">
            Product features
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: { xs: 2, sm: 4 } }}
          >Get real-time insights and analytics to help you make informed decisions. With this
            platform, it is easier to track votes of users and get a clear picture of the results.
          </Typography>
        </div>
       
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="flex-start"
          spacing={2}
          useFlexGap
          sx={{ width: '100%', display: { xs: 'none', sm: 'flex' } }}
        >
          {items.map(({ icon, title, description }, index) => (
            <Card
              key={index}
              component={Button}
              onClick={() => handleItemClick(index)}
              sx={{
                p: 3,
                height: 'fit-content',
                width: '100%',
                background: 'none',
                backgroundColor:
                  selectedItemIndex === index ? 'action.selected' : undefined,
                borderColor: (theme) => {
                  if (theme.palette.mode === 'light') {
                    return selectedItemIndex === index
                      ? 'primary.light'
                      : 'grey.200';
                  }
                  return selectedItemIndex === index ? 'primary.dark' : 'grey.800';
                },
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  textAlign: 'left',
                  flexDirection: { xs: 'column', md: 'row' },
                  alignItems: { md: 'center' },
                  gap: 2.5,
                }}
              >
                <Box
                  sx={{
                    color: (theme) => {
                      if (theme.palette.mode === 'light') {
                        return selectedItemIndex === index
                          ? 'primary.main'
                          : 'grey.300';
                      }
                      return selectedItemIndex === index
                        ? 'primary.main'
                        : 'grey.700';
                    },
                  }}
                >
                  {icon}
                </Box>
                <div>
                  <Typography
                    color="text.primary"
                    variant="body2"
                    fontWeight="bold"
                  >
                    {title}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    variant="body2"
                    sx={{ my: 0.5 }}
                  >
                    {description}
                  </Typography>
                  <Link
                    color="primary"
                    variant="body2"
                    fontWeight="bold"
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      '& > svg': { transition: '0.3s' },
                      '&:hover > svg': { transform: 'translateX(10px)' },
                    }}
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                  >
                    <span>Learn more</span>
                    <ChevronRightRoundedIcon
                      fontSize="small"
                      sx={{ mt: '1px', ml: '2px' }}
                    />
                  </Link>
                </div>
              </Box>
            </Card>
          ))}
        </Stack>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{ display: { xs: 'none', sm: 'flex' }, width: '100%' }}
      >
        <Card
          variant="outlined"
          sx={{
            height: '100%',
            width: '100%',
            display: { xs: 'none', sm: 'flex' },
            pointerEvents: 'none',
          }}
        >
          <Box
            sx={{
              m: 'auto',
              width: 420,
              height: 500,
              backgroundSize: 'contain'
            }}
          >
            <Lottie 
              options={lottieOptions}
              height={500}
              width={500}
              isStopped={false}
              isPaused={false} />   
            </Box>
        </Card>
      </Grid>
    </Grid>
  </Container>
  );
}
