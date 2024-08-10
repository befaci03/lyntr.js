"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  SendMessage: () => SendMessage,
  continuousSearch: () => continuousSearch,
  findMessages: () => findMessages
});
module.exports = __toCommonJS(src_exports);

// src/functions.ts
var import_axios = __toESM(require("axios"));
async function SendMessage({ token, message, id }) {
  try {
    const response = await import_axios.default.post("https://lyntr.jnnj.xyz/api/comment", {
      id,
      content: message
    }, {
      headers: {
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.7",
        "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundary75Bv3AOwNH7vJFNe",
        "Cookie": `${token}`,
        "Origin": "https://lyntr.jnnj.xyz",
        "Referer": `https://lyntr.jnnj.xyz/?id=${id}`,
        "User-Agent": "lyntr-js bot 0.0.1"
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
  }
}
async function findMessages(token, searchTerm) {
  try {
    const response = await import_axios.default.get("https://lyntr.jnnj.xyz/api/feed", {
      params: { type: "New" },
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.7",
        cookie: `${token}`,
        priority: "u=1, i",
        referer: "https://lyntr.jnnj.xyz/",
        "^sec-ch-ua": "^^Not"
      }
    });
    const foundMessageIds = [];
    for (const lynt of response.data.lynts) {
      if (lynt.content.toLowerCase().includes(searchTerm.toLowerCase()) || lynt.content.toLowerCase().startsWith(searchTerm.toLowerCase())) {
        foundMessageIds.push(lynt.id);
      }
    }
    return foundMessageIds;
  } catch (error) {
    console.error("Error finding messages:", error);
    return [];
  }
}
async function continuousSearch(token, searchTerm) {
  while (true) {
    const messageIds = await findMessages(token, searchTerm);
    console.log("Found message IDs:", messageIds);
    await new Promise((resolve) => setTimeout(resolve, 1e4));
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SendMessage,
  continuousSearch,
  findMessages
});
