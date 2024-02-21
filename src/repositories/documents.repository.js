import { prisma } from "../../model/index.js";

export class DocRepository {
  findAllResume = async () => {
    // ORM인 Prisma에서 Resume 모델의 findMany 메서드를 사용해 데이터를 요청합니다.
    const resumes = await prisma.resume.findMany();

    return resumes;
  };

  findResumeById = async (resumeId) => {
    // ORM인 Prisma에서 Resume 모델의 findUnique 메서드를 사용해 데이터를 요청합니다.
    const resume = await prisma.resume.findUnique({
      where: { resumeId: +resumeId },
    });

    return resume;
  };

  // ------------------------------------------------------------------------

  createResume = async (userId, title, content, status) => {
    // ORM인 Prisma에서 Resume 모델의 create 메서드를 사용해 데이터를 요청합니다.
    const createdresume = await prisma.resume.create({
      data: {
        userId,
        title,
        content,
        status,
      },
    });

    return createdresume;
  };

  updateResume = async (resumeId, title, content, status) => {
    // ORM인 Prisma에서 Resume 모델의 update 메서드를 사용해 데이터를 수정합니다.
    const updatedresume = await prisma.resume.update({
      where: {
        resumeId: +resumeId,
      },
      data: {
        userId,
        title,
        content,
        status,
      },
    });

    return updatedresume;
  };

  deleteResume = async (ResumeId) => {
    // ORM인 Prisma에서 Resume 모델의 delete 메서드를 사용해 데이터를 삭제합니다.
    const deletedResume = await prisma.resume.delete({
      where: {
        ResumeId: +ResumeId,
      },
    });

    return deletedResume;
  };

  // ----------------------------------------------------------------

  getResumes = async (orderBy) => {
    return await prisma.resume.findMany({
      select: {
        resumeId: true,
        userId: true,
        title: true,
        content: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy,
    });
  };

  getResumeById = async (resumeId) => {
    return await prisma.resume.findFirst({
      where: { resumeId: +resumeId },
      select: {
        resumeId: true,
        title: true,
        content: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  };
}
