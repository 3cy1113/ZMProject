/**
 *@author
 *@date         2018/12/8
 *@Copyright    天源迪科信息技术股份有限公司
 *@Description  注册自定义日期选择禁止的条件
 */
const Options = {
   outOfDateRange: (dependField) => {
     if (!dependField || !dependField.length || !dependField[0]) {
       return (date) => {
         return date && date < Date.now() - 24 * 3600 * 1000;
       }
     }

     function getTime (date) {
       let dateObj = date.match(/(\d{4})-(\d{2})-(\d{2})\s(\d{2})/);
       let year = dateObj[1];
       let month = dateObj[2] - 1;
       let day = dateObj[3];
       let hour = dateObj[4];
       return {
         year,
         month,
         day,
         hour
       }
     }

     function getTimeSlamp({year, month, day, hour}) {
       return new Date(year, month, day, hour).getTime();
     }

     return (date) => {
       let startTime = getTime(dependField[0]);
       let option = {
         year: startTime.year,
         month: startTime.month,
         day: startTime.day,
         hour: '00'
       }
       let  rangeStart = getTimeSlamp(option);
       let rangeEnd = getTimeSlamp(getTime(dependField[1]));

       return date&& (date.valueOf() < rangeStart || date < Date.now() - 24 * 3600 * 1000 || date.valueOf() >rangeEnd)
     }

   }
}
export default Options;
