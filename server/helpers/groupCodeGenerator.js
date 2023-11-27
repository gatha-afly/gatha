import { customAlphabet } from "nanoid";
import { isCodeUnique } from "./groupHelper.js"; // Update the path accordingly

const generateUniqueGroupCode = async () => {
  const generateCustomNanoid = customAlphabet(
    "ACDEFGHIJKLMNOPQRSTUVWXYZ346789"
  );
  let code;

  do {
    code = generateCustomNanoid(8);
  } while (!(await isCodeUnique(code)));

  return code;
};

export default generateUniqueGroupCode;
