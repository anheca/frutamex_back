const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hola Mundo");
});

// modulo (EXPORTS)
module.exports = router;
