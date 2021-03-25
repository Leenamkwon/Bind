import React, { useMemo, memo } from 'react';
import { GridList, GridListTile, useMediaQuery, useTheme } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

export default memo(function PhotoListSkeleton() {
  const theme = useTheme();
  const xsMatches = useMediaQuery(theme.breakpoints.down('xs'));
  const smMatches = useMediaQuery(theme.breakpoints.down('sm'));
  const mdMatches = useMediaQuery(theme.breakpoints.up('md'));

  const gridColsResponsive = useMemo(() => {
    if (xsMatches) return 1;
    if (smMatches) return 2;
    if (mdMatches) return 3;
  }, [mdMatches, smMatches, xsMatches]);

  return (
    <GridList cellHeight='auto' spacing={6} cols={gridColsResponsive}>
      {Array.from({ length: 3 }).map((_, i) => (
        <GridListTile key={i}>
          <Skeleton variant='rect' height={300} animation='wave' />
          <Skeleton variant='text' width={'70%'} />
        </GridListTile>
      ))}
    </GridList>
  );
});
