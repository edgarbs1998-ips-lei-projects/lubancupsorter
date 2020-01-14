'use strict';

import {PermissionsAndroid, ToastAndroid} from 'react-native';

import * as FileSystem from 'react-native-fs';

const EXTERNAL_STORAGE_PATH =
  FileSystem.ExternalStorageDirectoryPath + '/LuBanCupSorter';

export default class SimulationFile {
  static async LoadDataFile(me, dataPhraseParser, onDataPhraseReceive) {
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

      dataPhrases.forEach((phrase, index) => {
        if (phrase.length !== 57) {
          return;
        }

        let dataStructure = dataPhraseParser(phrase);

        let timeout = dataStructure.getDate.valueOf() - new Date().valueOf();
        if (timeout > 0) {
          setTimeout(onDataPhraseReceive, timeout, me, dataStructure);
        }
      });

      ToastAndroid.show('Successfully loaded data file!', ToastAndroid.SHORT);
    } catch (err) {
      console.warn(err);
      ToastAndroid.show('Something went wrong!', ToastAndroid.LONG);
      return;
    }
  }
}
