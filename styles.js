'use strict';

import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  BackgroundImage: {
    width: '100%',
    height: '100%',
  },

  SorterStation: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  SorterFrame: {
    width: 80,
    backgroundColor: '#C0C0C0',
    height: '80%',
    borderWidth: 4,
    borderColor: '#A9A9A9',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  ConveyorBelt: {
    backgroundColor: '#404040',
    width: '80%',
    height: '100%',
  },

  CupReceiverFrame: {
    position: 'absolute',
    width: 80,
    height: 35,
    bottom: 0,
    backgroundColor: '#C0C0C0',
    borderWidth: 4,
    borderColor: '#A9A9A9',
    alignItems: 'center',
  },
  CupReceiverFrameCenter: {
    width: 30,
    height: 25,
    top: -4,
    backgroundColor: '#404040',
    borderWidth: 4,
    borderTopWidth: 0,
    borderColor: '#A9A9A9',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },

  ColorSensorFrame: {
    position: 'absolute',
    width: 72,
    height: 15,
    bottom: '25%',
    backgroundColor: '#808080',
    alignItems: 'center',
  },
  ColorSensorFrameCenter: {
    width: 40,
    height: 25,
    backgroundColor: '#808080',
  },

  BlackCupFrame: {
    position: 'absolute',
    bottom: '80%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  WhiteCupFrame: {
    position: 'absolute',
    bottom: '55%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  MetalCupFrame: {
    position: 'absolute',
    bottom: '30%',
    flexDirection: 'row',
    alignItems: 'center',
  },

  CupStoreText: {
    textAlign: 'center',
    left: -46,
    fontWeight: 'bold',
    fontSize: 16,
  },
  CupStoreView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  CupStoreTotalText: {
    left: -64,
    textAlign: 'right',
    width: 26,
    fontWeight: 'bold',
    fontSize: 16,
  },
  CupStore: {
    width: 100,
    height: 30,
    left: -59,
    backgroundColor: '#C0C0C0',
    borderWidth: 4,
    borderColor: '#A9A9A9',
    borderRightWidth: 0,
    justifyContent: 'center',
  },
  CupCylinderPiston: {
    width: 40,
    height: 5,
    bottom: -10,
    backgroundColor: '#D3D3D3',
    justifyContent: 'center',
  },
  CupCylinderPistonFront: {
    width: 10,
    height: 10,
    left: -10,
    backgroundColor: '#FFFFFF',
  },
  CupPistonCase: {
    width: 40,
    height: 15,
    right: 27,
    bottom: -10,
    backgroundColor: '#808080',
  },

  TotalText: {
    marginTop: 6,
    fontWeight: 'bold',
    fontSize: 16,
  },

  Cup: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#328da8',
    position: 'absolute',
  },

  CommandInterface: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CommandCase: {
    flexDirection: 'row',
    backgroundColor: '#A9A9A9',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#808080',
    width: 300,
    height: 100,
  },
  Command: {
    alignItems: 'center',
  },
  CommandHL: {
    flex: 3,
    flexDirection: 'row',
    margin: 4,
  },
  CommandHL1: {
    borderColor: '#FF8300',
    borderWidth: 2,
    borderRadius: 15,
    height: 30,
    width: 30,
    overflow: 'hidden',
    margin: 4,
  },
  CommandHL2: {
    borderColor: '#0E7A0D',
    borderWidth: 2,
    borderRadius: 15,
    height: 30,
    width: 30,
    overflow: 'hidden',
    margin: 4,
  },
  CommandHL3: {
    borderColor: '#AA0000',
    borderWidth: 2,
    borderRadius: 15,
    height: 30,
    width: 30,
    overflow: 'hidden',
    margin: 4,
  },
  CommandSB: {
    flex: 2,
    flexDirection: 'row',
    margin: 4,
  },
  CommandSB1: {
    borderColor: '#000000',
    backgroundColor: '#7EC850',
    borderWidth: 2,
    borderRadius: 15,
    height: 26,
    width: 26,
    margin: 4,
  },
  CommandSB2: {
    borderColor: '#000000',
    backgroundColor: '#FF0000',
    borderWidth: 2,
    borderRadius: 15,
    height: 26,
    width: 26,
    margin: 4,
  },
  CommandSA: {
    flex: 1,
    flexDirection: 'row',
    margin: 4,
  },
  CommandSA1: {
    backgroundColor: '#000000',
    borderRadius: 15,
    height: 26,
    width: 26,
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  CommandSA1Line: {
    width: 2,
    height: 8,
    top: -6,
    backgroundColor: '#FFFFFF',
  },
  CommandQS: {
    flex: 1,
    flexDirection: 'row',
    margin: 4,
  },
  CommandQS1: {
    backgroundColor: '#000000',
    borderRadius: 17,
    height: 34,
    width: 34,
    margin: 4,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  CommandQS1Image: {
    borderRadius: 17,
  },
});

module.exports = styles;
