// import { Toast } from 'vant';


const utils =  {
    dateFormat(date) {
        let month = date.getMonth() + 1;
        let day = date.getDate();
        month = month > 10 ? month : '0' + month;
        day = day > 10 ? day : '0' + day;
        
        return date.getFullYear() + '-' + month + '-' + day + ' ' + date.getHours() + ':' + date.getMinutes();
    },
    isPhone(str) {
        let reg = /(13\d|14[579]|15[^4\D]|17[^49\D]|18\d)\d{8}/g;
        return reg.test(str);
    },
    getUrlCode(name) {
        var reg = `(^|&)${name}=([^&]*)(&|$)`;
        var r = window.location.search.substr(1).match(reg);
        if(r != null){
            return unescape(r[2])
        }else{
            return false
        }
    }
}

export default utils;