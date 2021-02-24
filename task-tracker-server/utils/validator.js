/**
 *    Date: 24 Feburary 2020
 *    Description: Util file for validation params
 *    Version: 1.0
 *    Author: Vaibhav Ganju
 */
const params = [
  {
    param_key: "id",
    required: false,
    type: "string",
    validator_functions: [],
  },
  {
    param_key: "title",
    required: true,
    type: "string",
    validator_functions: [],
  },
  {
    param_key: "description",
    required: true,
    type: "string",
    validator_functions: [
      (param) => {
        return param.length < 30;
      },
    ],
  },
  {
    param_key: "dueDate",
    required: true,
    type: "string",
    validator_functions: [],
  },
  {
    param_key: "priority",
    required: true,
    type: "string",
    validator_functions: [],
  },
  {
    param_key: "status",
    required: true,
    type: "string",
    validator_functions: [],
  },
];

module.exports = {
  params: params,
};
