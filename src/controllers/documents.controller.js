import { DocService } from "../services/documents.service.js";

// Post의 컨트롤러(Controller)역할을 하는 클래스
export class DocController {
  DocService = new DocService(); // Post 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.

  getResume = async (req, res, next) => {
    try {
      // 서비스 계층에 구현된 findAllResume 로직을 실행합니다.
      const resumes = await this.DocService.findAllResume();

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
      const { userId, title, content, status } = req.body;

      // 서비스 계층에 구현된 createPost 로직을 실행합니다.
      const createdResume = await this.DocService.createResume(userId, title, content, status);

      return res.status(201).json({ data: createdResume });
    } catch (err) {
      next(err);
    }
  };

  updateResume = async (req, res, next) => {
    try {
      const { resumeId } = req.params;
      const { userId, title, content, status } = req.body;

      // 서비스 계층에 구현된 updateResume 로직을 실행합니다.
      const updatedResume = await this.DocService.updateResume(resumeId, userId, title, content, status);

      return res.status(200).json({ data: updatedResume });
    } catch (err) {
      next(err);
    }
  };

  deleteResume = async (req, res, next) => {
    try {
      const { resumeId } = req.params;
      const { userId } = req.user;

      // 서비스 계층에 구현된 deleteResume 로직을 실행합니다.
      const deletedResume = await this.DocService.deleteResume(resumeId);

      return res.status(200).json({ message: "삭제 완료!!" });
    } catch (err) {
      next(err);
    }
  };
}
