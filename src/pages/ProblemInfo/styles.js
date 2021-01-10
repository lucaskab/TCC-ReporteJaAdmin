import { RectButton } from 'react-native-gesture-handler';
import styled, {css} from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
 
`;

export const ContainerView = styled.View`
   padding: 40px 24px;
`;


export const ProblemItem = styled(RectButton)`
  background: #3e3b47;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
`;

export const  ActionImage = styled.Image`
  width: 50px;
  height: 50px;
`; 

export const ActionInfo = styled.View`
  flex: 1;
  margin-left: 20px;
`;

export const ProblemImage = styled.TouchableOpacity`
  padding: 7px;
`;

export const ActionData  = styled.Text`
  font-size: 18px;
  color: #000;
`;

export const ActionTitle  = styled.Text`
  font-size: 18px;
  color: #ff9000;
  font-weight: bold;
`;


export const ActionStatus  = styled.Text`
  font-size: 18px;

  ${props => props.status === 'Andamento' && css`
    color:#FFCF48;
  `}

  ${props => props.status === 'Finalizado' && css`
    color:#02CC69;
  `}

  ${props => props.status === 'Avaliando' && css`
    color:#FF393A;
  `}

`;
