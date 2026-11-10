const VERSIONS = [
  { title: "Dede.OS", desc: "Il mio portfolio come sistema operativo: desktop, cartelle, temi segreti.", href: "dede-os.html", icon: "monitor", tag: "Nuovo", color: "#e8a598" },
  { title: "Classic", desc: "La versione classica: pulita, lineare, diretta.", href: "LINK_CLASSIC", icon: "layers", color: "#9fd0e6" },
  { title: "Handmade", desc: "Il primo portfolio, scritto interamente a mano per esercizio.", href: "LINK_HANDMADE", icon: "star", color: "#c3b1e1" }
];
const icons = {
  monitor: '<rect x="3" y="3" width="18" height="13" rx="2"/><path d="M8 21h8m-4-5v5"/>',
  layers: '<path d="m12 3 10 6-10 6L2 9l10-6Zm-10 12 10 6 10-6M2 12l10 6 10-6"/>',
  star: '<path d="m12 3 2.8 5.7 6.3.9-4.6 4.4 1.1 6.3-5.6-3-5.6 3 1.1-6.3L2.9 9.6l6.3-.9L12 3Z"/>'
};
for (const version of VERSIONS) {
  const available = !version.href.startsWith("LINK_");
  const card = document.createElement(available ? "a" : "div");
  card.className = "version";
  card.style.setProperty("--color", version.color);
  if (available) card.href = version.href;
  card.innerHTML = `<span class="icon"><svg aria-hidden="true" viewBox="0 0 24 24">${icons[version.icon]}</svg></span><span class="copy"><span class="title">${version.title}${version.tag ? `<span class="tag">${version.tag}</span>` : ""}</span><span class="desc">${version.desc}</span>${available ? "" : '<span class="pending">Link in arrivo</span>'}</span>${available ? '<span class="arrow" aria-hidden="true">↗</span>' : ""}`;
  document.getElementById("versions").append(card);
}
