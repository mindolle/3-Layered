export class UserRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
}

// 조회
getUser = async (email) => {
  const user = await prisma.users.findFirst({
    where: { email },
  });

  return user;
};

// 생성
createUser = async (email, hashedPassword, name) => {
  const user = await this.prisma.users.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  return user;
};
