import styled, {css} from 'styled-components/native';

import {Feather} from '@expo/vector-icons';

export const Container = styled.View`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #232129;
  border-radius: 10px;
  margin-bottom: 8px;
  border-width: 2px;
  border-color: #232129;
  
  flex-direction: row;
  align-items: center;

  ${props => props.isFocused && css`
    border-color:#ff9000;
  `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 16px;
`;

export const Icon = styled(Feather)`
  margin-right: 16px;
`;