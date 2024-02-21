import { DocRepository } from "../repositories/documents.repository.js";

export class DocService {
  DocRepository = new DocRepository();

  findAllResume = async () => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const resumes = await this.DocRepository.findAllResume();

    // 호출한 Post들을 가장 최신 게시글 부터 정렬합니다.
    resumes.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return resumes.map((resume) => {
      return {
        postId: post.postId,
        nickname: post.nickname,
        title: post.title,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };
    });
  };

  findResumeById = async (resumeId) => {
    // 저장소(Repository)에게 특정 게시글 하나를 요청합니다.
    const resume = await this.DocRepository.findResumeById(postId);

    return {
      postId: post.postId,
      nickname: post.nickname,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  };

  createResume = async (nickname, password, title, content) => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const createResume = await this.DocRepository.createResume(
      nickname,
      password,
      title,
      content
    );

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return {
      postId: createdPost.postId,
      nickname: createdPost.nickname,
      title: createdPost.title,
      content: createdPost.content,
      createdAt: createdPost.createdAt,
      updatedAt: createdPost.updatedAt,
    };
  };

  updateResume = async (postId, password, title, content) => {
    // 저장소(Repository)에게 특정 게시글 하나를 요청합니다.
    const resume = await this.DocRepository.findResumeById(resumeId);
    if (!resume) throw new Error("존재하지 않는 게시글입니다.");

    // 저장소(Repository)에게 데이터 수정을 요청합니다.
    await this.DocRepository.updateResume(resumeId, password, title, content);

    // 변경된 데이터를 조회합니다.
    const updatedResume = await this.DocRepository.findResumeById(resumeId);

    return {
      postId: updatedPost.postId,
      nickname: updatedPost.nickname,
      title: updatedPost.title,
      content: updatedPost.content,
      createdAt: updatedPost.createdAt,
      updatedAt: updatedPost.updatedAt,
    };
  };

  deleteResume = async (resumeId, password) => {
    // 저장소(Repository)에게 특정 게시글 하나를 요청합니다.
    const resume = await this.DocRepository.findPostById(resumeId);
    if (!resume) throw new Error("존재하지 않는 게시글입니다.");

    // 저장소(Repository)에게 데이터 삭제를 요청합니다.
    await this.DocRepository.deleteResume(resumeId, password);

    return {
      postId: post.postId,
      nickname: post.nickname,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  };
}
