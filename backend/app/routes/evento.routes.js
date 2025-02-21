module.exports = (app) => {
    const eventos = require("../controllers/evento.controller.js");
    const router = require("express").Router();

    router.post("/", eventos.create);
    router.get("/", eventos.findAll);
    router.get("/:id", eventos.findOne);
    router.put("/:id", eventos.update);
    router.delete("/:id", eventos.delete);

    app.use("/api/eventos", router);
};
