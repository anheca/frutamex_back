const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const path = require("path");

/* 
   Inicializaciones
   --------------------------
 */

// Inicializamos nuestra app
const app = express();

/* 
   Settings
   --------------------------
 */
app.set("port", process.env.PORT || 5000);
// establece el directorio de views
app.set("views", path.join(__dirname, "views"));
// config handlebars
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: require("./lib/handlebars"),
  })
);
app.set("view engine", ".hbs");

/* 
   Middleware
   --------------------------
 */
app.use(morgan("dev"));
// configuramos urlencoded para indicar que permita que me envien solo textos o archivos planos
app.use(express.urlencoded({ extended: false }));
// configuramos express para que pueda ejecutar lectura o parse de archivos json
app.use(express.json());

/* 
   Global Variables
   --------------------------
*/
app.use((req, res, next) => {
  next();
});

/* 
   Rutas
   --------------------------
 */
app.use(require("./routes/index.js"));
app.use(require("./routes/authentication.js"));
app.use("/links", require("./routes/links.js"));

/* 
   Public
   --------------------------
*/
app.use(express.static(path.join(__dirname, "public")));

/* 
   Starting Server
   --------------------------
 */

app.listen(app.get("port"), () => {
  console.log("Server on port:", app.get("port"));
});
