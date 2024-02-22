import express from "express";
import { prisma } from "../model/index.js";
import authMiddleware from "../middlewares/auth.middleware.js";

import { ResumeController } from "../src/controllers/resumeController.js";
import { ResumesService } from "../src/services/resumesService.js";
import { ResumesRepository } from "../src/repositories/resumesRepository.js";

const router = express.Router();

const resumesController = new ResumeController(resumesService);
const resumesService = new ResumesService(resumesRepository);
const resumesRepository = new ResumesRepository(prisma);

// 이력서 생성 API
router.post("/resume", authMiddleware, resumesController.createResume);

//이력서 수정 API
router.put("/resume/:resumeId", authMiddleware, resumesController.updateResume);

//이력서 삭제 API
router.delete("/resume/:resumeId", authMiddleware, resumesController.deleteResume);

/** 이력서 목록 조회 API **/
router.get("/resume", authMiddleware, resumesController.getResumes);

/** 이력서 상세 조회 API **/
router.get("/resume/:resumeId", authMiddleware, resumesController.getResumeById);

export default router;
