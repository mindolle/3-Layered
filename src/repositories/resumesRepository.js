export class ResumesRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  // 생성
  createResume = async (userId, title, content, status) => {
    const resume = await this.prisma.resumes.create({
      data: {
        userId: +userId,
        title,
        content,
        status,
      },
    });
    return resume;
  };

  //  수정
  // resumeId로 해당 이력서를 찾아낸 뒤 title, content, status를 수정한다
  updateResume = async (resumeId, title, content, status) => {
    const updatedResume = await this.prisma.resumes.update({
      where: { resumeId: +resumeId },
      data: { title, content, status },
    });
    return updatedResume;
  };

  // 삭제
  // 사용자Id와 이력서Id에 맞는 이력서를 삭제. 다른 사람 이력서는 삭제 못함
  deleteResume = async (resumeId, userId) => {
    const deletedResume = await this.prisma.resumes.delete({
      where: {
        resumeId: +resumeId,
        userId: +userId,
      },
    });
    return deletedResume;
  };

  // -------------------------------------------------------------------

  // 조회
  // orderBy로 정렬?
  getResumes = async (orderKey, orderValue) => {
    const resumes = await this.prisma.resumes.findMany({
      orderBy: {
        [orderKey]: orderValue,
      },
    });
    return resumes;
  };

  // 상세 조회
  // 이력서Id로 해당 이력서의 상세 정보를 조회한다.
  getResumeById = async (resumeId) => {
    const user = await this.prisma.resumes.findFirst({
      where: { resumeId: +resumeId },
    });
    return user;
  };
}
