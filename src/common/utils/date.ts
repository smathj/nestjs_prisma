export class NowTime {
  private month = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ];
  private today;
  constructor() {
    this.today = new Date();
  }
  // static getInstance() {
  //   this.today = new NowTime();
  // }

  // 월 : xx월
  getMonth() {
    const nowMonth = this.today.getUTCMonth() + 1;
    return nowMonth;
  }
  // 일 : xx일
  getDate() {
    const nowDate = this.today.getUTCDate();
    return nowDate;
  }
  // 시간
  getTime() {
    const nowTime =
      this.today.getHours() +
      ':' +
      this.today.getUTCMinutes() +
      ':' +
      this.today.getUTCSeconds();
    return nowTime;
  }
  // 요일
  getday() {
    const nowDay = this.month[this.today.getUTCDay()];
    return nowDay;
  }

  now() {
    return (
      // 연도
      this.today.getUTCFullYear() +
      '-' +
      // 달
      this.getMonth() +
      '-' +
      // 일
      this.getDate() +
      ' ' +
      // 시간
      this.getTime() +
      ' ' +
      // 요일
      this.getday()
    );
  }
}
