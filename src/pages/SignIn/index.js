import React, {useCallback, useRef} from 'react';
import { Image, View, KeyboardAvoidingView, Platform, ScrollView,TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import {Feather} from '@expo/vector-icons';

import Input from '../../components/input';
import Button from '../../components/button';

import { useAuth } from '../../hooks/auth';

import { Container, Title, ForgotPassword, ForgotPasswordText,
  CreateAccountButton, CreateAccountButtonText } from './styles';

import logoImg from '../../assets/logo.png';

const SignIn = () => {
  const formRef = useRef(null);
  const passwordInputRef = useRef(null);
  const navigation = useNavigation();

  const { signIn } = useAuth();

  const handleSignIn = useCallback(async (data) => {
    await signIn({
      email: data.email,
      password: data.password,
    });
  }, [signIn])
  return (
    <>

      <KeyboardAvoidingView 
      style={{ flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
      >
        <ScrollView
          contentContainerStyle={{ flex: 1}}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <Image source={logoImg} />

            <View>
              <Title>Faça seu login</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignIn}>
              <>
              <Input 
              autoCorrect={false} 
              autoCapitalize="none" 
              keyboardType="email-address" 
              name="email" icon="mail" 
              placeholder="E-mail"
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordInputRef.current?.focus();
              }}
              />
              <Input
              ref={passwordInputRef} 
              secureTextEntry 
              name="password" 
              icon="lock" 
              placeholder="Senha" 
              returnKeyType="send"
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
              />
            
              <Button onPress={() => {
                formRef.current?.submitForm();
              }}>Entrar</Button>
              </>
            </Form>

            <ForgotPassword onPress={() => {}}>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>

      </KeyboardAvoidingView>

      <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
        <Feather name="log-in" size={20} color="#ff9000" />
        <CreateAccountButtonText>Criar conta</CreateAccountButtonText>
      </CreateAccountButton>

    </>
  );
}

export default SignIn;