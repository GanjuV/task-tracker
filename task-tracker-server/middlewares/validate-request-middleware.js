/**
 *    Date: 24 Feburary 2020
 *    Description: Middleware to validate params
 *    Version: 1.0
 *    Author: Vaibhav Ganju
 */

const validateParams = function (requestParams) {
  return function (req, res, next) {
    if (checkUnwantedParams(requestParams, req.body)) {
      for (let param of requestParams) {
        if (checkParamPresent(Object.keys(req.body), param)) {
          let reqParam = req.body[param.param_key];
          if (!checkParamType(reqParam, param)) {
            return res.status(400).send({
              result:
                `${param.param_key} is of type ` +
                `${typeof reqParam} but should be ${param.type}`,
            });
          } else {
            if (!runValidators(reqParam, param)) {
              return res.status(400).send({
                result: `Validation failed for ${param.param_key}`,
              });
            }
          }
        } else if (param.required) {
          return res.status(400).send({
            result: `Missing Parameter ${param.param_key}`,
          });
        }
      }
    } else {
      return res.status(400).send({
        result: `Request contains Unwanted Parameter`,
      });
    }
    next();
  };
};

const checkUnwantedParams = (reqParams, body) => {
  const validateParamArry = reqParams.map((obj) => obj.param_key);
  let flag = true;
  for (let param in body) {
    if (!validateParamArry.includes(param)) {
      flag = false;
    }
  }
  return flag;
};

const checkParamPresent = (reqParams, paramObj) => {
  return reqParams.includes(paramObj.param_key);
};

const checkParamType = (reqParam, paramObj) => {
  const reqParamType = typeof reqParam;
  return reqParamType === paramObj.type;
};

const runValidators = (reqParam, paramObj) => {
  for (let validator of paramObj.validator_functions) {
    if (!validator(reqParam)) {
      return false;
    }
  }
  return true;
};

module.exports = {
  validateParams: validateParams,
};
