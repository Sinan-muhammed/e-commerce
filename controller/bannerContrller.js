const express = require("express");
const Banner = require("../models/bannermodel");

module.exports = {
  loadbanner: async (req, res) => {
    try {
      const banner = await Banner.find();
      res.render("admin/banner", { banner });
    } catch (error) {
      console.log(error);
    }
  },
  addbannerGet: async (req, res) => {
    try {
      res.render("admin/addbanner");
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
      console.log(error);
    }
  },
  addbannerPost: async (req, res) => {
    try {
      const { title, description, targeturl } = req.body;
      const imageFile = req.file.filename;

      const banner = new Banner({
        title,
        description,
        image: imageFile,
        targeturl,
      });

      await banner.save();

      res.redirect("/admin/banner");
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
      console.log(error);
    }
  },

  deletebanner: async (req, res) => {
    try {
      const _id = req.params.id;

      await Banner.deleteOne({ _id: _id });

      res.status(200).json({ message: "banner deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
      console.log(error);
    }
  },

  editbannerGet: async (req, res) => {
    try {
      const id = req.query.id;
      const data = await Banner.findById(id);

      if (data) {
        res.render(`admin/editbanner`, { data });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
      console.log(error);
    }
  },
  ///
  editbannerPost: async (req, res) => {
    try {
      const _id = req.query.id;
      const { title, description, targeturl } = req.body;
      const imageFile = req.file.filename;

      await Banner.findByIdAndUpdate(
        { _id },
        {
          title,
          description,
          image: imageFile,
          targeturl,
        }
      );

      res.redirect("/admin/banner");
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
      console.log(error);
    }
  },
};
