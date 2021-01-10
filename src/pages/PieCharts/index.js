import React, {useState, useEffect} from 'react';
import {Dimensions,ScrollView} from 'react-native';
import {PieChart} from "react-native-chart-kit";
import api from '../../services/api';
import Button from '../../components/button';

import { Container, ContainerView, ActionsListTitle, ChartView} from './styles';

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
      <ContainerView>
        <ActionsListTitle>Porcentagem de problemas por área</ActionsListTitle>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ maxHeight: 220}}>
            <ChartView>
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
            </ChartView>
          </ScrollView>
          <Button style={{marginLeft: 30}} onPress={handleFilterChartData}>
            Atualizar
          </Button>

          <ActionsListTitle>Porcentagem de problemas por status atual</ActionsListTitle>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginHorizontal: 10, marginVertical: 10, maxHeight: 220}}>
          <ChartView>
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
          </ChartView>
          </ScrollView>
          <Button style={{marginLeft: 30}} onPress={handleFilterChartStatus}>
            Atualizar
          </Button>
        </ContainerView>
</Container>
  )
}

export default PieCharts;