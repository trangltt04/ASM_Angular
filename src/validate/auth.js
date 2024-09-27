import Joi from "joi";

export const registerSchema = Joi.object({
  username: Joi.string().required().trim().min(3).messages({
    "any.required": "Username la truong bat buoc",
    "string.empty": "Username khong duoc de trong",
    "string.min": "Usename phai co it nhat 3 ky tu",
  }),
  email: Joi.string().required().trim().email().messages({
    "any.required": "Email la truong bat buoc",
    "string.empty": "Email khong duoc de trong",
    "string.email": "Email khong hop le",
  }),
  password: Joi.string().required().trim().messages({
    "any.required": "Password la truong bat buoc",
    "string.empty": "Password khong duoc de trong",
  }),
  confirmPassword: Joi.string()
    .required()
    .trim()
    .valid(Joi.ref("password"))
    .messages({
      "any.required": "ConfirmPassword la truong bat buoc phai nhap",
      "string.empty": "ConfirmPassword k duoc de trong",
      "any.only": "ConfirmPassword phai trung voi password",
    }),
});

export const singinSchema = Joi.object({
  email: Joi.string().required().email().trim().messages({
    "any.required": "Email la truong bat buoc",
    "string.empty": "Email khong duoc de trong",
    "string.email": "Email khong hop le",
    "string.trim": "Email k duoc chua khoang trang",
  }),
  password: Joi.string().required().trim().messages({
    "any.required": "Password la truong bat buoc",
    "string.empty": "Password khong duoc de trong",
    "string.trim": "Password k duoc chua khoang trong",
  }),
});
