/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

'use strict';

import React, {Component} from 'react';
import {Text, View, Image, Animated, ImageBackground} from 'react-native';

import RadialGradient from 'react-native-radial-gradient';

import styles from './styles';
import SimulationFile from './SimulationFile';
import DataStructure from './DataStructure';

const CUP_COLOR_DEFAULT = '#328da8';
const CUP_COLOR_BLACK = '#141414';
const CUP_COLOR_WHITE = '#FEFFD1';
const CUP_COLOR_METAL = '#A9ACB6';

const ANIMATION_DURATION_PIXELS = 100;
const ANIMATION_DURATION_MILLISECONDS = 1000;

export default class App extends Component {
  constructor(props) {
    super(props);

    console.disableYellowBox = true;

    this.sortingCup = false;

    /* Component onLayout get props */
    this.sorterFrameHeight = 0;
    this.blackCupFrameTop = 0;
    this.whiteCupFrameTop = 0;
    this.metalCupFrameTop = 0;
    this.colorSensorFrameTop = 0;

    /* Cup Animation */
    this.cupPositionBottom = new Animated.Value(15);
    this.cupPositionLeft = new Animated.Value(26);

    /* Piston Animation */
    this.blackPistonRight = new Animated.Value(-8);
    this.whitePistonRight = new Animated.Value(-8);
    this.metalPistonRight = new Animated.Value(-8);

    this.state = {
      /* Cup */
      cupVisible: false,
      cupColor: CUP_COLOR_DEFAULT,

      /* Command Interface */
      commandInterfaceHL1On: false,
      commandInterfaceHL2On: false,
      commandInterfaceHL3On: false,

      commandInterfaceSB1Pressed: false,
      commandInterfaceSB2Pressed: false,

      commandInterfaceSAPressed: false,

      commandInterfaceQSPressed: false,

      /* Statistics */
      statisticsBlackSortedCups: 0,
      statisticsWhiteSortedCups: 0,
      statisticsMetalSortedCups: 0,
      statisticsTotalSortedCups: 0,
      statisticsTotalUnsortedCups: 0,
    };
  }

  onDataPhraseReceive(me, dataPhrase) {
    me.setState({commandInterfaceHL1On: dataPhrase.getC1 === '1'});
    me.setState({commandInterfaceHL2On: dataPhrase.getC2 === '1'});
    me.setState({commandInterfaceHL3On: dataPhrase.getC3 === '1'});
    me.setState({commandInterfaceSB1Pressed: dataPhrase.getC4 === '1'});
    me.setState({commandInterfaceSB2Pressed: dataPhrase.getC5 === '1'});
    me.setState({commandInterfaceSAPressed: dataPhrase.getC6 === '1'});
    me.setState({commandInterfaceQSPressed: dataPhrase.getC7 === '1'});

    if (dataPhrase.getS1 === '1') {
      if (me.sortingCup === true) {
        me.setState({
          statisticsTotalUnsortedCups: me.state.statisticsTotalUnsortedCups + 1,
        });
      }
      me.sortingCup = true;

      me.cupPositionBottom = new Animated.Value(15);
      me.cupPositionLeft = new Animated.Value(26);
      me.setState({
        cupVisible: true,
        cupColor: CUP_COLOR_DEFAULT,
      });

      if (dataPhrase.getS2 === '1') {
        me.setState({cupColor: CUP_COLOR_METAL});
      }
    } else if (dataPhrase.getS3 === '1') {
      me.setState({cupColor: CUP_COLOR_WHITE});

      let toValue = me.sorterFrameHeight - me.colorSensorFrameTop - 30;
      let duration =
        ((toValue - me.cupPositionBottom._value) *
          ANIMATION_DURATION_MILLISECONDS) /
        ANIMATION_DURATION_PIXELS;
      Animated.timing(me.cupPositionBottom, {
        toValue: toValue,
        duration: duration,
      }).start();
    } else {
      if (me.state.cupColor === CUP_COLOR_DEFAULT) {
        me.setState({cupColor: CUP_COLOR_BLACK});
      }

      if (dataPhrase.getS4 === '1') {
        me.sortingCup = false;

        me.setState({
          statisticsMetalSortedCups: me.state.statisticsMetalSortedCups + 1,
        });
        me.setState({
          statisticsTotalSortedCups:
            me.state.statisticsBlackSortedCups +
            me.state.statisticsWhiteSortedCups +
            me.state.statisticsMetalSortedCups,
        });

        let toValue = me.sorterFrameHeight - me.metalCupFrameTop - 46;
        let duration =
          ((toValue - me.cupPositionBottom._value) *
            ANIMATION_DURATION_MILLISECONDS) /
          ANIMATION_DURATION_PIXELS;
        Animated.timing(me.cupPositionBottom, {
          toValue: toValue,
          duration: duration,
        }).start();
        Animated.sequence([
          Animated.timing(me.metalPistonRight, {
            delay: duration,
            toValue: 12,
            duration: 200,
          }),
          Animated.timing(me.metalPistonRight, {
            toValue: -8,
            duration: 500,
          }),
        ]).start();
        Animated.timing(me.cupPositionLeft, {
          delay: duration + 100,
          toValue: -95,
          duration: 500,
        }).start();
      } else if (dataPhrase.getS5 === '1') {
        me.sortingCup = false;

        me.setState({
          statisticsWhiteSortedCups: me.state.statisticsWhiteSortedCups + 1,
        });
        me.setState({
          statisticsTotalSortedCups:
            me.state.statisticsBlackSortedCups +
            me.state.statisticsWhiteSortedCups +
            me.state.statisticsMetalSortedCups,
        });

        let toValue = me.sorterFrameHeight - me.whiteCupFrameTop - 46;
        let duration =
          ((toValue - me.cupPositionBottom._value) *
            ANIMATION_DURATION_MILLISECONDS) /
          ANIMATION_DURATION_PIXELS;
        Animated.timing(me.cupPositionBottom, {
          toValue: toValue,
          duration: duration,
        }).start();
        Animated.sequence([
          Animated.timing(me.whitePistonRight, {
            delay: duration,
            toValue: 12,
            duration: 200,
          }),
          Animated.timing(me.whitePistonRight, {
            toValue: -8,
            duration: 500,
          }),
        ]).start();
        Animated.timing(me.cupPositionLeft, {
          delay: duration + 100,
          toValue: -95,
          duration: 500,
        }).start();
      } else if (dataPhrase.getS6 === '1') {
        me.sortingCup = false;

        me.setState({
          statisticsBlackSortedCups: me.state.statisticsBlackSortedCups + 1,
        });
        me.setState({
          statisticsTotalSortedCups:
            me.state.statisticsBlackSortedCups +
            me.state.statisticsWhiteSortedCups +
            me.state.statisticsMetalSortedCups,
        });

        let toValue = me.sorterFrameHeight - me.blackCupFrameTop - 46;
        let duration =
          ((toValue - me.cupPositionBottom._value) *
            ANIMATION_DURATION_MILLISECONDS) /
          ANIMATION_DURATION_PIXELS;
        Animated.timing(me.cupPositionBottom, {
          toValue: toValue,
          duration: duration,
        }).start();
        Animated.sequence([
          Animated.timing(me.blackPistonRight, {
            delay: duration,
            toValue: 12,
            duration: 200,
          }),
          Animated.timing(me.blackPistonRight, {
            toValue: -8,
            duration: 500,
          }),
        ]).start();
        Animated.timing(me.cupPositionLeft, {
          delay: duration + 100,
          toValue: -95,
          duration: 500,
        }).start();
      }
    }
  }

  parseDataPhrase(dataPhrase) {
    return new DataStructure(
      dataPhrase.charAt(1),
      dataPhrase.charAt(3),
      dataPhrase.charAt(5),
      dataPhrase.charAt(7),
      dataPhrase.charAt(9),
      dataPhrase.charAt(11),
      dataPhrase.charAt(13),
      dataPhrase.charAt(15),
      dataPhrase.charAt(17),
      dataPhrase.charAt(19),
      dataPhrase.charAt(21),
      dataPhrase.charAt(23),
      dataPhrase.charAt(25),
      dataPhrase.charAt(27),
      dataPhrase.charAt(29),
      dataPhrase.charAt(31),
      new Date(
        dataPhrase.substring(33, 37),
        dataPhrase.substring(38, 40) - 1,
        dataPhrase.substring(41, 43),
        dataPhrase.substring(44, 46),
        dataPhrase.substring(47, 49),
        dataPhrase.substring(50, 52),
        dataPhrase.substring(53, 56),
      ),
    );
  }

  componentDidMount() {
    SimulationFile.LoadDataFile(
      this,
      this.parseDataPhrase,
      this.onDataPhraseReceive,
    );
  }

  render() {
    return (
      <ImageBackground
        source={require('./resources/images/background.png')}
        style={styles.BackgroundImage}
        resizeMode="repeat">
        <View style={styles.SorterStation}>
          <View
            style={styles.SorterFrame}
            onLayout={e => {
              this.sorterFrameHeight = e.nativeEvent.layout.height;
            }}>
            <View style={styles.ConveyorBelt} />
            <View style={styles.CupReceiverFrame}>
              <View style={styles.CupReceiverFrameCenter} />
            </View>
            <View
              style={styles.BlackCupFrame}
              onLayout={e => {
                this.blackCupFrameTop = e.nativeEvent.layout.y;
              }}>
              <View>
                <Text style={styles.CupStoreText}>Black</Text>
                <View style={styles.CupStoreView}>
                  <Text style={styles.CupStoreTotalText}>
                    {this.state.statisticsBlackSortedCups}
                  </Text>
                  <View style={styles.CupStore} />
                </View>
              </View>
              <Animated.View
                style={[
                  styles.CupCylinderPiston,
                  {right: this.blackPistonRight},
                ]}>
                <View style={styles.CupCylinderPistonFront} />
              </Animated.View>
              <View style={styles.CupPistonCase} />
            </View>
            <View
              style={styles.WhiteCupFrame}
              onLayout={e => {
                this.whiteCupFrameTop = e.nativeEvent.layout.y;
              }}>
              <View>
                <Text style={styles.CupStoreText}>White</Text>
                <View style={styles.CupStoreView}>
                  <Text style={styles.CupStoreTotalText}>
                    {this.state.statisticsWhiteSortedCups}
                  </Text>
                  <View style={styles.CupStore} />
                </View>
              </View>
              <Animated.View
                style={[
                  styles.CupCylinderPiston,
                  {right: this.whitePistonRight},
                ]}>
                <View style={styles.CupCylinderPistonFront} />
              </Animated.View>
              <View style={styles.CupPistonCase} />
            </View>
            <View
              style={styles.MetalCupFrame}
              onLayout={e => {
                this.metalCupFrameTop = e.nativeEvent.layout.y;
              }}>
              <View>
                <Text style={styles.CupStoreText}>Metal</Text>
                <View style={styles.CupStoreView}>
                  <Text style={styles.CupStoreTotalText}>
                    {this.state.statisticsMetalSortedCups}
                  </Text>
                  <View style={styles.CupStore} />
                </View>
              </View>
              <Animated.View
                style={[
                  styles.CupCylinderPiston,
                  {right: this.metalPistonRight},
                ]}>
                <View style={styles.CupCylinderPistonFront} />
              </Animated.View>
              <View style={styles.CupPistonCase} />
            </View>

            {this.state.cupVisible === true && (
              <Animated.View
                style={[
                  styles.Cup,
                  {
                    backgroundColor: this.state.cupColor,
                    bottom: this.cupPositionBottom,
                    left: this.cupPositionLeft,
                  },
                ]}
              />
            )}

            <View
              style={styles.ColorSensorFrame}
              onLayout={e => {
                this.colorSensorFrameTop = e.nativeEvent.layout.y;
              }}>
              <View style={styles.ColorSensorFrameCenter} />
            </View>
          </View>

          <Text style={styles.TotalText}>
            Total of sorted cups: {this.state.statisticsTotalSortedCups}
          </Text>
          <Text style={styles.TotalText}>
            Total of unsorted cups: {this.state.statisticsTotalUnsortedCups}
          </Text>
        </View>

        <View style={styles.CommandInterface}>
          <View style={styles.CommandCase}>
            <View style={styles.CommandHL}>
              <View style={styles.Command}>
                <RadialGradient
                  style={styles.CommandHL1}
                  colors={[
                    this.state.commandInterfaceHL1On ? '#FF8300' : '#FFAE42',
                    '#FFAE42',
                  ]}
                  stops={[0.4, 1]}
                />
                <Text>HL1</Text>
              </View>
              <View style={styles.Command}>
                <RadialGradient
                  style={styles.CommandHL2}
                  colors={[
                    this.state.commandInterfaceHL2On ? '#0E7A0D' : '#7EC850',
                    '#7EC850',
                  ]}
                  stops={[0.4, 1]}
                />
                <Text>HL2</Text>
              </View>
              <View style={styles.Command}>
                <RadialGradient
                  style={styles.CommandHL3}
                  colors={[
                    this.state.commandInterfaceHL3On ? '#AA0000' : '#FF0000',
                    '#FF0000',
                  ]}
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
                    {
                      borderWidth: this.state.commandInterfaceSB1Pressed
                        ? 4
                        : 2,
                    },
                  ]}
                />
                <Text>SB1</Text>
              </View>
              <View style={styles.Command}>
                <View
                  style={[
                    styles.CommandSB2,
                    {
                      borderWidth: this.state.commandInterfaceSB2Pressed
                        ? 4
                        : 2,
                    },
                  ]}
                />
                <Text>SB2</Text>
              </View>
            </View>
            <View style={styles.CommandSA}>
              <View style={styles.Command}>
                <View
                  key={this.state.commandInterfaceSAPressed}
                  style={[
                    styles.CommandSA1,
                    {
                      transform: [
                        {
                          rotate: this.state.commandInterfaceSAPressed
                            ? '45deg'
                            : '-45deg',
                        },
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
                    style={[
                      styles.CommandQS1Image,
                      {
                        width: this.state.commandInterfaceQSPressed ? 26 : 34,
                        height: this.state.commandInterfaceQSPressed ? 26 : 34,
                      },
                    ]}
                  />
                </View>
                <Text>QS</Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
