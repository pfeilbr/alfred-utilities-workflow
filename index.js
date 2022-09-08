"use strict";
import alfy from "alfy";
import stringOccurrence from "string-occurrence";
import fs from "fs";
import { argv } from "process";
import open from "open";
import clipboardy from "clipboardy";

const openLinks = async (argv) => {
  const result = clipboardy
    .readSync()
    .match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
  if (result && Array.isArray(result)) {
    for (const url of result) {
      await open(url);
    }
  }
};

(async () => {
  // commands to select from
  const items = [
    { title: "open all links on clipboard in browser", arg: "open-links" },
  ];

  if (argv[2] === "command") {
    // run selected command
    const command = argv[3];
    if (command === "open-links") {
      await openLinks(argv);
    }
  } else {
    // show commands to run in alfred
    alfy.output(items);
  }
})();
