const starfield = document.querySelector("[data-starfield]");
const isSmallScreen = window.matchMedia("(max-width: 560px)").matches;
const starCount = isSmallScreen ? 36 : 64;
const snowflakeCount = isSmallScreen ? 18 : 32;

for (let index = 0; index < starCount; index += 1) {
  const star = document.createElement("span");
  star.className = "falling-star";
  star.style.setProperty("--star-left", `${Math.random() * 100}%`);
  star.style.setProperty("--star-static-top", `${Math.random() * 100}%`);
  star.style.setProperty("--star-delay", `${-Math.random() * 18}s`);
  star.style.setProperty("--star-duration", `${12 + Math.random() * 12}s`);
  star.style.setProperty("--star-drift", `${Math.random() * 70 - 35}px`);
  starfield.append(star);
}

for (let index = 0; index < snowflakeCount; index += 1) {
  const snowflake = document.createElement("span");
  snowflake.className = "falling-snowflake";
  snowflake.textContent = "❄";
  snowflake.setAttribute("aria-hidden", "true");
  snowflake.style.setProperty("--snow-left", `${Math.random() * 100}%`);
  snowflake.style.setProperty("--snow-static-top", `${Math.random() * 100}%`);
  snowflake.style.setProperty("--snow-size", `${8 + Math.random() * 8}px`);
  snowflake.style.setProperty("--snow-delay", `${-Math.random() * 22}s`);
  snowflake.style.setProperty("--snow-duration", `${16 + Math.random() * 14}s`);
  snowflake.style.setProperty("--snow-drift", `${Math.random() * 90 - 45}px`);
  starfield.append(snowflake);
}
