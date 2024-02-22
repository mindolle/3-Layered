import bcrypt from "bcrypt";

export class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
}

// 조회
getUser = async (email) => {};

// 생성
createUser = async (email, password, name) => {
  const isExistUser = await this.userRepository.getUser(email);
  if (isExistUser) {
    throw new Error("이미 존재하는 이메일입니다.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await this.userRepository.createUser(email, hashedPassword, name);

  return user;
};
