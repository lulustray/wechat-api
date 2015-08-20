var util = require('./util');
var wrapper = util.wrapper;
var postJSON = util.postJSON;
var path = require('path');
var fs = require('fs');
var formstream = require('formstream');



/**
 * 创建会话
 * 详细请看：http://mp.weixin.qq.com/wiki/9/6fff6f191ef92c126b043ada035cc935.html
 *
 * Examples:
 * ```
 * api.createKfSession('openid', 'test@test', '我要接入', callback);
 * ```
 *
 * Callback:
 *
 * - `err`, 调用失败时得到的异常
 * - `result`, 调用正常时得到的对象
 *
 * Result:
 * ```
 * {
 *  "errcode" : 0,
 *  "errmsg" : "ok",
 * }
 * ```
 * @param {String} openid 客户openid
 * @param {String} account 完整客服账号，格式为：账号前缀@公众号微信号
 * @param {String} text 附加信息，文本会展示在客服人员的多客服客户端
 * @param {Function} callback 回调函数
 */
exports.createKfSession = function (openid,account,text,callback) {
  this.preRequest(this._createKfSession, arguments);
};

/*!
 * 创建会话的未封装版本
 */
exports._createKfSession = function (openid, account, text, callback) {
  // https://api.weixin.qq.com/customservice/kfsession/create?access_token=ACCESS_TOKEN
  var prefix = 'https://api.weixin.qq.com/';
  var url = prefix + 'customservice/kfsession/create?access_token=' + this.token.accessToken;
  var data = {
    "kf_account": account,
    "openid": openid,
    "text": text,
  };

  this.request(url, postJSON(data), wrapper(callback));
};

/**
 * 关闭会话
 * 详细请看：http://mp.weixin.qq.com/wiki/9/6fff6f191ef92c126b043ada035cc935.html
 *
 * Examples:
 * ```
 * api.closeKfSession('openid', 'test@test', '服务端关闭', callback);
 * ```
 *
 * Callback:
 *
 * - `err`, 调用失败时得到的异常
 * - `result`, 调用正常时得到的对象
 *
 * Result:
 * ```
 * {
 *  "errcode" : 0,
 *  "errmsg" : "ok",
 * }
 * ```
 * @param {String} openid 客户openid
 * @param {String} account 完整客服账号，格式为：账号前缀@公众号微信号
 * @param {String} text 附加信息，文本会展示在客服人员的多客服客户端
 * @param {Function} callback 回调函数
 */
exports.closeKfSession = function (openid,account,text,callback) {
  this.preRequest(this._closeKfSession, arguments);
};

/*!
 * 关闭会话的未封装版本
 */
exports._closeKfSession = function (openid, account, text, callback) {
  // https://api.weixin.qq.com/customservice/kfsession/close?access_token=ACCESS_TOKEN
  var prefix = 'https://api.weixin.qq.com/';
  var url = prefix + 'customservice/kfsession/close?access_token=' + this.token.accessToken;
  var data = {
    "kf_account": account,
    "openid": openid,
    "text": text,
  };

  this.request(url, postJSON(data), wrapper(callback));
};

/**
 * 获取客户的会话状态
 * 详细请看：http://mp.weixin.qq.com/wiki/9/6fff6f191ef92c126b043ada035cc935.html
 *
 * Examples:
 * ```
 * api.getKfSession('openid', callback);
 * ```
 *
 * Callback:
 *
 * - `err`, 调用失败时得到的异常
 * - `result`, 调用正常时得到的对象
 *
 * Result:
 * ```
 * {
 *  "createtime" : 123456789,
 *  "errcode" : 0,
 *  "errmsg" : "ok",
 *  "kf_account" : "test1@test"
 * }
 * ```
 * @param {String} openid 客户openid
 * @param {Function} callback 回调函数
 */
exports.getKfSession = function (openid, callback) {
  this.preRequest(this._getKfSession, arguments);
};

/*!
 * 获取客户的会话状态的未封装版本
 */
exports._getKfSession = function (openid, callback) {
  // https://api.weixin.qq.com/customservice/kfsession/getsession?access_token=ACCESS_TOKEN&openid=OPENID
  var prefix = 'https://api.weixin.qq.com/';
  var url = prefix + 'customservice/kfsession/getsession?access_token=' + this.token.accessToken + '&openid=' + openid;

  this.request(url, {dataType: 'json'}, wrapper(callback));
};

/**
 * 获取客服的会话列表
 * 详细请看：http://mp.weixin.qq.com/wiki/9/6fff6f191ef92c126b043ada035cc935.html
 *
 * Examples:
 * ```
 * api.getKfSessionList('openid', callback);
 * ```
 *
 * Callback:
 *
 * - `err`, 调用失败时得到的异常
 * - `result`, 调用正常时得到的对象
 *
 * Result:
 * ```
 * {
 *  "sessionlist" : [
 *      {
 *         "createtime" : 123456789,
 *         "openid" : "OPENID"
 *      },
 *      {
 *         "createtime" : 123456789,
 *         "openid" : "OPENID"
 *      }
 *   ]
 * }
 * ```
 * @param {String} account 完整客服账号
 * @param {Function} callback 回调函数
 */
exports.getKfSessionList = function (account, callback) {
  this.preRequest(this._getKfSession, arguments);
};

/*!
 * 获取客服的会话列表的未封装版本
 */
exports._getKfSessionList = function (account, callback) {
  // https://api.weixin.qq.com/customservice/kfsession/getsessionlist?access_token=ACCESS_TOKEN&kf_account=KFACCOUNT
  var prefix = 'https://api.weixin.qq.com/';
  var url = prefix + 'customservice/kfsession/getsessionlist?access_token=' + this.token.accessToken + '&kf_account=' + account;

  this.request(url, {dataType: 'json'}, wrapper(callback));
};

/**
 * 获取未接入会话列表
 * 详细请看：http://mp.weixin.qq.com/wiki/9/6fff6f191ef92c126b043ada035cc935.html
 *
 * Examples:
 * ```
 * api.getKfSessionWaitcase(callback);
 * ```
 *
 * Callback:
 *
 * - `err`, 调用失败时得到的异常
 * - `result`, 调用正常时得到的对象
 *
 * Result:
 * ```
 * {
 *  "sessionlist" : [
 *      {
 *         "createtime" : 123456789,
 *         "openid" : "OPENID"
 *      },
 *      {
 *         "createtime" : 123456789,
 *         "openid" : "OPENID"
 *      }
 *   ]
 * }
 * ```
 * @param {Function} callback 回调函数
 */
exports.getKfSessionWaitcase = function (callback) {
  this.preRequest(this._getKfSessionWaitcase, arguments);
};

/*!
 * 获取未接入会话列表的未封装版本
 */
exports._getKfSessionWaitcase = function (callback) {
  // https://api.weixin.qq.com/customservice/kfsession/getwaitcase?access_token=ACCESS_TOKEN
  var prefix = 'https://api.weixin.qq.com/';
  var url = prefix + 'customservice/kfsession/getwaitcase?access_token=' + this.token.accessToken;

  this.request(url, {dataType: 'json'}, wrapper(callback));
};

