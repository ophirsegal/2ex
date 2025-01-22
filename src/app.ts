//Ophir Segal 324023894
//Lin Tibi 318232129
import initApp from "./server";
const port = process.env.PORT;

initApp().then((app) => {
  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
});