function localFileUrl(path) {
  const segments = path.replace(/\\/g, "/").split("/");
  const encoded = segments.map((seg, i) => i === 0 && /^[A-Za-z]:$/.test(seg) ? seg : encodeURIComponent(seg)).join("/");
  return "localfile:///" + encoded;
}
let userFamilies = [];
function fileBase(path) {
  const name = path.replace(/\\/g, "/").split("/").pop() || path;
  return name.replace(/\.[^.]+$/, "");
}
async function registerInDocument(fonts) {
  for (const { family, file } of fonts) {
    const url = `url(${localFileUrl(file)})`;
    const names = family === fileBase(file) ? [family] : [family, fileBase(file)];
    for (const nm of names) {
      try {
        const ff = new FontFace(nm, url);
        await ff.load();
        document.fonts.add(ff);
      } catch {
      }
    }
  }
  userFamilies = fonts.map((f) => f.family);
}
async function loadUserFonts() {
  const fonts = await window.masjavas.getUserFonts().catch(() => []);
  await registerInDocument(fonts);
  return userFamilies;
}
async function importUserFonts() {
  const fonts = await window.masjavas.importFonts().catch(() => []);
  await registerInDocument(fonts);
  return userFamilies;
}
export {
  importUserFonts,
  loadUserFonts
};
