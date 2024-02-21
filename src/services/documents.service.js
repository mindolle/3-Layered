import { DocRepository } from "../repositories/documents.repository.js";

export class DocService {
  DocRepository = new DocRepository();

  findAllResume = async () => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const resumes = await this.DocRepository.findAllResume();

    // 호출한 이력서들을 가장 최신 게시글 부터 정렬합니다.
    resumes.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return resumes.map((resume) => {
      return {
        resumeId: resume.resumeId,
        title: resume.title,
        content: resume.content,
        status: resume.status,
        createdAt: resume.createdAt,
        updatedAt: resume.updatedAt,
      };
    });
  };

  findResumeById = async (resumeId) => {
    // 저장소(Repository)에게 특정 이력서 하나를 요청합니다.
    const resume = await this.DocRepository.findResumeById(resumeId);

    return {
      resumeId: resume.resumeId,
      title: resume.title,
      content: resume.content,
      status: resume.status,
      createdAt: resume.createdAt,
      updatedAt: resume.updatedAt,
    };
  };

  // --------------------------------------------------------------------

  createResume = async (userId, title, content, status) => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const createResume = await this.DocRepository.createResume(userId, title, content, status);

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return {
      userId: createResume.userId,
      title: createResume.title,
      content: createResume.content,
      status: createResume.status,
    };
  };

  updateResume = async (userId, resumeId, title, content, status) => {
    // 저장소(Repository)에게 특정 게시글 하나를 요청합니다.
    const resume = await this.DocRepository.findResumeById(resumeId);
    if (!resume) throw new Error("존재하지 않는 이력서입니다.");

    // 저장소(Repository)에게 데이터 수정을 요청합니다.
    await this.DocRepository.updateResume(userId, title, content, status);

    // 변경된 데이터를 조회합니다.
    const updatedResume = await this.DocRepository.findResumeById(resumeId);

    return {
      userId: updatedResume.userId,
      title: updatedResume.title,
      content: updatedResume.content,
      status: updatedResume.status,
    };
  };

  deleteResume = async (resumeId, userId) => {
    // 저장소(Repository)에게 특정 이력서 하나를 요청합니다.
    const resume = await this.DocRepository.findResumeById(resumeId);
    if (!resume) throw new Error("존재하지 않는 이력서입니다.");

    if (userId !== resume.userId) throw new Error("작성자만 삭제 가능함");

    // 저장소(Repository)에게 데이터 삭제를 요청합니다.
    await this.DocRepository.deleteResume(resumeId, userId);

    return {
      userId: resume.userId,
      resumeId: resume.resumeId, // 맞나?
      title: resume.title,
      content: resume.content,
      status: resume.status,
      createdAt: resume.createdAt,
      updatedAt: resume.updatedAt,
    };
  };
}
