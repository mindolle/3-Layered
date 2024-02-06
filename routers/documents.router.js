import express from "express";
import { prisma } from "../model/index.js";
// import jwt from "jsonwebtoken";
// import { Prisma } from "@prisma/client";
// import bcrypt from "bcrypt";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// 이력서 생성 API
router.post("/resume", authMiddleware, async (req, res, next) => {
  const { userId } = req.user;
  const { title, content, status = "APPLY" } = req.body;
  const Statuses = [
    "APPLY",
    "DROP",
    "PASS",
    "INTERVIEW1",
    "INTERVIEW2",
    "FINAL_PASS",
  ];
  if (!Statuses.includes(status)) {
    return res.status(409).json({
      message: "이력서 상태가 이상합니다.",
    });
  }
  const resume = await prisma.resume.create({
    data: {
      userId: +userId,
      title,
      content,
      status,
    },
  });
  return res.status(201).json({ data: resume });
});

// - 이력서 제목, 자기소개, 이력서 상태 데이터로 넘겨 이력서 수정을 요청합니다.
// - 수정할 이력서 정보는 본인이 작성한 이력서에 대해서만 수정되어야 합니다.
// - 선택한 이력서가 존재하지 않을 경우, `이력서 조회에 실패하였습니다.` 메시지를 반환합니다.

//이력서 수정 API
router.put("/resume/:resumeId", authMiddleware, async (req, res, next) => {
  const { userId } = req.user;
  const { title, content, status = "APPLY" } = req.body;
  const { resumeId } = req.params;
  const Statuses = [
    "APPLY",
    "DROP",
    "PASS",
    "INTERVIEW1",
    "INTERVIEW2",
    "FINAL_PASS",
  ];
  const resume = await prisma.resume.findUnique({
    where: { resumeId: +resumeId },
  });
  if (!resume)
    return res.status(404).json({
      message: "이력서가 없습니다.",
    });
  if (resume.userId !== userId) {
    return res.status(404).json({
      message: "본인이 작성한 이력서만 수정할 수 있음!",
    });
  }
  if (!Statuses.includes(status)) {
    return res.status(409).json({
      message: "이력서 모양이 이상합니다!.",
    });
  }
  const updatedResume = await prisma.resume.update({
    where: { resumeId: +resumeId },
    data: {
      userId: +userId,
      title,
      content,
      status,
    },
  });
  return res.status(200).json({ data: updatedResume });
});

// - 이력서 ID를 데이터로 넘겨 이력서를 삭제 요청합니다.
// - 본인이 생성한 이력서 데이터만 삭제되어야 합니다.
// - 선택한 이력서가 존재하지 않을 경우, `이력서 조회에 실패하였습니다.` 메시지를 반환합니다.

//이력서 삭제 API
router.delete("/resume/:resumeId", authMiddleware, async (req, res, next) => {
  const { userId } = req.user;
  const { resumeId } = req.params;

  const resume = await prisma.resume.findUnique({
    where: { resumeId: +resumeId },
  });

  if (!resume) {
    return res.status(404).json({
      message: "이력서 조회에 실패하였습니다.",
    });
  }

  if (resume.userId !== userId) {
    return res.status(403).json({
      message: "본인이 작성한 이력서만 삭제할 수 있음!",
    });
  }

  await prisma.resume.delete({
    where: { resumeId: +resumeId },
  });

  return res.status(200).json({ message: "삭제 완료!!!" });
});

// - 이력서 ID, 이력서 제목, 자기소개, 작성자명, 이력서 상태, 작성 날짜 조회하기 (여러건)
//     - 작성자명을 표시하기 위해서는 이력서 테이블과 사용자 테이블의 JOIN이 필요합니다.

/** 이력서 목록 조회 API **/
router.get("/resume", authMiddleware, async (req, res, next) => {
  //   const { userId } = req.user;
  const { orderKey, orderValue } = req.query;
  let orderBy = {};
  if (orderKey) {
    orderBy[orderKey] =
      orderValue && orderValue.toUpperCase() === "ASC" ? "asc" : "desc";
  } else {
    orderBy = { createdAt: "desc" };
  }

  const resume = await prisma.resume.findMany({
    // where: { userId: +userId },
    select: {
      resumeId: true,
      userId: true,
      title: true,
      content: true,
      status: true,
      createdAt: true,
      updatedAt: true,

      users: {
        select: {
          name: true,
        },
      },
    },
    orderBy,
  });

  return res.status(200).json({ data: resume });
});

/** 이력서 상세 조회 API **/
router.get("/resume/:resumeId", authMiddleware, async (req, res, next) => {
  const { resumeId } = req.params;

  const resume = await prisma.resume.findFirst({
    where: { resumeId: +resumeId },
    select: {
      resumeId: true,
      //   userId: true,
      title: true,
      content: true,
      status: true,
      createdAt: true,
      updatedAt: true,

      users: {
        select: {
          name: true,
        },
      },
    },
  });

  return res.status(200).json({ data: resume });
});

export default router;
