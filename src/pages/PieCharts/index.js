import React, {useRef, useState, useCallback, useEffect} from 'react';
import { View, Text, Dimensions, TouchableOpacity, Image, ScrollView, Alert} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import Modal from 'react-native-modal';
import api from '../../services/api';
import {Picker} from '@react-native-picker/picker';
import { useAuth } from '../../hooks/auth';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';

import {getMonth} from 'date-fns';

import Button from '../../components/button';
import Input from '../../components/input';

import { Container, ParametersContainer, ParametersInfo, FilterOptions, FilterContainer, Option, OptionContent, ActionsListContainer, ActionsListTitle, ActionsItem, ActionImage, ActionInfo, ActionName } from './styles';


const PieCharts = () => {
  const filters = ['Área','Tipo','Data','Estado', 'Cidade', 'Status'];
  const status = ['Avaliando', 'Andamento', 'Finalizado'];
  const { user } = useAuth();
  const {navigate} = useNavigation();
  const formRef = useRef(null);

  const [problems, setProblems] = useState([]);

  const [allAreas, setAllAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState('');

  const [allTypes, setAllTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');

  const [typeModal, setTypeModal] = useState('');
  const [modalOpened, setModalOpened] = useState(false);

  const [firstData, setFirstData] = useState('');
  const [secondData, setSecondData] = useState('');
  const [filterChartData, setFilterChartData] = useState([]);
  const [filterChartQuantity, setFilterChartQuantity] = useState([]);

  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    api.post('/findAllAreas').then(response => {
     setAllAreas(response.data);
   });
   handleFilterChartData();
 },[]);

 async function handleFilterChartData() {
  const areas = await api.get('/searchPieChartData');
  setFilterChartData(areas.data);
}

 async function handleTypes(area) {
   const type = await api.post('/findAllTypes', {area});
   setAllTypes(type.data);
 }

 function handleData(data) {
     setFirstData(data.inicialData);
     setSecondData(data.finalData);
 }

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
                      placeholder="ex: 2020"
                      returnKeyType="next"
                      />
                      <Input 
                      autoCorrect={false} 
                      autoCapitalize="none" 
                      keyboardType="email-address" 
                      name="finalData" icon="mail" 
                      placeholder="ex: 2020"
                      returnKeyType="next"
                      onSubmitEditing={() => {
                        formRef.current?.submitForm();
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
      <ActionsListTitle>Filtros de buscas</ActionsListTitle>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginHorizontal: 10, marginVertical: 10, maxHeight: 220}}>
          <PieChart
            data={filterChartData}
            width={Dimensions.get("window").width} // from react-native
            height={220}
            accessor={"qtd"}
            chartConfig={{
              backgroundColor: "#ff9000",
              backgroundGradientFrom: "black",
              backgroundGradientTo: "black",
              fillShadowGradient: '#ff9000', // bar color
              fillShadowGradientOpacity: 1, // bar color opacity
              decimalPlaces: 2, // optional, defaults to 2dp
              color: () => '#ff9000', // tracejado
              labelColor: () => '#ff9000', // label
            }}
            
          />
        </ScrollView>
        <Button onPress={handleFilterChartData}>
          Buscar dados
        </Button>
</Container>
  )
}

export default PieCharts;