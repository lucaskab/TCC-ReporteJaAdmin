import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';


import { useAuth } from '../../hooks/auth';

import { Container, Header, HeaderTitle, UserName, ProfileButton, UserAvatar, ActionsListContainer, ActionsListTitle, ActionsItem, ActionImage, ActionInfo, ActionName } from './styles';


const Dashboard = () => {
  const { signOut, user } = useAuth();
  const {navigate} = useNavigation();

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  },[navigate]);

  const navigateToArea = useCallback(() => {
    navigate('Area');
  },[navigate]);

  const navigateToType = useCallback(() => {
    navigate('Type');
  },[navigate]);

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {"\n"}
          <UserName>{user.name}</UserName>
        </HeaderTitle>

        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={require('../../assets/logo.png')}/>
        </ProfileButton>
      </Header>
      <ActionsListContainer>
        <ActionsListTitle>Ações de ADMIN</ActionsListTitle>

        <ActionsItem onPress={navigateToArea}>
          <ActionImage source={require('../../assets/logo.png')} />
          <ActionInfo>
            <ActionName>Área do problema</ActionName>
          </ActionInfo>
        </ActionsItem>

        <ActionsItem onPress={navigateToType}>
          <ActionImage source={require('../../assets/logo.png')} />
          <ActionInfo>
            <ActionName>Tipo do problema</ActionName>
          </ActionInfo>
        </ActionsItem>

        <ActionsItem onPress={() => {}}>
          <ActionImage source={require('../../assets/logo.png')} />
          <ActionInfo>
            <ActionName>Dados Gerais</ActionName>
          </ActionInfo>
        </ActionsItem>

        <ActionsItem onPress={() => {}}>
          <ActionImage source={require('../../assets/logo.png')} />
          <ActionInfo>
            <ActionName>Dados específicos de sua área</ActionName>
          </ActionInfo>
        </ActionsItem>

        <ActionsItem onPress={() => {}}>
          <ActionImage source={require('../../assets/logo.png')} />
          <ActionInfo>
            <ActionName>Dados específicos de sua área</ActionName>
          </ActionInfo>
        </ActionsItem>

        <ActionsItem onPress={() => {}}>
          <ActionImage source={require('../../assets/logo.png')} />
          <ActionInfo>
            <ActionName>Dados específicos de sua área</ActionName>
          </ActionInfo>
        </ActionsItem>

        <ActionsItem onPress={() => {}}>
          <ActionImage source={require('../../assets/logo.png')} />
          <ActionInfo>
            <ActionName>Dados específicos de sua área</ActionName>
          </ActionInfo>
        </ActionsItem>

      </ActionsListContainer>
    </Container>
  );
};

export default Dashboard;