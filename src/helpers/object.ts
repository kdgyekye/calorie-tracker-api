"use strict";

import _ from "lodash"

export function __flattenObj(obj: any|object, parent?: string, res: any|object = {}): object{
  for(let key in obj){
    let propName: string = parent ? parent + "." + key : key;
    if(typeof obj[key] == "object"){
      __flattenObj(obj[key], propName, res);
    } else {
      res[propName] = obj[key];
    }
  }
  return res;
}

export function __unflattenObj(obj: any|object): object {
  let res = {}
  for (var i in obj) {
    let keys = i.split('.')
    keys.reduce(function(r:any, e, j) {
      return r[e] || (r[e] = isNaN(Number(keys[j + 1])) ? (keys.length - 1 == j ? obj[i] : {}) : [])
    }, res)
  }
  return res
}

export function isObject(item: any): boolean {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

export function __mergeObj(target: any|object = {}, ...sources: any|object[]): object {
  if(!sources.length) return target;
  const source = sources.shift();
  if(isObject(target) && isObject(source)) {
    for(let key in source) {
      if(isObject(source[key])) {
        if(!target[key]) {
          target[key] = source[key];
        }
        else {
          target[key] = __mergeObj(target[key], source[key]);
        }
      }
      else {
        target[key] = _.uniq([source[key], target[key]]).join(" ").trim();
      }
    }
  }
  return __mergeObj(target, ...sources)
}

export default {
  __flattenObj,
  __unflattenObj,
  __mergeObj,
}