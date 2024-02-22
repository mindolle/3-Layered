export class UserController {
  constructor(userService) {
    this.userService = userService;
  }
}

userSignUp = async (req, res, next) => {
  try {
    const { email, password, checkpassword, name } = req.body;
    const isExistUser = await prisma.users.findFirst({
      where: { email },
    });
    if (isExistUser) {
      return res.status(409).json({ message: "이미 존재하는 이메일입니다." });
    }

    if (password.length < 6) return res.status(409).json({ message: "비밀번호가 너무 짧아요!" });

    if (password !== checkpassword) return res.status(409).json({ message: "비밀번호 확인과 일치하지 않습니다!" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.users.create({
      data: {
        email,
        password: hashedPassword,
        checkpassword: hashedPassword,
        name,
      },
    });
    return res.status(201).json({ message: "회원가입이 완료되었습니다.", email, name });
  } catch (err) {
    next(err);
  }
};
