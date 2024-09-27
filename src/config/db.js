import mongoose from "mongoose";

export const connectBD = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/WD18408");
    console.log("Ban da ket noi thanh cong");
  } catch (error) {
    console.log(error);
  }
};
