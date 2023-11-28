// ripple-worklet.js
try {
  registerPaint(
    "ripple",
    class {
      static get inputProperties() {
        return ["--ripple-x", "--ripple-y", "--ripple-color", "--ripple-time"];
      }
      paint(ctx, geom, properties) {
        const x = parseFloat(properties.get("--ripple-x").toString());
        const y = parseFloat(properties.get("--ripple-y").toString());
        const color = properties.get("--ripple-color").toString();
        const time = parseFloat(properties.get("--ripple-time").toString());

        ctx.fillStyle = color;
        ctx.globalAlpha = Math.max(1 - time, 0);
        ctx.arc(x, y, geom.width * time, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  );
} catch (error) {
  if (err.name !== "DOMException") {
    throw err;
  }
}
