import Joi from "joi";

export const validP = Joi.object({
  name: Joi.string().required().min(6).messages({
    "any.required": "Ten la truong bat buoc",
    "string.empty": "Ten khong duoc bo trong",
    "string.min": "Ten it nhat 6 ky tu",
  }),
  price: Joi.number().required().messages({
    "any.required": "Gia la truong bat buoc",
    "number.base": "Gia khong phai la chuoi",
  }),
});
