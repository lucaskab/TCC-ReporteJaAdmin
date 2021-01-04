import React, { useCallback, useState, useRef } from 'react';
import { View, Text, Alert, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import api from '../../services/api';

import isAfter from 'date-fns'

import { Form } from '@unform/mobile';

import Input from '../../components/input';
import Button from '../../components/button';

import {Picker} from '@react-native-picker/picker';


import { useAuth } from '../../hooks/auth';

import { Container, Header, HeaderTitle, UserName, ProfileButton, UserAvatar, FilterOptions, FilterContainer, Option, OptionContent, ActionsListContainer, ActionsListTitle, ActionsItem, ActionImage, ActionInfo, ActionName } from './styles';
import { useEffect } from 'react/cjs/react.development';


const Problems = () => {
  const filters = ['Área','Tipo','Data','Estado', 'Cidade', 'Status'];
  const status = ['Avaliando', 'Andamento', 'Finalizado'];
  const { user } = useAuth();
  const {navigate} = useNavigation();
  const formRef = useRef(null);
  const secondDataInputRef = useRef(null);

  const [problems, setProblems] = useState([]);

  const [allAreas, setAllAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState('');

  const [allTypes, setAllTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');

  const [typeModal, setTypeModal] = useState('');
  const [modalOpened, setModalOpened] = useState(false);

  const [firstData, setFirstData] = useState('');
  const [secondData, setSecondData] = useState('');

  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
     api.post('/findAllAreas').then(response => {
      setAllAreas(response.data);
    });
  },[]);

  async function handleTypes(area) {
    const type = await api.post('/findAllTypes', {area});
    setAllTypes(type.data);
  }

  function handleData(data) {
      setFirstData(data.inicialData);
      setSecondData(data.finalData);
  }

  async function handleSearch() {
    const data = {
      area: selectedArea,
      type: selectedType,
      initialData: firstData,
      endData: secondData,
      status: selectedStatus,
    };
    
    const problems = await api.post('/searchProblemsAdmin',data);
    setProblems(problems.data);
  }

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  },[navigate]);

  const navigateToArea = useCallback(() => {
    navigate('Area');
  },[navigate]);

  const navigateToType = useCallback(() => {
    navigate('Type');
  },[navigate]);

  const navigateToProblems = useCallback(() => {
    navigate('Problems');
  },[navigate]);

  function WrapperComponent({data}) {
    if(typeModal === 'Área'){
      return (
        <View>
          <Modal isVisible={data}>
            <View  style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{backgroundColor: '#ff9000', padding: 30, flexDirection: 'row'}}>
                <View style={{ borderWidth: 4, borderColor: 'black'}}> 
                  <Picker
                    selectedValue={selectedArea}
                    style={{height: 50, width: 280,}}
                    onValueChange={value => {
                      setSelectedArea(value);
                      setModalOpened(false);
                      handleTypes(value);
                    } }>
                    <Picker.Item key={-1} label={'Selecione uma opção'} value={''} />  
                    {allAreas.map(item => {
                    return (<Picker.Item key={item._id} label={item.name} value={item.name} />)
                  })} 
                  </Picker>
                </View> 
                <TouchableOpacity style={{height: 38, position: 'relative', bottom: 28, right: -25, borderRadius: 14}} onPress={() => setModalOpened(false)}>
                    <Image style={{width: 38, height: 38,marginBottom: 80}} source={require('../../../assets/remove.png')} />
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      )
    } else if (typeModal === 'Tipo') {
      return (
        <View>
          <Modal isVisible={data}>
            <View  style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{backgroundColor: '#ff9000', padding: 30, flexDirection: 'row'}}>
                <View style={{ borderWidth: 4, borderColor: 'black'}}> 
                  <Picker
                    selectedValue={selectedType}
                    style={{height: 50, width: 280,}}
                    onValueChange={value => {
                      setSelectedType(value);
                      setModalOpened(false);
                    } }>
                    <Picker.Item key={-1} label={'Selecione uma opção'} value={''} />  
                    {allTypes.map(item => {
                    return (<Picker.Item key={item._id} label={item.name} value={item.name} />)
                  })} 
                  </Picker>
                </View>
                <TouchableOpacity style={{height: 38, position: 'relative', bottom: 28, right: -25, borderRadius: 14}} onPress={() => setModalOpened(false)}>
                    <Image style={{width: 38, height: 38,marginBottom: 80}} source={require('../../../assets/remove.png')} />
                </TouchableOpacity> 
              </View>
            </View>
          </Modal>
        </View>
      )
    } else if (typeModal === 'Data') {
      return (
        <View>
          <Modal isVisible={data}>
            <View  style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{backgroundColor: '#ff9000', padding: 30, flexDirection: 'row'}}>
                  <Form ref={formRef} onSubmit={handleData}>
                    <>
                      <Input 
                      autoCorrect={false} 
                      autoCapitalize="none" 
                      keyboardType="email-address" 
                      name="inicialData" icon="mail" 
                      placeholder="ex: 00/00/0000"
                      returnKeyType="next"
                      onSubmitEditing={() => {
                        secondDataInputRef.current?.focus();
                      }}
                      />
                      <Input
                      ref={secondDataInputRef} 
                      name="finalData" 
                      icon="lock" 
                      placeholder="ex: 00/00/0000" 
                      returnKeyType="send"
                      onSubmitEditing={() => {
                        formRef.current?.submitForm();
                        setModalOpened(false);
                      }}
                      />
                  
                      <Button onPress={() => {
                        formRef.current?.submitForm();
                        setModalOpened(false);
                      }}>Confirmar</Button>
                    </>
                  </Form>
                </View>
                <TouchableOpacity style={{height: 38, position: 'relative', top: -280, right: -160, borderRadius: 14}} onPress={() => setModalOpened(false)}>
                    <Image style={{width: 38, height: 38,marginBottom: 80}} source={require('../../../assets/remove.png')} />
                </TouchableOpacity> 
            </View>
          </Modal>
        </View>
      )
    } else if (typeModal === 'Status') {
      return (
        <View>
          <Modal isVisible={data}>
            <View  style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{backgroundColor: '#ff9000', padding: 30, flexDirection: 'row'}}>
                <View style={{ borderWidth: 4, borderColor: 'black'}}> 
                  <Picker
                    selectedValue={selectedStatus}
                    style={{height: 50, width: 280,}}
                    onValueChange={value => {
                      setSelectedStatus(value);
                    } }>
                    <Picker.Item key={-1} label={'Selecione uma opção'} value={''} />  
                    {status.map((item, index) => {
                    return (<Picker.Item key={index} label={item} value={item} />)
                  })} 
                  </Picker>
                </View>
                <TouchableOpacity style={{height: 38, position: 'relative', bottom: 28, right: -25, borderRadius: 14}} onPress={() => setModalOpened(false)}>
                    <Image style={{width: 38, height: 38,marginBottom: 80}} source={require('../../../assets/remove.png')} />
                </TouchableOpacity> 
              </View>
            </View>
          </Modal>
        </View>
      )
    }
    else {
      return (
        <View>
          <Modal isVisible={false}>
            <View  style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            </View>
          </Modal>
        </View>
      )
    }
    
  }

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

      <ActionsListTitle>Filtros de buscas</ActionsListTitle>

      <FilterContainer>
        <FilterOptions horizontal={true} showsVerticalScrollIndicator={false} >
          { filters.map((item) => {
            return (<Option onPress={() => {
              if(item === 'Área') {
                setModalOpened(true);
                setTypeModal('Área');
              } else if (item === 'Tipo') {
                handleTypes(selectedArea);
                setModalOpened(true);
                setTypeModal('Tipo');
              }
              else if (item === 'Data') {
                setModalOpened(true);
                setTypeModal('Data');
              }
              else if (item === 'Status') {
                setModalOpened(true);
                setTypeModal('Status');
              }
            }}><OptionContent>{item}</OptionContent></Option>)
          })}
        </FilterOptions>
      </FilterContainer>
      
      <WrapperComponent data={modalOpened}/> 
      <ActionsListContainer>
      
        <ActionsItem onPress={handleSearch}>
          <ActionImage source={require('../../../assets/magnifier.png')} />
          <ActionInfo>
            <ActionName>Buscar</ActionName>
          </ActionInfo>
        </ActionsItem>

        {problems.map((item) => {
          return (
            <ActionsItem onPress={handleSearch}>
              <ActionImage source={require('../../assets/logo.png')} />
              <ActionInfo>
                <ActionName>{item.areaProblema}</ActionName>
                <ActionName>{item.nomeProblema}</ActionName>
                <ActionName>{item.status}</ActionName>
              </ActionInfo>
            </ActionsItem>
          )
        })}

      </ActionsListContainer>
    </Container>
  );
};

export default Problems;