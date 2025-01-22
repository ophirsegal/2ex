import initApp from "./server"; // החלפה ל-import תקני
import dotenv from "dotenv";

dotenv.config(); // טוען את משתני הסביבה מקובץ .env

const port = process.env.PORT || 3000; // מגדיר ברירת מחדל ל-3000 אם PORT לא מוגדר

(async () => {
  try {
    const app = await initApp(); // ממתין לאתחול האפליקציה
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1); // יציאה מתהליך אם השרת נכשל
  }
})();
