import { registerSchema, singinSchema } from "../validate/auth";
import User from "../models/auth";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const singup = async (req, res) => {
  // Lấy dư liệu user gửi lên
  // console.log(request.body.username);
  const { username, email, password } = req.body;
  //   //Kiểm tra tính hợp lệ của dữ liệu
  const { error } = registerSchema.validate(req.body, { abortEarly: false });
  // Nếu dữ liệu không hợp lệ thì thông báo lỗi
  if (error) {
    const errorMessage = error.details.map((message) => message.message);
    return res.status(400).json(errorMessage);
  }
  // Kiểm tra xem user đã tồn tại hay chưa
  const existUser = await User.findOne({ email: email });
  if (existUser) {
    return res.status(400).json({ message: "Email đã tồn tại" });
  }
  // Mã hóa mật khẩu
  const hashedPassword = await bcryptjs.hash(password, 10);
  // Lưu thông tin user đăng ký vào DB
  const user = await User({ username, email, password: hashedPassword }).save();
  // Trả về thông báo đăng ký thành công và thông tin đăng ký { không bao gồm password }
  user.password = undefined;
  res.status(201).json({
    message: "Đăng ký thành công",
    data: user,
  });
};
export const singin = async (req, res) => {
  // Nhập dữ liệu từ client gửi lên
  const { email, password } = req.body;
  // Kiểm tra tính hợp lệ của dữ liệu
  const { error } = singinSchema.validate(req.body, { abortEarly: false });
  // Nếu dữ liệu không hợp lệ thì trả về thông báo lỗi
  if (error) {
    const errorMessage = error.details.map((message) => message.message);
    return res.status(400).json(errorMessage);
  }
  // Kiểm tra xem user có tồn tại hay không
  const existUser = await User.findOne({ email: email });
  // Nếu user không tồn tại thì trả về thông báo lỗi
  if (!existUser) {
    return res.status(400).json({ message: "Email không tồn tại" });
  }
  // Kiểm tra mật khẩu có đúng với mật khẩu đã lưu trong bd không
  const validPassword = await bcryptjs.compare(password, existUser.password);
  // Nếu mật khẩu không đúng thì trả về thông báo lỗi
  if (!validPassword) {
    return res.status(400).json({ message: "Mật khẩu không đúng" });
  }

  // Tạo token
  const token = jwt.sign({ id: existUser._id }, "123456", { expiresIn: "3m" });
  res.cookie("token", token, { httpOnly: true });
  // Nếu đúng trả về thông báo đăng nhập thành công và thông tin user đăng nhập
  existUser.password = undefined;
  res.status(200).json({
    message: "Đăng nhập thành công",
    data: existUser,
    token,
  });
};
