export class ResumeController {
  constructor(resumesService) {
    this.resumesService = resumesService;
  }

  // 생성
  createResume = async (req, res, next) => {
    const { userId } = req.user;
    const { title, content, status = "APPLY" } = req.body;
    console.log(userId);
    const createdResume = await this.resumesService.createResume(userId, title, content, status);
    return res.status(201).json({ message: "게시글 생성에 성공하였습니다" });
  };

  // 수정
  updateResume = async (req, res, next) => {
    try {
      const { resumeId } = req.params;
      const { title, content, status } = req.body;
      const { userId } = req.user;
      const resume = await this.resumesService.getResumeById(resumeId);
      const updatedResume = await this.resumesService.updateResume(resumeId, title, content, status, userId);
      return res.status(200).json(updatedResume);
    } catch (err) {
      next(err);
    }
  };

  // 삭제
  deleteResume = async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { resumeId } = req.params;
      const resume = await this.resumesService.getResumeById(resumeId);
      const deletedResume = await this.resumesService.deleteResume(resumeId, userId);
      res.status(200).json({ message: "삭제 성공" });
    } catch (err) {
      next(err);
    }
  };

  // ------------------------------------------------------------------------------------------

  // 조회
  getResumes = async (req, res, next) => {
    const { orderKey, orderValue } = req.query;
    const resumes = await this.resumesService.getResumes(orderKey, orderValue);
    return res.status(200).json({ data: resumes });
  };

  // 상세 조회
  getResumeById = async (req, res, next) => {
    const { resumeId } = req.params;
    const resume = await this.resumesService.getResumeById(resumeId);
    return res.status(200).json({ data: resume });
  };
}
