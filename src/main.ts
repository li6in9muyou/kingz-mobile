import "./global.css";
import App from "./App.svelte";

var app = new App({
  target: document.body,
});
localStorage.setItem("debug", "*");
export default app;
