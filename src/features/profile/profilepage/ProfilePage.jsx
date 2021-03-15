import React from 'react';
import { deleteUser } from '../../../app/firestore/firestoreService';

export default function ProfilePage() {
  return (
    <div>
      <div onClick={deleteUser}>test</div>
    </div>
  );
}
