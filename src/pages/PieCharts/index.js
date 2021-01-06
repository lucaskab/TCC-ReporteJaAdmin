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
  const [filterChartData, setFilterChartData] = useState([]);
  const [filterChartStatus, setFilterChartStatus] = useState([]);

  useEffect(() => {
   handleFilterChartData();
   handleFilterChartStatus();
 },[]);

 useEffect(() => {
  handleFilterChartStatus();
},[]);

 async function handleFilterChartData() {
  const areas = await api.get('/searchPieChartData');
  setFilterChartData(areas.data);
}

async function handleFilterChartStatus() {
  const status = await api.get('/searchPieChartStatus')
  setFilterChartStatus(status.data);
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
          Atualizar
        </Button>

        <ActionsListTitle>Filtros de buscas</ActionsListTitle>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginHorizontal: 10, marginVertical: 10, maxHeight: 220}}>
          <PieChart
            data={filterChartStatus}
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
        <Button onPress={handleFilterChartStatus}>
          Atualizar
        </Button>
        
</Container>
  )
}

export default PieCharts;