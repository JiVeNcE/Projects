import React, { useCallback, useEffect } from 'react';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import Loader from '../loader/Loader';
import styles from './hacker-items.module.scss';
import HackerItem from './HackerItem';
import { fetchHackerItems, selectHackerItems, selectIsLoading } from './hackerItemSlice';

const HackerItemsList: React.FC = () => {
  const dispatch = useDispatch();

  const hackerItems = useSelector((state: RootState) => selectHackerItems(state));
  const isLoading = useSelector((state: RootState) => selectIsLoading(state));

  useEffect(() => {
    if (!isLoading) {
      dispatch(fetchHackerItems());
    }
  }, [dispatch]);

  const renderRows = useCallback((item) => <HackerItem key={item.id} item={item} />, []);

  return (
    <div className={styles['hacker-items-list']}>
      <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
        {isLoading ? <Loader /> : hackerItems ? hackerItems.map((item) => renderRows(item)) : null}
      </Grid>
    </div>
  );
};

export default HackerItemsList;
