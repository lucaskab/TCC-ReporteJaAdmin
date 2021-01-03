import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 28px;
  background: #28262e;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`; 

export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-size: 20px;
  line-height: 28px;
`;

export const UserName = styled.Text`
  color: #ff9000;
`;

export const ProfileButton = styled.TouchableOpacity`
 
`;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`;

export const ActionsListContainer = styled.ScrollView`
  padding: 32px 24px 50px;
`;

export const ActionsItem = styled(RectButton)`
  background: #3e3b47;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
`;

export const  ActionImage = styled.Image`
  border-radius: 32px;
`; 

export const ActionInfo = styled.View`
  flex: 1;
  margin-left: 20px;
`;
export const ActionName  = styled.Text`
  font-size: 18px;
  color: #ff9000;
`;

export const ActionsListTitle = styled.Text`
  font-size: 24px;
  margin-bottom: 24px;
  color: #ff9000;
  align-self: center;
`;
