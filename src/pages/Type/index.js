import React, {useCallback, useRef, useEffect, useState} from 'react';
import { Alert, ScrollView, View } from 'react-native';
import {Picker} from '@react-native-picker/picker';


import { Form } from '@unform/mobile';
import api from '../../services/api'


import Input from '../../components/input';
import Button from '../../components/button';

import { Container, Title } from './styles';


const Type = () => {
  const formRef = useRef(null);
  const attFormRef = useRef(null);
  const deleteFormRef = useRef(null);
  const newnameInputRef = useRef(null);
  const [areas, setAreas] = useState([]);
  const [types, setTypes] = useState([]);
  const [addTypeArea, setAddTypeArea] = useState('');
  const [attTypeArea, setAttTypeArea] = useState('');
  const [attTypeNameArea, setAttTypeNameArea] = useState('');
  const [removeTypeArea, setRemoveTypeArea] = useState('');
  const [removeTypeNameArea, setRemoveTypeNameArea] = useState('');

  useEffect(() => {
    api.post('/findAllAreas').then(response => {
      setAreas(response.data);
    })
  },[]);

  async function handleTypes(area) {
    const type = await api.post('/findAllTypes', {area});
    setTypes(type.data);
  }

  async function handleAddType(data) {
    data.area = addTypeArea;
    await api.post('/addType',data);
        Alert.alert('Cadastro realizado com sucesso!', 'Novo tipo de problema cadastrado');
  };

  async function handleAttType(data) {
    data.name = attTypeNameArea;
    data.area = attTypeArea;
    const response= await api.post('/attType',data);
      Alert.alert('Sucesso!', 'Nome do tipo atualizado');
      setAttTypeNameArea('disabled'); 
      handleTypes(data.area); 
  };

  async function handleDeleteType() {
    const data = {name: removeTypeNameArea, area: removeTypeArea}
    await api.post('/deleteType',data);
      Alert.alert('Exclusão realizada com sucesso!', 'Tipo excluído!!');
      setRemoveTypeNameArea('disabled'); 
      handleTypes(data.area); 
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
       <Form ref={formRef} onSubmit={handleAddType}>
          <>
            <Title>Cadastrar Tipo</Title>
            <View style={{borderWidth: 2, borderColor: 'black', marginBottom: 20, borderRadius: 10}}>
            <Picker
              selectedValue={addTypeArea}
              style={{height: 50, width: '100%'}}
              onValueChange={value => setAddTypeArea(value) }>
              <Picker.Item key={-1} label={'Selecione uma área'} value={''} />
              {areas.map(item => {
              return (<Picker.Item key={item._id} label={item.name} value={item.name} />)
            })} 
            </Picker>
            </View>
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

            <Form ref={attFormRef} onSubmit={handleAttType}>
              <>
              <Title>Atualizar Tipo</Title>
              <View style={{borderWidth: 2, borderColor: 'black', marginBottom: 20, borderRadius: 10}}>
              <Picker
                selectedValue={attTypeArea}
                style={{height: 50, width: '100%'}}
                onValueChange={(value) => {
                  setAttTypeArea(value); 
                  handleTypes(value);
                }}
                >
                <Picker.Item key={-1} label={'Selecione uma área'} value={''} />
                {areas.map(item => {
                return (<Picker.Item key={item._id} label={item.name} value={item.name} />)
                })} 
              </Picker>
              </View>

              { areas && types ? (
                <View style={{borderWidth: 2, borderColor: 'black', marginBottom: 20, borderRadius: 10}}>
                  <Picker
                    selectedValue={attTypeNameArea}
                    style={{height: 50, width: '100%'}}
                    onValueChange={value => setAttTypeNameArea(value)}
                    >
                    <Picker.Item key={-1} label={'Selecione um tipo'} value={''} /> 
                    {types.map((item,index) => {
                    return (<Picker.Item key={item._id} label={item.name} value={item.name} />)
                    })} 
                  </Picker>
                </View>  
              ) : null }

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

            <Form ref={deleteFormRef} onSubmit={handleDeleteType}>
              <>
              <Title>Deletar Tipo</Title>
              <View style={{borderWidth: 2, borderColor: 'black', marginBottom: 20, borderRadius: 10}}>
                <Picker
                  selectedValue={removeTypeArea}
                  style={{height: 50, width: '100%'}}
                  onValueChange={value => {setRemoveTypeArea(value); handleTypes(value)}
                  }>
                  <Picker.Item key={-1} label={'Selecione uma área'} value={'disabled'} />   
                  {areas.map(item => {
                  return (<Picker.Item key={item._id} label={item.name} value={item.name} />)
                  })} 
                </Picker>
              </View>  
              { areas && types ? (
                <View style={{borderWidth: 2, borderColor: 'black', marginBottom: 20, borderRadius: 10}}> 
                  <Picker
                    selectedValue={removeTypeNameArea}
                    style={{height: 50, width: '100%'}}
                    onValueChange={value => setRemoveTypeNameArea(value)}
                    >
                    <Picker.Item key={-1} label={'Selecione um tipo'} value={'disabled'} /> 
                    {types.map((item,index) => {
                    return (<Picker.Item key={item._id} label={item.name} value={item.name} />)
                    })} 
                  </Picker>
                </View> 
              ) : null }
              
              <Button onPress={() => {
                  deleteFormRef.current?.submitForm();
                }}>Deletar</Button>
              </>
            </Form>
      </ScrollView>
    </Container>
  );
};

export default Type;