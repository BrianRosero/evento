module.exports = (app) => {
    const invitados = require("../controllers/invitado.controller.js");
    const router = require("express").Router();

    router.post("/", invitados.create);
    router.get("/", invitados.findAll);
    router.get("/:id", invitados.findOne);
    router.put("/:id", invitados.update);
    router.delete("/:id", invitados.delete);

    app.use("/api/invitados", router);
};
