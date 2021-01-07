import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Area from '../pages/Area';
import Type from '../pages/Type';
import Problems from '../pages/Problems';
import ProblemInfo from '../pages/ProblemInfo';
import Charts from '../pages/Charts';
import PieCharts from '../pages/PieCharts';

const App = createStackNavigator();

const AppRoutes = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <App.Screen name="Dashboard" component={Dashboard} />
    <App.Screen name="Profile" component={Profile} />
    <App.Screen name="Area" component={Area} />
    <App.Screen name="Type" component={Type} />
    <App.Screen name="Problems" component={Problems} />
    <App.Screen name="ProblemInfo" component={ProblemInfo} />
    <App.Screen name="Charts" component={Charts} />
    <App.Screen name="PieCharts" component={PieCharts} />
    
  </App.Navigator>
);

export default AppRoutes;