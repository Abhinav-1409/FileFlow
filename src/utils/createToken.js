import jwt from "jsonwebtoken";
const secretKey = process.env.SECRET_KEY;
const createToken = (user) => {
  const token = jwt.sign(
    { name: user.name, email: user.email, id: user._id },
    secretKey
  );
  return token;
};

export default createToken;
