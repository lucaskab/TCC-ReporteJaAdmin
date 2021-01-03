import React, {useCallback, useRef} from 'react';
import { Alert, ScrollView } from 'react-native';

import { Form } from '@unform/mobile';
import api from '../../services/api'


import Input from '../../components/input';
import Button from '../../components/button';

import { Container, Title } from './styles';

const Area = () => {
  const formRef = useRef(null);
  const attFormRef = useRef(null);
  const deleteFormRef = useRef(null);
  const newnameInputRef = useRef(null);

  const handleAddArea = useCallback(async (data) => {
    await api.post('/addArea',data);
        Alert.alert('Cadastro realizado com sucesso!', 'Nova área de problemas cadastrada');
  }, []);

  const handleAttArea = useCallback(async (data) => {
    await api.post('/attArea',data);
      Alert.alert('Sucesso!', 'Nome da área atualizado');
  }, []);

  const handleDeleteArea = useCallback(async (data) => {
    await api.post('/deleteArea',data);
        Alert.alert('Exclusão realizada com sucesso!', 'Área excluída!!');
  }, []);

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
       <Form ref={formRef} onSubmit={handleAddArea}>
          <>
            <Title>Cadastrar Área</Title>
            <Input 
              autoCorrect={false} 
              autoCapitalize="none" 
              keyboardType="default" 
              name="name" icon="mail" 
              placeholder="Nome"
              returnKeyType="send"
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />
            
            <Button onPress={() => {
                formRef.current?.submitForm();
              }}>Cadastrar</Button>
            </>
        </Form>

            <Form ref={attFormRef} onSubmit={handleAttArea}>
              <>
              <Title>Atualizar Área</Title>
              <Input 
              autoCorrect={false} 
              autoCapitalize="none" 
              keyboardType="default" 
              name="name" icon="mail" 
              placeholder="Nome"
              returnKeyType="send"
              onSubmitEditing={() => {
                newnameInputRef.current?.focus()
              }}
              />

              <Input 
              autoCorrect={false} 
              autoCapitalize="none" 
              keyboardType="default" 
              name="newname" icon="mail" 
              placeholder="Novo nome"
              returnKeyType="send"
              onSubmitEditing={() => {
                attFormRef.current?.submitForm();
              }}
              />      
            
              <Button onPress={() => {
                attFormRef.current?.submitForm();
              }}>Atualizar</Button>
              </>
            </Form>

            <Form ref={deleteFormRef} onSubmit={handleDeleteArea}>
              <>
              <Title>Deletar Área</Title>
              <Input 
                autoCorrect={false} 
                autoCapitalize="none" 
                keyboardType="default" 
                name="name" icon="mail" 
                placeholder="Nome"
                returnKeyType="send"
                onSubmitEditing={() => {
                  deleteFormRef.current?.submitForm();
                }}
              />
              
              <Button onPress={() => {
                  deleteFormRef.current?.submitForm();
                }}>Deletar</Button>
              </>
            </Form>
      </ScrollView>
    </Container>
  );
};

export default Area;