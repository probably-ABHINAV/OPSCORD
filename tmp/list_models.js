const { GoogleGenerativeAI } = require("@google/generative-ai");

async function run() {
  const genAI = new GoogleGenerativeAI("AIzaSyAYcS_AqeKPh6jvI0aRfuaotWcEID872bw");
  try {
    const result = await fetch("https://generativelanguage.googleapis.com/v1beta/models?key=AIzaSyAYcS_AqeKPh6jvI0aRfuaotWcEID872bw");
    const data = await result.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (e) {
    console.error(e);
  }
}

run();
