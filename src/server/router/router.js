const express = require("express");
const Registro = require("../model/Registro");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const respuesta = await Registro.findAll();
    res.json(respuesta);
  } catch {
    throw new Error("Ha ocurrido un error");
  }
});
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const respuesta = await Registro.findAll({ where: { id } });
    res.json(respuesta);
  } catch {
    throw new Error("Ha ocurrido un error");
  }
});

router.post("/", async (req, res) => {
  try {
    const { nombre, telefono } = req.body;
    const respuesta = await Registro.create({ nombre, telefono });
    res.json(respuesta);
  } catch {
    throw new Error("Ha ocurrido un error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Registro.destroy({ where: { id } });
    res.json("Eliminado correctamente");
  } catch {
    throw new Error("Ha ocurrido un error");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { nombre, telefono } = req.body;
    const { id } = req.params;
    const respuesta = await Registro.update(
      { nombre, telefono },
      {
        where: {
          id: id,
        },
      }
    );
    res.json("Actualizado correctamente");
  } catch {
    throw new Error("Ha ocurrido un error");
  }
});

module.exports = router;
