import React, {useRef} from 'react';
import { Image, View, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Form} from '@unform/mobile';
import api from '../../services/api'

import {Feather} from '@expo/vector-icons';
import { useAuth } from '../../hooks/auth';
import Input from '../../components/input';
import Button from '../../components/button';

import AsyncStorage from '@react-native-community/async-storage';

import { Container, Title, BackButton, BackButtonText } from './styles';

import logoImg from '../../assets/logo.png';
import { useCallback } from 'react/cjs/react.development';

const Profile = () => {
  const formRef = useRef(null);
  const navigation = useNavigation();
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const { user, updateUser } = useAuth();

  const handleUpdate = useCallback(async (data) => {
    try {
      if(data.password === data.confirmPassword) {
        const {confirmPassword, ...rest} = data;
        rest.id = user._id;
        const updatedUser =  await api.post('/updateAdmin',rest);
        await updateUser(updatedUser.data);
        Alert.alert('Atualização realizada com sucesso!', 'Seus dados já estão atualizados');
        navigation.navigate('Dashboard');
      }
    } catch (err) {
      Alert.alert('Erro na atualização', 'Ocorreu um erro inesperado, tente novamente!')
    }
    
  }, [navigation])

  return (
    <>

      <KeyboardAvoidingView 
      style={{ flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
      >
        <ScrollView
          
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <Image style={{marginTop: 40}} source={logoImg} />

            <View>
              <Title>Atualize seus dados</Title>
            </View>
            <Form ref={formRef} onSubmit={handleUpdate}>
              <Input 
              onSubmitEditing={() => {
                emailInputRef.current?.focus()
              }} 
              returnKeyType="next" 
              autoCapitalize="words" 
              name="name" icon="user" 
              placeholder="Nome"
              />

              <Input onSubmitEditing={() => {
                emailInputRef.current?.focus()
              }} returnKeyType="next" autoCapitalize="words" name="birthdate" icon="user" placeholder="Data de Nascimento"/>

              <Input onSubmitEditing={() => {
                emailInputRef.current?.focus()
              }} returnKeyType="next" autoCapitalize="words" name="address" icon="user" placeholder="Endereço Completo"/>

              <Input onSubmitEditing={() => {
                emailInputRef.current?.focus()
              }} returnKeyType="next" autoCapitalize="words" name="city" icon="user" placeholder="Cidade"/>

              <Input onSubmitEditing={() => {
                emailInputRef.current?.focus()
              }} returnKeyType="next" autoCapitalize="words" name="uf" icon="user" placeholder="UF"/>

              <Input onSubmitEditing={() => {
                emailInputRef.current?.focus()
              }} returnKeyType="next" autoCapitalize="words" name="cellphone" icon="user" placeholder="Celular"/>

              <Input onSubmitEditing={() => {
                passwordInputRef.current?.focus()
              }} ref={emailInputRef} returnKeyType="next" keyboardType="email-address" autoCorrect={false} autoCapitalize="none" name="email" icon="mail" placeholder="E-mail"/>

              <Input ref={passwordInputRef} onSubmitEditing={() => {}} returnKeyType="send" secureTextEntry name="password" icon="lock" placeholder="Senha" textContentType="newPassword" />
              <Input ref={passwordInputRef} onSubmitEditing={() => formRef.current.submitForm()} returnKeyType="send" secureTextEntry name="confirmPassword" icon="lock" placeholder="Confirmar Senha" textContentType="newPassword" />

              <Button onPress={() => formRef.current.submitForm() }>Atualizar</Button>
            </Form>
          </Container>
        </ScrollView>

      </KeyboardAvoidingView>
    </>
  );
}

export default Profile;