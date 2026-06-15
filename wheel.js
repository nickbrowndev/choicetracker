const polarToCartesian = (cx, cy, r, angleInDegrees) => {
  const rad = (angleInDegrees * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad)
  };
};

const getCirclePoint = (cx, cy, r, angleInDegrees) => {
  const rad = (angleInDegrees * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
};

function drawExplodedWheel(elementId, items) {

  const wheelEl = document.getElementById(elementId);

  wheelEl.querySelectorAll('.menu-item').forEach(el => el.remove());

  const totalSlices = items.length;
  const sliceAngle = 360 / totalSlices;
  
  // Dimensions
  const cx = 100, cy = 100;
  const outerRadius = 85;
  const innerRadius = 40;
  const gapWidth = -5; // ➔ The CONSTANT gap width in pixels!

  items.forEach((item, index) => {
    const startAngle = index * sliceAngle;
    const endAngle = (index + 1) * sliceAngle;

    // 1. Get base geometric corner points (without gaps)
    const os = getCirclePoint(cx, cy, outerRadius, startAngle);
    const oe = getCirclePoint(cx, cy, outerRadius, endAngle);
    const is = getCirclePoint(cx, cy, innerRadius, startAngle);
    const ie = getCirclePoint(cx, cy, innerRadius, endAngle);

    // 2. Calculate offset vector for the START edge line
    const startRad = (startAngle * Math.PI) / 180;
    // Perpendicular vector shifts the line right/clockwise
    const startOffsetX = Math.sin(startRad) * (gapWidth / 2);
    const startOffsetY = -Math.cos(startRad) * (gapWidth / 2);

    // 3. Calculate offset vector for the END edge line
    const endRad = (endAngle * Math.PI) / 180;
    // Perpendicular vector shifts the line left/counter-clockwise
    const endOffsetX = -Math.sin(endRad) * (gapWidth / 2);
    const endOffsetY = Math.cos(endRad) * (gapWidth / 2);

    // 4. Apply offsets to create perfectly parallel channels
    const p1 = { x: is.x + startOffsetX, y: is.y + startOffsetY }; // Inner Start
    const p2 = { x: os.x + startOffsetX, y: os.y + startOffsetY }; // Outer Start
    const p3 = { x: oe.x + endOffsetX,   y: oe.y + endOffsetY };   // Outer End
    const p4 = { x: ie.x + endOffsetX,   y: ie.y + endOffsetY };   // Inner End

    const largeArcFlag = sliceAngle > 180 ? 1 : 0;

    // 5. Construct the path using our parallel shifted vectors
    const pathData = `
      M ${p1.x} ${p1.y}
      L ${p2.x} ${p2.y}
      A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${p3.x} ${p3.y}
      L ${p4.x} ${p4.y}
      A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${p1.x} ${p1.y}
      Z
    `;

    // Create SVG path element
    const pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathEl.setAttribute("d", pathData);
    pathEl.setAttribute("class", "category-slice menu-item");
    pathEl.setAttribute("fill", index % 2 === 0 ? "#e0e0e0" : "#d8d8d8");
    wheelEl.appendChild(pathEl);

    // Text Label Placement (Centered in the modified wedge)
    const midAngle = startAngle + (sliceAngle / 2);
    const midRadius = innerRadius + ((outerRadius - innerRadius) / 2);
    const textPos = getCirclePoint(cx, cy, midRadius, midAngle);

    const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textEl.setAttribute("x", textPos.x);
    textEl.setAttribute("y", textPos.y + 4);
    textEl.setAttribute("text-anchor", "middle");
    textEl.setAttribute("class", "wheel-label menu-item");
    textEl.textContent = item.label ? item.label.substring(0,3).toUpperCase() : item;
    wheelEl.appendChild(textEl);
  });
}
