import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Tooltip,
  Typography,
} from '@mui/material';
import { red } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import staticImage from '../../assets/images/static_image.png';
import { RootState } from '../../store/rootReducer';
import { useGetFormattedDate } from '../hooks/useGetFormattedDate';
import styles from './hacker-items.module.scss';
import { selectAuthor } from './hackerItemSlice';
import { HackerItemsTypes } from './types';
interface Props {
  item: HackerItemsTypes.HackerItems;
}

const HackerItem: React.FC<Props> = ({ item }) => {
  const author = useSelector((state: RootState) => selectAuthor(state, item.by));
  const formattedDate = useGetFormattedDate(item.time);
  return (
    <Grid item xs={12} md={4}>
      <div className={styles['hacker-item']}>
        <Card sx={{ maxWidth: 345, margin: '0 auto', minHeight: '300px' }}>
          <CardHeader
            avatar={
              <Tooltip title="Author Karma" arrow>
                <Avatar sx={{ bgcolor: red[500], fontSize: '0.8rem' }} aria-label="karma">
                  {author ? author.karma : ''}
                </Avatar>
              </Tooltip>
            }
            title={item.by}
            subheader={formattedDate}
          />
          <CardMedia component="img" height="140" image={staticImage} alt="Hacker Image" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              <div className={styles['title']}>
                <h2>{item.title}</h2>
              </div>
            </Typography>
          </CardContent>
          <CardActions>
            <Tooltip title="Story Score" arrow>
              <FavoriteIcon />
            </Tooltip>
            {item.score}
            <Button size="small" href={item.url} target="_blank">
              Link
            </Button>
          </CardActions>
        </Card>
      </div>
    </Grid>
  );
};
export default HackerItem;
