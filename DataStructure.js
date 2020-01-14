'use strict';

/**
 * Class which represents proccess data
 */
export default class DataStructure {
  /**
   * Create a DataStructure
   * @param {int} s1
   * @param {int} s2
   * @param {int} s3
   * @param {int} s4
   * @param {int} s5
   * @param {int} s6
   * @param {int} s7
   * @param {int} s8
   * @param {int} c1
   * @param {int} c2
   * @param {int} c3
   * @param {int} c4
   * @param {int} c5
   * @param {int} c6
   * @param {int} c7
   * @param {int} c8
   * @param {Date} date
   */
  constructor(
    s1,
    s2,
    s3,
    s4,
    s5,
    s6,
    s7,
    s8,
    c1,
    c2,
    c3,
    c4,
    c5,
    c6,
    c7,
    c8,
    date,
  ) {
    this._s1 = s1;
    this._s2 = s2;
    this._s3 = s3;
    this._s4 = s4;
    this._s5 = s5;
    this._s6 = s6;
    this._s7 = s7;
    this._s8 = s8;

    this._c1 = c1;
    this._c2 = c2;
    this._c3 = c3;
    this._c4 = c4;
    this._c5 = c5;
    this._c6 = c6;
    this._c7 = c7;
    this._c8 = c8;

    this._date = date;
  }

  /**
   * Get the s1
   * @return {int} s1
   */
  get getS1() {
    return this._s1;
  }

  /**
   * Get the s2
   * @return {int} s2
   */
  get getS2() {
    return this._s2;
  }

  /**
   * Get the s3
   * @return {int} s3
   */
  get getS3() {
    return this._s3;
  }

  /**
   * Get the s4
   * @return {int} s4
   */
  get getS4() {
    return this._s4;
  }

  /**
   * Get the s5
   * @return {int} s5
   */
  get getS5() {
    return this._s5;
  }

  /**
   * Get the s6
   * @return {int} s6
   */
  get getS6() {
    return this._s6;
  }

  /**
   * Get the s7
   * @return {int} s7
   */
  get getS7() {
    return this._s7;
  }

  /**
   * Get the s8
   * @return {int} s8
   */
  get getS8() {
    return this._s8;
  }

  /**
   * Get the c1
   * @return {int} c1
   */
  get getC1() {
    return this._c1;
  }

  /**
   * Get the c2
   * @return {int} c2
   */
  get getC2() {
    return this._c2;
  }

  /**
   * Get the c3
   * @return {int} c3
   */
  get getC3() {
    return this._c3;
  }

  /**
   * Get the c4
   * @return {int} c4
   */
  get getC4() {
    return this._c4;
  }

  /**
   * Get the c5
   * @return {int} c5
   */
  get getC5() {
    return this._c5;
  }

  /**
   * Get the c6
   * @return {int} c6
   */
  get getC6() {
    return this._c6;
  }

  /**
   * Get the c7
   * @return {int} c7
   */
  get getC7() {
    return this._c7;
  }

  /**
   * Get the c8
   * @return {int} c8
   */
  get getC8() {
    return this._c8;
  }

  /**
   * Get the date
   * @return {Date} date
   */
  get getDate() {
    return this._date;
  }
}
