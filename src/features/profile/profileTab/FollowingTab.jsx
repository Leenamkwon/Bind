import React, { useEffect } from 'react';
import { Avatar, Box, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { FixedSizeList } from 'react-window';
import { useDispatch, useSelector } from 'react-redux';

import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection';
import { getFollowerscollection, getFollowingcollection } from '../../../app/firestore/firestoreService';
import { listenToFollowers, listenToFollowings } from '../profileActions';
import { Link } from 'react-router-dom';

export default function FollowingTab(props) {
  const { value, index, profile } = props;
  const { followings, followers } = useSelector((state) => state.profile);
  const { loading } = useSelector((state) => state.async);
  const dispatch = useDispatch();

  useFirestoreCollection({
    query: value === 2 ? () => getFollowerscollection(profile.id) : () => getFollowingcollection(profile.id),
    data: (data) => (value === 2 ? dispatch(listenToFollowers(data)) : dispatch(listenToFollowings(data))),
    deps: [dispatch, profile.id],
  });

  useEffect(() => {
    if (!loading) {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'instant',
      });
    }
  }, [loading]);

  return (
    <div role='tabpanel' hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`}>
      {value === index && (
        <Box p={2}>
          <FixedSizeList
            height={380}
            itemSize={64}
            itemData={value === 2 ? followers : followings}
            itemCount={value === 2 ? followers.length : followings.length}
          >
            {renderRow}
          </FixedSizeList>
        </Box>
      )}
    </div>
  );
}

function renderRow(props) {
  const { data, index, style } = props;

  return (
    <ListItem button style={style} key={data[index].id} component={Link} to={`/profile/${data[index].uid}`}>
      <ListItemAvatar>
        <Avatar src={data[index]?.photoURL || null} />
      </ListItemAvatar>
      <ListItemText primary={data[index].displayName} />
    </ListItem>
  );
}
