import express from "express";
import { prisma } from "../model/index.js";
import jwt from "jsonwebtoken";
// import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// 사용자 회원가입 API
router.post("/sign-up", async (req, res, next) => {
  try {
    const { email, password, checkpassword, name } = req.body;
    const isExistUser = await prisma.users.findFirst({
      where: { email },
    });
    if (isExistUser) {
      return res.status(409).json({ message: "이미 존재하는 이메일입니다." });
    }

    if (password.length < 6)
      return res.status(409).json({ message: "비밀번호가 너무 짧아요!" });

    if (password !== checkpassword)
      return res
        .status(409)
        .json({ message: "비밀번호 확인과 일치하지 않습니다!" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.users.create({
      data: {
        email,
        password: hashedPassword,
        checkpassword: hashedPassword,
        name,
      },
    });
    return res
      .status(201)
      .json({ message: "회원가입이 완료되었습니다.", email, name });
  } catch (err) {
    next(err);
  }
});

// 로그인 API
router.post("/sign-in", async (req, res, next) => {
  const { email, password } = req.body;

  const user = await prisma.users.findFirst({ where: { email } });

  if (!user)
    return res.status(401).json({ message: "존재하지 않는 이메일입니다." });
  if (!(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
  // 엑서스 토큰 생성!!
  const token = jwt.sign({ userId: user.userId }, process.env.JWT_KEY, {
    expiresIn: "12h",
  }); // 만두
  // 리프레시 토큰 생성!!
  const retoken = jwt.sign({ userId: user.userId }, process.env.REF_KEY, {
    expiresIn: "7d",
  });
  // 엑서스 토큰 반환
  res.cookie("authorization", `Bearer ${token}`);
  // 리프레시 토큰 반환
  res.cookie("refreshToken", `Bearer ${retoken}`);
  return res.status(200).json({ message: "로그인에 성공하였습니다." });
});

// 사용자 조회 API
router.get("/me", authMiddleware, async (req, res) => {
  const users = req.user;

  return res.json({
    email: users.email,
    name: users.name,
  });
});
export default router;
