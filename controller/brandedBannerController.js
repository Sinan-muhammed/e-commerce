const express = require("express");
const Branded = require("../models/brandedModel");

module.exports = {
  loadBrandedBanner: async (req, res) => {
    try {
      const Brand = await Branded.find();
      res.render("admin/Brandedbanner", { banner: Brand });
    } catch (error) {
      console.log(error);
    }
  },
  addBrandedGet: async (req, res) => {
    try {
      res.render("admin/addBrandedbanner");
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
      console.log(error);
    }
  },
  addBrandedPost: async (req, res) => {
    try {
      const { title, description, targeturl } = req.body;
      const imageFile = req.file.filename;

      const BrandedBanner = new Branded({
        title,
        description,
        image: imageFile,
        targeturl,
      });

      await BrandedBanner.save();

      res.redirect("/admin/branded");
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
      console.log(error);
    }
  },
  deleteBranded: async (req, res) => {
    try {
      const _id = req.params.id;
      await Branded.deleteOne({ _id: _id });

      res.status(200).json({ message: "banner deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
      console.log(error);
    }
  },

  editBrand: async (req, res) => {
    try {
      const id = req.query.id;
      const data = await Branded.findById(id);

      if (data) {
        res.render("admin/editBrandedbanner", { data });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
      console.log(error);
    }
  },
  editBrandpost: async (req, res) => {
    try {
      const id = req.query.id;
      const { title, targeturl, description } = req.body;
      const imageFile = req.file.filename;

      await Branded.findByIdAndUpdate(
        { id },
        {
          title,
          description,
          image: imageFile,
          targeturl,
        }
      );

      res.redirect("/admin/branded");
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
      console.log(error);
    }
  },
};
