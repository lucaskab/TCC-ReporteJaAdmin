import React, {useState, useEffect} from 'react';
import {View, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import { Container, ActionData, ProblemItem, ActionImage, ActionInfo, ActionStatus, ActionTitle} from './styles';
import MapView, {Marker} from 'react-native-maps';

import Modal from 'react-native-modal';

const ProblemInfo = ({route}) => {
const item = route.params;
const [modalOpened, setModalOpened] = useState(false);
const [location, setLocation] = useState(item.posicao.coordinates);

function WrapperComponent() {
  return (
    <View>
      <Modal isVisible={modalOpened}>
        <TouchableOpacity style={{ flex: 1, justifyContent: 'center'}} onPress={() => setModalOpened(false)}>
          <TouchableWithoutFeedback style={{ flex: 0.2}} onPress={() => {}} >
            <MapView 
            style={{width: '100%', height: '50%', zIndex: 99999}}
            initialRegion={{
              latitude: location[1],
              longitude: location[0],
              latitudeDelta: 0.02,
              longitudeDelta: 0.02
            }}
            >
            <Marker 
            coordinate={{
              latitude: location[1],
              longitude: location[0],
              }} 
            />
            </MapView>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}

  return (
    <Container>
      {!modalOpened ? 
        <>
          <ProblemItem key={1} onPress={() => {}}>
            <ActionImage source={require('../../assets/problema.png')} />
            <ActionInfo>
              <ActionTitle>Área:</ActionTitle>
              <ActionData>{item.areaProblema}</ActionData>
            </ActionInfo>
          </ProblemItem>

          <ProblemItem key={2} onPress={() => {}}>
            <ActionImage source={require('../../assets/problema.png')} />
            <ActionInfo>
              <ActionTitle>Tipo:</ActionTitle>
              <ActionData>{item.nomeProblema}</ActionData>
            </ActionInfo>
          </ProblemItem>

          <ProblemItem key={3} onPress={() => {}}>
            <ActionImage source={require('../../assets/descricao.png')} />
            <ActionInfo>
              <ActionTitle>Descrição:</ActionTitle>
              <ActionData>{item.descricaoProblema}</ActionData>
            </ActionInfo>
          </ProblemItem>

          <ProblemItem key={4} onPress={() => {}}>
            <ActionImage source={require('../../assets/opiniao.png')} />
            <ActionInfo>
              <ActionTitle>Sugestão:</ActionTitle>
              <ActionData>{item.sugestao}</ActionData>
            </ActionInfo>
          </ProblemItem>

          <ProblemItem key={5} onPress={() => {}}>
            <ActionImage source={require('../../assets/cidade-inteligente.png')} />
            <ActionInfo>
              <ActionTitle>Cidade:</ActionTitle>
              <ActionData>{item.city}</ActionData>
            </ActionInfo>
          </ProblemItem>

          <ProblemItem key={6} onPress={() => {}}>
            <ActionImage source={require('../../assets/brasil.png')} />
            <ActionInfo>
              <ActionTitle>Estado:</ActionTitle>
              <ActionData>{item.uf}</ActionData>
            </ActionInfo>
          </ProblemItem>

          <ProblemItem key={7} onPress={() => setModalOpened(true)}>
            <ActionImage source={require('../../assets/status.png')} />
            <ActionInfo>
              <ActionTitle>Status:</ActionTitle>
              <ActionStatus status={item.status}>{item.status}</ActionStatus>
            </ActionInfo>
          </ProblemItem>

          <ProblemItem key={8} onPress={() => setModalOpened(true)}>
          <ActionImage source={require('../../assets/map.png')} />
          <ActionInfo>
            <ActionTitle>Ver localização no mapa</ActionTitle>
          </ActionInfo>
          </ProblemItem>

          <ProblemItem style={{opacity: 0}} key={9} onPress={() => setModalOpened(true)}>
          <ActionImage source={require('../../assets/logo.png')} />
          <ActionInfo>
            <ActionData>Ver localização no mapa</ActionData>
          </ActionInfo>
          </ProblemItem>
        </>
      : null }

      <WrapperComponent />

    </Container>
  )
};

export default ProblemInfo;