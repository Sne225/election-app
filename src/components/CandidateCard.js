import React, { } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StarIcon from '@mui/icons-material/VolunteerActivismSharp';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CandidateCard({ candidate, onVote }) {
  const { name, surname, manifesto, party, image } = candidate;
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
      <Card sx={{ maxWidth: 300 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="candidate">
              {name[0]}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <FavoriteIcon />
            </IconButton>
          }
          title={`${name} ${surname}`}
          subheader={`${party}`} // You can change this to the appropriate date format
        />
        <CardMedia
          component="img"
          height="250px"
          width="250px"
          image={image} // Use the image URL from the database
          alt="Candidate image"
          
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
          
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" sx={{ alignItems: "center" }} onClick={onVote}>
            <StarIcon /> <Typography sx={{ marginLeft: '8px' }}>Vote</Typography>
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {manifesto}
          </CardContent>
        </Collapse>
      </Card>
  );
}
