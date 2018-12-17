/**
 *@author
 *@date         2018/9/28 00:29
 *@Copyright    天源迪科信息技术股份有限公司
 *@Description  注册自定义校验
 */
function execValidator(type) {
  return Validate[type].validator;
}

const Validate = {
  //note custom
  custom: {
    /**
     * 增加联动校验选项requireKeyValues预判,如果有则处理,没有则正常处理validator校验
     * @param {Object} rule
     * @param {*} value
     * @param {Function} callback
     * @param {Object} modal
     */
    validator: (rule, value, callback, {modal}) => {
      if (rule.requireKeyValues) {
        rule.validateType = rule.validateType || 'require'
        let result = false;
        rule.requireKeyValues.forEach(item => {
          if (item instanceof Object) {
            if (item.values.indexOf(modal[item.key]) != -1) {
              result = true;
            }
          }
        });
        if (result) {
          execValidator(rule.validateType)(rule, value, callback, modal)
        } else {
          callback();
        }
      } else {
        execValidator(rule.validateType)(rule, value, callback, modal);
      }
    }
  },
  //note 必填
  require: {
    validator: (rule, value, callback) => {
      if (value === "" || value === undefined || value === null) {
        callback(new Error(rule.message || '不能为空'));
      }
      callback();
    }
  },
  //note 手机
  mobile: {
    // regexp: /^(\+)?(0|86|086|17951)?(\-)?(13[0-9]|15[012356789]|16[56]|17[012345678]|18[0-9]|19[89]|14[579])[0-9]{8}$/,
    regexp: /^(\+)?(0|86|086|17951)?(\-)?[0-9]{11}$/,
    validator: (rule, value, callback) => {
      if (value.match(rule.regexp || Validate.mobile.regexp)) {
        callback();
      } else {
        callback(new Error(rule.message || '联系电话格式不正确，请重新输入！'));
      }
    }
  },
  //note 座机
  phone: {
    regexp: /^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/,
    validator: (rule, value, callback) => {
      if (value.match(rule.regexp || Validate.phone.regexp)) {
        callback();
      } else {
        callback(new Error(rule.message || '电话格式不正确,如果是座机区号和分机号要用"-"隔开'));
      }
    }
  },
  //note 手机加座机
  mobilePhone: {
    validator: (rule, value, callback) => {
      if (value.match(Validate.phone.regexp) || value.match(Validate.mobile.regexp)) {
        callback();
      } else {
        callback(new Error(rule.message || '建议输入手机号码接收短信验证码'));
      }
    }
  },
  //note 银行账号校验
  bankCard: {
    regexp: /^[0-9]*$/,
    validator: (rule, value, callback) => {
      if (value) {
        value = value.toString()
        if (value.match(rule.regexp || Validate.bankCard.regexp)) {
          callback();
        } else {
          callback(new Error(rule.message || '银行账号格式不正确'));
        }
      } else {
        callback();
      }
    }
  },
  //note 数字校验
  number: {
    regexp: /^[1-9]{1}[0-9]*$/,
    regexp1: /^[1-9]{1}[0-9]*$|^[+]{0,1}(\d+\.\d+)$/,
    validator: (rule, value, callback) => {
      if (value) {
        value = value.toString()
        if (rule.dot) {
          if (value.match(rule.regexp1 || Validate.number.regexp1)) {
            callback();
          } else {
            callback(new Error(rule.message || '必须输入正数'));
          }
        } else {
          if (value.match(rule.regexp || Validate.number.regexp)) {
            callback();
          } else {
            callback(new Error(rule.message || '必须输入正整数'));
          }
        }
      } else {
        callback(new Error(rule.message || '不能为空'));
      }
    }
  },
  //note 身份证校验
  identification: {
    // regexp:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
    regexp: /(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
    validator: (rule, value, callback) => {
      if (value) {
        if (value.length != 18) {
          callback(new Error(rule.message || '身份证号码为18位！'));
        } else if (value.match(rule.regexp || Validate.identification.regexp)) {
          callback();
        } else {
          callback(new Error(rule.message || '身份证必须是数字或者数字与字母组合！'));
        }
      } else {
        callback(new Error(rule.message || '请输入身份证号！'));
      }
    }
  },
  //note 日期校验
  daterange: {
    validator: (rule, value, callback) => {
      if (value && !!value[0] && !!value[1]) {
        const unit = rule.unit || '天'
        if (rule.range) {
          if (unit === '天') {
            const dateRange = Date.parse(value[1]) - Date.parse(value[0]) + 1;
            if (dateRange / (60 * 60 * 24 * 1000) > rule.range) {
              return callback(new Error(rule.message || `起止时间不得超过${rule.range}天`));
            }
          } else if (unit === '年') {
            var d1 = new Date(value[0]);
            var d2 = new Date(value[1]);
            d1.setFullYear(d1.getFullYear() + rule.range);
            d1.setDate(d1.getDate() - 1);
            if (Date.parse(d2) > Date.parse(d1)) {
              return callback(new Error(rule.message || `起止时间不得超过${rule.range}年`));
            }
          }
        }
        callback();
      } else {
        callback(new Error(rule.message || '起止时间不能为空'));
      }
    }
  },
  //note extendTable里的身份证号校验
  checkIdcardList: {
    validator: (rule, value, callback) => {
      if (value.length < 3) {
        return callback(new Error(rule.message || `请至少填写3人信息`));
      }
      for (let i = 0; i < value.length; i++) {
        if (i < 3) {
          if (JSON.stringify(value[i]) == '{}') {
            return callback(new Error(rule.message || `请至少填写3人信息`));
          } else if (!value[i].lengthValid || value[i].lengthValid == undefined) {
            return callback(new Error(`请填写姓名, 字数在255之内`));
          } else if (!value[i].valid || value[i].valid == undefined) {
            return callback(new Error(`请填写正确的身份证号`));
          }
        } else {
          if (JSON.stringify(value[i]) == '{}') {
            value.splice(i, 0)
          } else if (!value[i].lengthValid || value[i].lengthValid == undefined) {
            return callback(new Error(`请填写姓名, 字数在255之内`));
          } else if (!value[i].valid || value[i].valid == undefined) {
            return callback(new Error(`请填写正确的身份证号`));
          }
        }
      }
      callback();
    },
  },
  //note 职工总数的校验
  workerNum: {
    validator: (rule, value, callback) => {
      if (!value) {
        return callback(new Error(rule.message || `职工总数不能为0`));
      } else if (value - parseInt(value) != 0) {
        return callback(new Error(`职工人数不能为小数`));
      } else if (value.toString().length > 10) {
        return callback(new Error(`职工总数长度不能超过10`));
      }
      callback();
    }
  },
  //note 时间不能超过7天
  noMoreDay: {
    validator: (rule, value, callback) => {
      const now = new Date();
      const dateRange = Date.parse(now) - Date.parse(value) + 1;
      if (dateRange < 0) {
        return callback(new Error(rule.message || `应在签订合同日${rule.range}个工作日内提交申请`));
      } else {
        if (dateRange / (60 * 60 * 24 * 1000) > rule.range) {
          return callback(new Error(rule.message || `应在签订合同日${rule.range}个工作日内提交申请`));
        }
      }
      callback();
    }
  },
  // note 预案地址校验
  checkAddress: {
    validator: (rule, value, callback) => {
      let flag = true;
      for (let i = 0; i < value.length; i++) {
        if (flag = true) {
          if (value[i].nameValid == true) {

          } else {
            flag = false;
            return callback(new Error(`请填写完整预案地址!`));
          }
        }
      }
      callback();
    }
  },
  // note 占地面积
  area: {
    regexp: /^\d+%$/,
    regexp1: /^[1-9]{1}[0-9]*$|^[+]{0,1}(\d+\.\d+)$/,
    validator: (rule, value, callback) => {
      if (value) {
        if (value.match(rule.regexp1 || Validate.area.regexp1)) {
          callback();
        } else if (value.match(rule.regexp || Validate.area.regexp)) {
          callback();
        } else {
          callback(new Error(rule.message || '必须输入数字'));
        }
      } else {
        callback();
      }
    }
  },
  //note 食品，面积增加校验50平以下，增加校验，问题重新梳理
  area2: {
    regexp: /^([1-9]|([1-4][0-9]))$/,
    validator: (rule, value, callback) => {
      if (value) {
        if (value.match(rule.regexp || Validate.area2.regexp)) {
          callback();
        } else {
          callback(new Error(rule.message || '请输入面积50平以下'));
        }
      } else {
        callback();
      }
    }
  },

  //note 传真
  faxx: {
    regexp: /^(\d{3,4}-)?\d{7,8}$/,
    regexp1: /^(\d{3,4}\+)?\d{7,8}$/,
    validator: (rule, value, callback) => {
      if (value) {
        if (value.match(rule.regexp || Validate.faxx.regexp)) {
          callback();
        } else if (value.match(rule.regexp1 || Validate.faxx.regexp1)) {
          callback();
        } else {
          callback(new Error(rule.message || '请输入正确的传真'));
        }
      } else {
        callback();
      }
    }
  },
  // note 数字首字母可以为0
  number1: {
    regexp: /^[0-9]{1}[0-9]*$/,
    validator: (rule, value, callback) => {
      if (value) {
        if (value.match(rule.regexp || Validate.number1.regexp)) {
          callback();
        } else {
          callback(new Error(rule.message || '必须输入数字'));
        }
      } else {
        callback(new Error(rule.message || '请输入'));
      }
    }
  },
  // note 正整数不包括0
  number2: {
    regexp: /^[1-9]\d*$/,
    validator: (rule, value, callback) => {
      if (value) {
        if (value.match(rule.regexp || Validate.number2.regexp)) {
          callback();
        } else {
          callback(new Error(rule.message || '必须输入不为0的数字'));
        }
      } else {
        callback(new Error(rule.message || '请输入'));
      }
    }
  },
  // note 数字两位小数
  number3: {
    regexp: /^[0-9]+([.]{1}[0-9]{1,2})?$/,
    validator: (rule, value, callback) => {
      if (value) {
        if (value.match(rule.regexp || Validate.number3.regexp)) {
          callback();
        } else {
          callback(new Error(rule.message || '只能输入数字，精确至两位小数'));
        }
      } else {
        callback(new Error(rule.message || '请输入'));
      }
    }
  },
  // note 邮编
  stamp: {
    regexp: /^[0-9]{6}$/,
    validator: (rule, value, callback) => {
      if (value) {
        if (value.match(rule.regexp || Validate.stamp.regexp)) {
          callback();
        } else if (value.toString().length > 6) {
          return callback(new Error(`邮编总长度不能大于6`));
        } else {
          callback(new Error(rule.message || '请输入正确格式的邮政编码'));
        }
      } else {
        callback();
      }
    }
  },
  // note 邮箱
  email: {
    regexp: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
    validator: (rule, value, callback) => {
      if (value) {
        if (value.match(rule.regexp || Validate.email.regexp)) {
          callback();
        } else {
          callback(new Error(rule.message || '请输入正确格式的邮箱'));
        }
      } else {
        callback();
      }
    }
  },
  // note 输入文本内容不超过多少字
  notMoreWords: {
    validator: (rule, value, callback) => {
      if (!rule.num) {
        return;
      }
      const num = rule.num;
      if (value) {
        if (value.length > num) {
          callback(new Error(rule.message || `文本内容不能超过${num}个字`));
        } else {
          callback();
        }
      } else {
        callback();
      }
    }
  },
  //note 只支持中英文
  userName: {
    regexp: /^[^0-9]+$/,
    validator: (rule, value, callback) => {
      if (value) {
        if (value.match(rule.regexp || Validate.userName.regexp)) {
          callback();
        } else {
          callback(new Error(rule.message || '请输入正确格式的姓名'));
        }
      } else {
        callback(new Error(rule.message || '姓名不能为空'));
      }
    }
  },
  // note 不输入的时候的校验
  notNumber: {
    regexp: /^[0-9]{1}[0-9]*$/,
    validator: (rule, value, callback) => {
      if (value) {
        if (value.match(rule.regexp || Validate.notNumber.regexp)) {
          callback();
        } else {
          callback(new Error(rule.message || '必须输入数字'));
        }
      } else {
        callback();
      }
    }
  },
  // note 统一社会信用代码校验（18位，纯数字或数字与大小字母混合，大写字母不包括IOZSV）
  socialCode: {
    regexp: /^(?=.*\d)[^_IOZSVa-z\W]{18}$/g,
    validator: (rule, value, callback) => {
      if (value) {
        if (value.match(rule.regexp || Validate.socialCode.regexp)) {
          callback();
        } else {
          callback(new Error(rule.message || '请填写正确的统一社会信用代码'));
        }
      } else {
        callback();
      }
    }
  },
  // note 车牌号校验（）
  vehicleLicense: {
    // regexp: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/g,
    regexp: /^[陕]{1}[^O|I]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/g,
    validator: (rule, value, callback) => {
      if (value) {
        if (value.match(rule.regexp || Validate.vehicleLicense.regexp)) {
          callback();
        } else {
          callback(new Error(rule.message || '请填写正确的车辆车牌号码'));
        }
      } else {
        callback();
      }
    }
  },
  // note 联动必填校验
  linkage: {
    validator: (rule, value, callback, modal) => {
      let result = true;
      if (rule.requireKeyValues instanceof Array) {
        rule.requireKeyValues.forEach(item => {
          if (item instanceof Object) {
            if (item.values.indexOf(modal[item.key]) != -1) {
              if (value === "" || value === undefined || value === null) {
                result = false;
              }
            }
          }
        });
        if (result) {
          callback();
        } else {
          callback(new Error(rule.message || '不能为空'));

        }
      }
    }
  },
  // note 环评批复文号格式为[20XX]XXX 校验
  sevenNumber: {
    regexp: /^[\u4e00-\u9fa5]+环评批复(\[|\【)20[0-9]{2}(\】|\])[0-9]{3}$/,
    validator: (rule, value, callback) => {
      if (value) {
        if (value.match(rule.regexp || Validate.sevenNumber.regexp)) {
          callback();
        } else {
          callback(new Error(rule.message || '请使用正确格式!'));
        }
      }
    }
  },
  // note 日期时间间隔选择字段
  dateTimeDuration: {
    validator: (rule, value, callback) => {
      if (isExistEmpty(value)) return;

      function getTimeSlamp(date) {
        let dateObj = date.match(/(\d{4})-(\d{2})-(\d{2})\s(\d{2})/);
        let year = dateObj[1];
        let month = dateObj[2] - 1;
        let day = dateObj[3];
        let hour = dateObj[4];
        return new Date(year, month, day, hour).getTime();
      }


      function computeRange(range) {
        return getTimeSlamp(range[1]) - getTimeSlamp(range[0]);
      }

      function isOutRange(rangeArr) {
        for (let i = 0; i < rangeArr.length; i++) {
          if (computeRange(rangeArr[i]) >= 12 * 3600 * 1000) {
            return true;
          }
        }
        return false;
      }

      if (!isOutRange(value)) {
        callback();
      } else {
        callback(new Error(rule.message || '请使用正确格式!'));
      }
    }
  },
  dataDurationInNight: {
    validator: (rule, value, callback) => {

      if (isExistEmpty(value)) return;

      let hourRangeOne = [22, 23];
      let hourRangeTwo = [0, 6];
      let outOfHourRange = [7, 21];

      function getDay(date) {
        let dateObj = date.match(/(\d{4})-(\d{2})-(\d{2})\s(\d{2})/);
        let year = dateObj[1];
        let month = dateObj[2] - 1;
        let day = dateObj[3];
        let hour = dateObj[4];
        return {day, hour, month, year};
      }

      function isInSpecialDuration(hour, range) {
        return hour >= range[0] && hour <= range[1];
      }

      function isInNightDuration(item) {

        let result = true;
        let preDay = getDay(item[0]).day;
        let nextDay = getDay(item[1]).day;
        let prevHour = getDay(item[0]).hour;
        let nextHour = getDay(item[1]).hour;

        if (isInSpecialDuration(prevHour, outOfHourRange) || isInSpecialDuration(nextHour, outOfHourRange)) {
          result = false;
          return result;
        }

        if (preDay === nextDay && isInSpecialDuration(prevHour, hourRangeTwo) && isInSpecialDuration(nextHour, hourRangeOne)) {
          result = false;
          return result;
        }
        return result;
      }

      function isFitRangeCondition(arr) {
        return arr.every((item) => {
          return isInNightDuration(item)
        })
      }

      if (isFitRangeCondition(value)) {
        callback();
      } else {
        callback(new Error(rule.message || '请填写正确的格式'))
      }
    }
  },
  // note required
  dateTimeRequired: {
    validator: (rule, value, callback) => {

      if (!isExistEmpty(value)) {
        callback();
      } else {
        callback(new Error(rule.message || '请使用正确格式!'));
      }

    }
  },
  dateTimeOverlap: {
    validator: (rule, value, callback) => {
      if (isExistEmpty(value)) return;

      function isOverlap(rangePrev, rangeNext) {
        let rangePrevStart = getTimeSlamp(rangePrev[0]);
        let rangePrevEnd = getTimeSlamp(rangePrev[1]);
        let rangeNextStart = getTimeSlamp(rangeNext[0]);
        let rangeNextEnd = getTimeSlamp(rangeNext[1]);

        return !(rangePrevStart > rangeNextEnd || rangePrevEnd < rangeNextStart);
      }

      function getTimeSlamp(date) {
        let dateObj = date.match(/(\d{4})-(\d{2})-(\d{2})\s(\d{2})/);
        let year = dateObj[1];
        let month = dateObj[2] - 1;
        let day = dateObj[3];
        let hour = dateObj[4];
        return new Date(year, month, day, hour).getTime();
      }

      function isRangeArrOverlap(rangeArr) {
        for (let i = 0; i < rangeArr.length; i++) {
          let rangePrev = rangeArr[i];
          for (let j = i + 1; j < rangeArr.length; j++) {
            let rangeNext = rangeArr[j];
            if (isOverlap(rangePrev, rangeNext)) {
              return true;
            }
          }
        }
        return false;
      }

      if (!isRangeArrOverlap(value)) {
        callback();
      } else {
        callback(new Error(rule.message || '请使用正确格式!'));
      }

    }
  },
  dataTimeExistInDataRange: {
    validator: (rule, value, callback, realModel) => {
      if (isDateTimeEmpty(value) || isDateEmpty(realModel[rule.dependField])) return;

      function getTimeSlamp(date) {
        let dateObj = date.match(/(\d{4})-(\d{2})-(\d{2})\s(\d{2})/);
        let year = dateObj[1];
        let month = dateObj[2] - 1;
        let day = dateObj[3];
        let hour = dateObj[4];
        return new Date(year, month, day, hour).getTime();
      }

      function isInDataRange(arr, range) {

        let rangeStart = getTimeSlamp(range[0]);
        let rangeEnd = getTimeSlamp(range[1]);

        for (let i = 0; i < arr.length; i++) {

          if (!arr[i][0]) {
            continue;
          }

          let start = getTimeSlamp(arr[i][0]);
          let end = getTimeSlamp(arr[i][1]);
          if (start < rangeStart || end > rangeEnd) {
            return false;
          }

        }

        return true;
      }

      if (!isInDataRange(value, realModel[rule.dependField])) {
        callback(new Error(rule.message || '请使用正确格式!'));
      } else {
        callback();
      }
    }
  },
  dataRangeIncludeDataTime: {
    validator: (rule, value, callback, realModel, validateField) => {


      if (!value || isDateEmpty(value) || isDateTimeEmpty(realModel[rule.affectField])) {
        return;
      }
      validateField(rule.affectField);
      callback();
    }
  },
  dateRangeRequired: {
    validator: (rule, value, callback) => {

      if (!isDateEmpty(value)) {
        callback();
      } else {
        callback(new Error(rule.message || '请使用正确格式!'));
      }

    }
  },
  // 中文校验
  chinese: {
    regexp: /^[\u4e00-\u9fa5]*$/,
    validator: (rule, value, callback) => {
      if (value) {
        if (value.match(rule.regexp || Validate.chinese.regexp)) {
          callback();
        } else {
          callback(new Error(rule.message || '请使用正确格式!'));
        }
      }
    }
  }
};

function isDateTimeEmpty(arr) {

  if (!arr || !arr.length) {
    return true;
  }

  return _.flatten(arr).every((item) => {
    return !item;
  });

}


function isExistEmpty(arr) {

  if (!arr || !arr.length) return true;

  return _.flatten(arr).some((item) => {
    return !item;
  });

}

function isDateEmpty(arr) {

  if (!arr || !arr.length) {
    return true;
  }
  return arr.some((item) => {
    return !item;
  });

}

function getTimeSlamp(date) {
  let dateObj = date.match(/(\d{4})-(\d{2})-(\d{2})\s(\d{2})/);
  let year = dateObj[1];
  let month = dateObj[2] - 1;
  let day = dateObj[3];
  let hour = dateObj[4];
  return new Date(year, month, day, hour).getTime();
}


export default Validate;
