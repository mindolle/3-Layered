import { DocService } from "../services/documents.service.js";

// Post의 컨트롤러(Controller)역할을 하는 클래스
export class DocController {
  DocService = new DocService(); // Post 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.

  getResume = async (req, res, next) => {
    try {
      // 서비스 계층에 구현된 findAllPosts 로직을 실행합니다.
      const resumes = await this.DocService.findAllPosts();

      return res.status(200).json({ data: resumes });
    } catch (err) {
      next(err);
    }
  };

  getResumeById = async (req, res, next) => {
    try {
      const { resumeId } = req.params;

      // 서비스 계층에 구현된 findPostById 로직을 실행합니다.
      const resume = await this.DocService.findResumeById(resumeId);

      return res.status(200).json({ data: resume });
    } catch (err) {
      next(err);
    }
  };

  createResume = async (req, res, next) => {
    try {
      const { nickname, password, title, content } = req.body;

      // 서비스 계층에 구현된 createPost 로직을 실행합니다.
      const createdResume = await this.DocService.createResume(
        nickname,
        password,
        title,
        content
      );

      return res.status(201).json({ data: createdResume });
    } catch (err) {
      next(err);
    }
  };

  updateResume = async (req, res, next) => {
    try {
      const { resumeId } = req.params;
      const { password, title, content } = req.body;

      // 서비스 계층에 구현된 updatePost 로직을 실행합니다.
      const updatedResume = await this.DocService.updateResume(
        postId,
        password,
        title,
        content
      );

      return res.status(200).json({ data: updatedResume });
    } catch (err) {
      next(err);
    }
  };

  deleteResume = async (req, res, next) => {
    try {
      const { resumeId } = req.params;
      const { password } = req.body;

      // 서비스 계층에 구현된 deletePost 로직을 실행합니다.
      const deletedResume = await this.DocService.deleteResume(
        resumeId,
        password
      );

      return res.status(200).json({ data: deletedResume });
    } catch (err) {
      next(err);
    }
  };
}
