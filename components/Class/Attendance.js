import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, Text, Dimensions ,TouchableOpacity,Image} from 'react-native';
import {Table, TableWrapper, Row} from 'react-native-table-component';

import logoBack from '../icons/icons8-double-left-96.png';

const {width: WIDTH} = Dimensions.get ('window');
const {height: HEIGHT} = Dimensions.get ('window');

export default class ExampleThree extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor (props) {
    super (props);
    this.state = {
      tableHead: ['STT', 'MSSV', 'Full Name ', 'Check', 'Note'],
      widthArr: [
        WIDTH * 0.07,
        WIDTH * 0.2,
        WIDTH * 0.48,
        WIDTH * 0.1,
        WIDTH * 0.15,
      ],
    };
  }
  render () {
    const state = this.state;
    const tableData = [];
    for (let i = 0; i < 20; i += 1) {
      const rowData = [];
      for (let j = 0; j < 5; j += 1) {
        rowData.push (`${i}${j}`);
      }
      tableData.push (rowData);
    }

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.contentChild}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}
              style={{height: 30, width: 30}}
            >
              <Image style={{height: 30, width: 30}} source={logoBack} />
            </TouchableOpacity>
          </View>

          <View style={styles.viewText}>
            <Text style={styles.styleText}>
              05CNTT1- REACT NATIVE
            </Text>
          </View>

          <View style={styles.rowAbout} />
        </View>
        <View style={{flex: 1}}>
          <ScrollView horizontal={true}>
            <View
              style={{
                paddingHorizontal: 0,
                width: WIDTH,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Table borderStyle={{borderColor: '#C1C0B9'}}>
                <Row
                  data={state.tableHead}
                  widthArr={state.widthArr}
                  style={styles.header}
                  textStyle={styles.text}
                />
              </Table>
              <ScrollView style={styles.dataWrapper}>
                <View
                  style={{
                    width: WIDTH,
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >

                  <Table borderStyle={{borderColor: '#C1C0B9'}}>
                    {tableData.map ((rowData, index) => (
                      <Row
                        key={index}
                        data={rowData}
                        widthArr={state.widthArr}
                        style={[
                          styles.row,
                          index % 2 && {backgroundColor: '#F7F6E7'},
                        ]}
                        textStyle={styles.text}
                      />
                    ))}
                  </Table>
                </View>
              </ScrollView>
            </View>
          </ScrollView>
        </View>

        <View style={styles.viewResult}>
          <View style={styles.viewResultChild}>
            <Text style={styles.textResult}>Total Student : 30</Text>
            <Text style={styles.textResult}>Student Pass: 25</Text>
          </View>
          <View style={styles.viewResultChild}>
            <Text style={styles.textResult}>Student Fail : 5</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  /**
   * HEADER
   */
  content: {
    height: 45,
    backgroundColor: '#03a9f4',
    flexDirection: 'row',
  },
  contentChild: {
    height: 45,
    width: WIDTH / 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  viewText: {
    height: 45,
    width: 140,
    marginLeft: (WIDTH - WIDTH / 10 - 140 - 40) / 2,
    justifyContent: 'center',
  },
  styleText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
  },
  rowAbout: {
    height: 45,
    width: 100,
    backgroundColor: '#03a9f4',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  /**
   * CONTENT
   */
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  infoClass: {
    width: WIDTH,
    height: HEIGHT / 17,
    backgroundColor: '#03a9f4',
    flexDirection: 'row',
  },
  infoDetail: {
    width: WIDTH * 0.4,
    height: HEIGHT / 17,
    color: '#fff',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  header: {
    height: 50,
    backgroundColor: '#537791',
  },
  text: {
    textAlign: 'center',
    fontWeight: '100',
  },
  dataWrapper: {
    marginTop: -1,
  },
  row: {
    height: 40,
    backgroundColor: '#E7E6E1',
  },
  viewResult: {
    zIndex: 10,
    backgroundColor: '#4bacb8',
    height: HEIGHT / 9,
    width: WIDTH,
    paddingLeft: 20,
    justifyContent: 'center',
  },
  textResult: {
    marginVertical: 5,
    fontSize: 15,
    width: WIDTH * 0.4,
  },
  viewResultChild: {
    flexDirection: 'row',
    marginHorizontal: WIDTH / 14,
  },
});
