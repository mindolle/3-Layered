export class ResumesService {
  constructor(resumesRepository) {
    this.resumesRepository = resumesRepository;
  }

  // 생성
  createResume = async (userId, title, content) => {
    const status = "APPLY";
    const resume = await this.resumesRepository.createResume(userId, title, content, status);
    const Statuses = ["APPLY", "DROP", "PASS", "INTERVIEW1", "INTERVIEW2", "FINAL_PASS"];
    if (!Statuses.includes(status)) {
      throw new Error("이력서 상태가 이상합니다.");
    }
    return resume;
  };

  // 수정
  updateResume = async (resumeId, title, content, status) => {
    const resume = await this.resumesRepository.getResumeById(resumeId);
    if (!resume) {
      throw new Error("해당 이력서를 찾을 수 없습니다.");
    }
    const updatedResume = await this.resumesRepository.updateResume(resumeId, title, content, status);
    return { message: "업데이트에 성공하였습니다." };
  };

  // 삭제
  deleteResume = async (resumeId, userId, permission) => {
    const resume = await this.resumesRepository.getResumeById(resumeId);
    if (!resume) {
      throw new Error("해당 이력서를 찾을 수 없습니다.");
    }

    // permission 이건 머지?!
    const deletedResume = await this.resumesRepository.deleteResume(resumeId, userId, permission);
    return { message: "삭제 성공" };
  };

  // -------------------------------------------------------------------------------------------

  // 조회
  getResumes = async (orderKey, orderValue) => {
    let orderBy = {};
    if (orderBy) {
      orderBy[orderKey] = orderValue && orderValue.toUpperCase() === "ASC" ? "asc" : "desc";
    } else {
      orderBy = { createdAt: "desc" };
    }
    const resumes = await this.resumesRepository.getResumes(orderBy);
    return resumes;
  };

  // 상세 조회
  getResumeById = async (resumeId) => {
    const resume = await this.resumesRepository.getResumeById(resumeId);
    if (!resume) {
      throw new Error("해당 이력서를 찾을 수 없습니다.");
    }
    return resume;
  };
}
