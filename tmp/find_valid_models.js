async function run() {
  const key = "AIzaSyAYcS_AqeKPh6jvI0aRfuaotWcEID872bw";
  try {
    const result = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
    const data = await result.json();
    const models = data.models || [];
    const valid = models
      .filter(m => m.supportedGenerationMethods.includes("generateContent"))
      .map(m => m.name.replace("models/", ""));
    console.log("Valid models for generateContent:");
    console.log(valid.join("\n"));
  } catch (e) {
    console.error(e);
  }
}
run();
