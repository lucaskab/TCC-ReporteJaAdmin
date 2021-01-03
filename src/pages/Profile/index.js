import React from 'react';
import { View, Button } from 'react-native';

import { useAuth } from '../../hooks/auth';

const Profile = () => {
  const { user } = useAuth();

  return (
    <View>
    </View>
  );
};

export default Profile;