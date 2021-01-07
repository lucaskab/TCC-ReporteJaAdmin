import React, { useCallback, useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import api from '../../services/api';
import axios from 'axios';

import { Form } from '@unform/mobile';

import Input from '../../components/input';
import Button from '../../components/button';

import {Picker} from '@react-native-picker/picker';


import { useAuth } from '../../hooks/auth';

import { Container, Header, HeaderTitle, UserName, ParametersContainer, ParametersInfo, ProfileButton, ActionData, UserAvatar, FilterOptions, FilterContainer, Option, OptionContent, ActionsListContainer, ActionsListTitle, ActionsItem, ActionImage, ActionInfo, ActionName } from './styles';



const Problems = () => {
  const filters = ['Área','Tipo','Data','Estado', 'Cidade', 'Status'];
  const status = ['Avaliando', 'Andamento', 'Finalizado'];
  const { user } = useAuth();
  const navigation = useNavigation();
  const formRef = useRef(null);
  const secondDataInputRef = useRef(null);

  const [problems, setProblems] = useState([]);

  const [allAreas, setAllAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState('');

  const [allTypes, setAllTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');

  const [allStates, setAllStates] = useState([]);
  const [allUF, setAllUF] = useState([]);
  const [selectedUF, setSelectedUF] = useState('');

  const [allCity, setAllCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

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

  useEffect(() => {
    var stateArray = [];
    var UFArray = [];
     axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome').then(response => {
      response.data.map(problem => {
        stateArray.push(problem.nome);
        UFArray.push(problem.sigla);
      });
     setAllUF(UFArray);
     setAllStates(stateArray);
   });
 },[]);

  async function handleTypes(area) {
    const type = await api.post('/findAllTypes', {area});
    setAllTypes(type.data);
  }

  async function handleCities(state, index) {
    var citiesArray = [];
    await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${allUF[index-1]}/municipios?orderBy=nome`).then(response => {
      response.data.map(city => {
        citiesArray.push(city.nome);
      });
     setAllCity(citiesArray);
    })
  }

  function handleData(data) {
      setFirstData(data.inicialData);
      setSecondData(data.finalData);
  }

  async function handleSearch() {
    const data = {
      area: selectedArea,
      type: selectedType,
      uf: selectedUF,
      city: selectedCity,
      initialData: firstData,
      endData: secondData,
      status: selectedStatus,
    };
    
    const problems = await api.post('/searchProblemsAdmin',data);
    setProblems(problems.data);
  }

  const navigateToProfile = useCallback(() => {
    navigation.navigate('Profile');
  },[navigation]);

  function navigateToProblemInfo(item) {
    navigation.navigate('ProblemInfo',item);
  };

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

    else if (typeModal === 'Estado') {
      return (
        <View>
          <Modal isVisible={data}>
            <View  style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{backgroundColor: '#ff9000', padding: 30, flexDirection: 'row'}}>
                <View style={{ borderWidth: 4, borderColor: 'black'}}> 
                  <Picker
                    selectedValue={selectedUF}
                    style={{height: 50, width: 280,}}
                    onValueChange={(value, index) => {
                      setSelectedUF(value);
                      handleCities(value, index);
                    } }>
                    <Picker.Item key={-1} label={'Selecione uma opção'} value={''} />  
                    {allStates.map((item, index) => {
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

    else if (typeModal === 'Cidade') {
      return (
        <View>
          <Modal isVisible={data}>
            <View  style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{backgroundColor: '#ff9000', padding: 30, flexDirection: 'row'}}>
                <View style={{ borderWidth: 4, borderColor: 'black'}}> 
                  <Picker
                    selectedValue={selectedCity}
                    style={{height: 50, width: 280,}}
                    onValueChange={value => {
                      setSelectedCity(value);
                    } }>
                    <Picker.Item key={-1} label={'Selecione uma opção'} value={''} />  
                    {allCity.map((item, index) => {
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
          { filters.map((item, index) => {
            return (<Option key={index} onPress={() => {
              if(item === 'Área') {
                setTypeModal('Área');
              } else if (item === 'Tipo') {
                handleTypes(selectedArea);
                setTypeModal('Tipo');
              }
              else if (item === 'Data') {
                setTypeModal('Data');
              }
              else if (item === 'Status') {
                setTypeModal('Status');
              }
              else if (item === 'Estado') {
                setTypeModal('Estado');
              }
              else if (item === 'Cidade') {
                setTypeModal('Cidade');
              }

              setModalOpened(true);
            }}><OptionContent>{item}</OptionContent></Option>)
          })}
        </FilterOptions>
      </FilterContainer>

      <ParametersContainer>
        {selectedArea ? <ParametersInfo>Área: {selectedArea}</ParametersInfo> : null }
        {selectedType ? <ParametersInfo>Tipo: {selectedType}</ParametersInfo> : null }
        {firstData ? <ParametersInfo>Data: {firstData} {secondData ? `e ${secondData}` : null }</ParametersInfo> : null }
        {selectedUF ? <ParametersInfo>Estado: {selectedUF}</ParametersInfo> : null }
        {selectedCity ? <ParametersInfo>Cidade: {selectedCity}</ParametersInfo> : null }
        {selectedStatus ? <ParametersInfo>Status: {selectedStatus}</ParametersInfo> : null }
      </ParametersContainer>
      
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
            <ActionsItem key={item._id} onPress={() => navigateToProblemInfo(item)}>
              <ActionImage source={require('../../assets/logo.png')} />
              <ActionInfo>
                <ActionData>{item.areaProblema}</ActionData>
                <ActionData>{item.nomeProblema}</ActionData>
                <ActionData>{item.status}</ActionData>
              </ActionInfo>
            </ActionsItem>
          )
        })}

      </ActionsListContainer>
    </Container>
  );
};

export default Problems;