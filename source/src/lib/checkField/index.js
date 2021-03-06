import Util from '../common/index.js'
import baseConfig from '../baseConfig/index.js'
var checkField = function() {

}
checkField.prototype = Util

checkField.prototype.isString = function(val) {
    baseConfig.status.errorCode = "60001"
    return Util.paramType(val) === 'String'
}
checkField.prototype.isNumber = function(val) {
    baseConfig.status.errorCode = "60002"
    return Util.paramType(val) === 'Number'
}
checkField.prototype.isBoolean = function(val) {
    baseConfig.status.errorCode = "60003"
    return Util.paramType(val) === 'Boolean'
}
checkField.prototype.isObject = function(val) {
    return this.paramType(val) === 'Object'
}
checkField.prototype.lengthRule = function(val, min, max) {
    if (!this.isNumber(max)) {
        max = Infinity
    }
    var status = true

    if (!(this.isNumber(min) && val.length && val.length > min && val.length < max)) {
        baseConfig.status.errorCode = "60005"
        status = false
    }

    return status
}
checkField.prototype.nimLength = function(val) {

    return this.lengthRule(val, 0)
}
checkField.prototype.length99 = function(val) {
    var lengthStatus = this.lengthRule(val, 0, 99)
    if (!lengthStatus) {
        baseConfig.status.errorCode = "600010"
    }
    return lengthStatus
}
checkField.prototype.length125 = function(val) {
    var lengthStatus = this.lengthRule(val, 0, 125)
    if (!lengthStatus) {
        baseConfig.status.errorCode = "60009"
    }
    return lengthStatus
}
checkField.prototype.length255 = function(val) {
    if (!val) {
        baseConfig.status.errorCode = "600010"
    }
    var lengthStatus = this.lengthRule(val.toString(), 0, 255)
    if (!lengthStatus) {
        baseConfig.status.errorCode = "600010"
    }
    return lengthStatus
}

checkField.prototype.isUrl = function(URL) {
    var str = URL;
    //判断URL地址的正则表达式为:http(s)?://([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?
    //下面的代码中应用了转义字符"\"输出一个字符"/"
    var Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
    var objExp = new RegExp(Expression);
    if (objExp.test(str) == true) {
        return true;
    } else {
        baseConfig.status.errorCode = "60006"
        return false;
    }
}

checkField.prototype.isDebug = function(val) {
    if (this.isNumber(val) && (val === 0 || val === 1 || val === 2)) {
        return true
    }
    return false
}
checkField.prototype.notObject = function(val) {
    return !this.isObject(val)
}

checkField.prototype.notSpecialCharacters = function(val) {
    var patrn = new RegExp("[\\u4E00-\\u9FA5]|[\\uFE30-\\uFFA0]", "gi");
    var reg = /^[$a-zA-Z][a-zA-Z0-9_$]{0,}$/
    if (patrn.test(val) || !reg.test(val)) {
        baseConfig.status.errorCode = "600011"
        return false;
    }
    return true;
}
checkField.prototype.isArrayString = function(val) {
    if (this.paramType(val) === 'Array') {
        for (var i = 0; i < val.length; i++) {
            if (this.paramType(val[i]) !== 'String') {
                baseConfig.status.errorCode = "600013"
                return false
            }
        }
    }
    return true;
}
checkField.prototype.keywords = function(val) {
    var key = baseConfig.keywords
    return key.indexOf(val) > -1 ? false : true
}




export default new checkField()