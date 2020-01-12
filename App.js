/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

'use strict';

import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StatusBar,
  PermissionsAndroid,
  ToastAndroid,
} from 'react-native';

import RadialGradient from 'react-native-radial-gradient';
import * as FileSystem from 'react-native-fs';

import styles from './styles';

const EXTERNAL_STORAGE_PATH =
  FileSystem.ExternalStorageDirectoryPath + '/LuBanCupSorter';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hl1On: false,
      hl2On: false,
      hl3On: false,

      sb1Pressed: false,
      sb2Pressed: false,

      saPressed: false,

      qsPressed: false,
    };
  }

  async loadDataFile() {
    try {
      let permissionRequest = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);

      if (
        permissionRequest[
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        ] !== PermissionsAndroid.RESULTS.GRANTED ||
        permissionRequest[
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        ] !== PermissionsAndroid.RESULTS.GRANTED
      ) {
        ToastAndroid.show(
          'No permission to load data file!',
          ToastAndroid.LONG,
        );
        return;
      }
    } catch (err) {
      console.warn(err);
      ToastAndroid.show('Something went wrong!', ToastAndroid.LONG);
      return;
    }

    try {
      await FileSystem.mkdir(EXTERNAL_STORAGE_PATH);

      if (!(await FileSystem.exists(EXTERNAL_STORAGE_PATH + '/data.csv'))) {
        ToastAndroid.show('Could not find data file!', ToastAndroid.LONG);
        return;
      }

      var data = await FileSystem.readFile(
        EXTERNAL_STORAGE_PATH + '/data.csv',
        'utf8',
      );

      var dataPhrases = data.split(/\r\n|\r|\n/);

      console.log(dataPhrases);
    } catch (err) {
      console.warn(err);
      ToastAndroid.show('Something went wrong!', ToastAndroid.LONG);
      return;
    }
  }

  componentDidMount() {
    this.loadDataFile();
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />

        <View style={styles.SorterStation}>
          <View style={styles.SorterFrame}>
            <View style={styles.ConveyorBelt}>
              {/*<View style={styles.ConveyorBeltAnimation} />*/}
            </View>
            <View style={styles.CupReceiverFrame}>
              <View style={styles.CupReceiverFrameCenter} />
            </View>
            <View style={styles.ColorSensorFrame}>
              <View style={styles.ColorSensorFrameCenter} />
            </View>

            <View style={styles.BlackCupFrame}>
              <View style={styles.CupStore} />
              <View style={styles.CupCylinderPiston}>
                <View style={styles.CupCylinderPistonFront} />
              </View>
              <View style={styles.CupPistonCase} />
            </View>
            <View style={styles.WhiteCupFrame}>
              <View style={styles.CupStore} />
              <View style={styles.CupCylinderPiston}>
                <View style={styles.CupCylinderPistonFront} />
              </View>
              <View style={styles.CupPistonCase} />
            </View>
            <View style={styles.MetalCupFrame}>
              <View style={styles.CupStore} />
              <View style={styles.CupCylinderPiston}>
                <View style={styles.CupCylinderPistonFront} />
              </View>
              <View style={styles.CupPistonCase} />
            </View>
          </View>
        </View>

        <View style={styles.CommandInterface}>
          <View style={styles.CommandCase}>
            <View style={styles.CommandHL}>
              <View style={styles.Command}>
                <RadialGradient
                  style={styles.CommandHL1}
                  colors={[this.state.hl1On ? '#FF8300' : '#FFAE42', '#FFAE42']}
                  stops={[0.4, 1]}
                />
                <Text>HL1</Text>
              </View>
              <View style={styles.Command}>
                <RadialGradient
                  style={styles.CommandHL2}
                  colors={[this.state.hl2On ? '#0E7A0D' : '#7EC850', '#7EC850']}
                  stops={[0.4, 1]}
                />
                <Text>HL2</Text>
              </View>
              <View style={styles.Command}>
                <RadialGradient
                  style={styles.CommandHL3}
                  colors={[this.state.hl3On ? '#AA0000' : '#FF0000', '#FF0000']}
                  stops={[0.4, 1]}
                />
                <Text>HL3</Text>
              </View>
            </View>
            <View style={styles.CommandSB}>
              <View style={styles.Command}>
                <View
                  style={[
                    styles.CommandSB1,
                    {borderWidth: this.state.sb1Pressed ? 4 : 2},
                  ]}
                />
                <Text>SB1</Text>
              </View>
              <View style={styles.Command}>
                <View
                  style={[
                    styles.CommandSB2,
                    {borderWidth: this.state.sb2Pressed ? 4 : 2},
                  ]}
                />
                <Text>SB2</Text>
              </View>
            </View>
            <View style={styles.CommandSA}>
              <View style={styles.Command}>
                <View
                  style={[
                    styles.CommandSA1,
                    {
                      transform: [
                        {rotate: this.state.saPressed ? '45deg' : '-45deg'},
                      ],
                    },
                  ]}>
                  <View style={styles.CommandSA1Line} />
                </View>
                <Text>SA</Text>
              </View>
            </View>
            <View style={styles.CommandQS}>
              <View style={styles.Command}>
                <View style={styles.CommandQS1}>
                  <Image
                    source={require('./resources/images/buttons/emergency.jpg')}
                    style={{
                      width: this.state.qsPressed ? 26 : 34,
                      height: this.state.qsPressed ? 26 : 34,
                      borderRadius: 17,
                    }}
                  />
                </View>
                <Text>QS</Text>
              </View>
            </View>
          </View>
        </View>
      </>
    );
  }
}
