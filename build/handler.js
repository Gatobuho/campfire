"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var express = require("express");
function _interopDefaultLegacy(e) {
  return e && typeof e === "object" && "default" in e ? e : { "default": e };
}
var express__default = /* @__PURE__ */ _interopDefaultLegacy(express);
const app = express__default["default"]();
app.get("/api/hello", (req, res) => {
  res.json({ hello: "world" });
});
const handler = app;
exports.handler = handler;
