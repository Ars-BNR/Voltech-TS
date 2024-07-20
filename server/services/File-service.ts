import { v4 as uuidv4 } from "uuid";
import path from "path";
import { UploadedFile } from "express-fileupload";

class FileService {
  async saveFile(file: UploadedFile): Promise<string | undefined> {
    try {
      const fileName = uuidv4();
      const filePath = path.resolve("img", fileName);
      await file.mv(filePath);
      return fileName;
    } catch (error) {
      console.log(error);
    }
  }
}
export default new FileService();
