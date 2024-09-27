import Product from "../models/product";
import { validP } from "../validate/validProduct";
import jwt from "jsonwebtoken";

export const createP = async (req, res) => {
  try {
    // Laay thong tin token tu nguoi dung gui len
    let token = "";
    const headerauth = req.headers.authrization;
    if (headerauth) {
      // lay token tu chuoi Bearer .... la chuoi ma nguoi dung gui kem header
      const tokensplit = headerauth.split("");
      if (tokensplit.length > 1) {
        token = tokensplit[1];
      }
    }
    const checkToken = jwt.verify(token, "123456");
    const { error } = validP.validate(req.body, { abortEarly: true });
    if (error) {
      const errorMessage = error.details.map((message) => message.message);
      res.status(400).json(errorMessage);
    }
    const data = await Product(req.body).save();
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
  }
};

export const getAllP = async (req, res) => {
  try {
    const data = await Product.find();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

export const getPById = async (req, res) => {
  try {
    const data = await Product.findById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

export const updateP = async (req, res) => {
  try {
    const data = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

export const removeP = async (req, res) => {
  try {
    const data = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      data,
      message: "Delete success",
    });
  } catch (error) {
    console.log(error);
  }
};
