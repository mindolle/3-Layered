import jwt from "jsonwebtoken";
import { prisma } from "../model/index.js";

// 1. 클라이언트로 부터 **쿠키(Cookie)**를 전달받습니다.
// 2. **쿠키(Cookie)**가 **Bearer 토큰** 형식인지 확인합니다.
// 3. 서버에서 발급한 **JWT가 맞는지 검증**합니다.
// 4. JWT의 `userId`를 이용해 사용자를 조회합니다.
// 5. `req.user` 에 조회된 사용자 정보를 할당합니다.
// 6. 다음 미들웨어를 실행합니다.

export default async function (req, res, next) {
  try {
    const { authorization } = req.cookies;
    if (!authorization)
      throw new Error("요청한 사용자의 토큰이 존재하지 않습니다."); // 쿠키 전달 받기

    // authorization "Bearer asdlkaskdmaksd~~~
    const [tokenType, token] = authorization.split(" ");
    if (tokenType !== "Bearer")
      throw new Error("토근 타입이 bearer형식이 아닙니다."); // 쿠키가 Bearer 형식인지 확인하기

    const decodedToken = jwt.verify(token, process.env.JWT_KEY); // 검증
    const userId = decodedToken.userId;

    const user = await prisma.users.findFirst({
      where: { userId: +userId },
    });
    if (!user) throw new Error("토큰 사용자가 존재하지 않습니다."); // JWT의 userId를 이용해 사용자를 조회

    req.user = user; // req.user에 조회된 사용자 정보를 할당

    next(); // 다음 미들웨어를 실행
  } catch (error) {
    if (error.name === "TokenExpiredError")
      return res.status(401).json({ message: "토큰이 만료되었습니다." });
    if (error.name === "JsonWebTokenError")
      return res.status(401).json({ message: "토큰이 조작되었습니다." });

    return res.status(400).json({ message: error.message });
  }
}
