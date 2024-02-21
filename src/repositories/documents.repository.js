import { prisma } from "../../model/index.js";

export class DocRepository {
  findAllResume = async () => {
    // ORM인 Prisma에서 Posts 모델의 findMany 메서드를 사용해 데이터를 요청합니다.
    const resumes = await prisma.resume.findMany();

    return resumes;
  };

  findResumeById = async (postId) => {
    // ORM인 Prisma에서 Posts 모델의 findUnique 메서드를 사용해 데이터를 요청합니다.
    const resume = await prisma.resume.findUnique({
      where: { postId: +postId },
    });

    return resume;
  };

  createResume = async (nickname, password, title, content) => {
    // ORM인 Prisma에서 Posts 모델의 create 메서드를 사용해 데이터를 요청합니다.
    const createdresume = await prisma.resume.create({
      data: {
        nickname,
        password,
        title,
        content,
      },
    });

    return createdresume;
  };

  updateResume = async (postId, password, title, content) => {
    // ORM인 Prisma에서 Posts 모델의 update 메서드를 사용해 데이터를 수정합니다.
    const updatedresume = await prisma.resume.update({
      where: {
        postId: +postId,
        password: password,
      },
      data: {
        title,
        content,
      },
    });

    return updatedresume;
  };

  deleteResume = async (postId, password) => {
    // ORM인 Prisma에서 Posts 모델의 delete 메서드를 사용해 데이터를 삭제합니다.
    const deletedResume = await prisma.resume.delete({
      where: {
        postId: +postId,
        password: password,
      },
    });

    return deletedResume;
  };
}
