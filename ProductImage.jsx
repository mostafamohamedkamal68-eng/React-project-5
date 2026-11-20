import { useId, useState } from "react";

function getGarmentType(product) {
  const value = String(product.category || "") + " " + String(product.name || "");
  const normalizedValue = value.toLowerCase();
  if (normalizedValue.includes("dress")) return "dress";
  if (normalizedValue.includes("skirt")) return "skirt";
  if (normalizedValue.includes("jumpsuit")) return "jumpsuit";
  if (normalizedValue.includes("short")) return "shorts";
  if (normalizedValue.includes("jean") || normalizedValue.includes("pant") || normalizedValue.includes("chino") || normalizedValue.includes("legging")) return "pants";
  if (normalizedValue.includes("jacket") || normalizedValue.includes("hoodie") || normalizedValue.includes("blazer") || normalizedValue.includes("coat")) return "jacket";
  if (normalizedValue.includes("checkered") || normalizedValue.includes("vertical striped") || normalizedValue.includes("polo")) return "shirt";
  if (normalizedValue.includes("shirt") || normalizedValue.includes("tee") || normalizedValue.includes("loungewear")) return "tshirt";
  return "shirt";
}

export default function ProductImage({ product, className = "product-image" }) {
  const [imageFailed, setImageFailed] = useState(false);
  const safeId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const garmentType = getGarmentType(product);
  const firstColor = product.colors?.[0];
  const garmentColor = typeof firstColor === "string"
    ? firstColor
    : firstColor?.hex || (garmentType === "tshirt" ? "#f0ece3" : "#ad927c");
  const patternId = `garment-pattern-${safeId}`;
  const isCheckered = product.name?.toLowerCase().includes("checkered");
  const isSunriseDesign = product.design === "sunrise";
  const isOrbitDesign = product.design === "orbit";

  if (product.image && !imageFailed) {
    return (
      <img
        className={className}
        src={product.image}
        alt={product.name}
        loading="lazy"
        onError={() => setImageFailed(true)}
      />
    );
  }

  return (
    <div className={`${className} product-artwork`} role="img" aria-label={`${product.name} illustration`}>
      <svg viewBox="0 0 240 260" aria-hidden="true">
        <defs>
          <linearGradient id={`fabric-${safeId}`} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor={garmentColor} />
            <stop offset="1" stopColor="#111" stopOpacity=".16" />
          </linearGradient>
          <pattern id={patternId} width="24" height="24" patternUnits="userSpaceOnUse">
            <rect width="24" height="24" fill={garmentColor} />
            <path d="M0 5h24M0 17h24M6 0v24M18 0v24" stroke="#f2d9d4" strokeOpacity=".75" strokeWidth="4" />
            <path d="M12 0v24M0 12h24" stroke="#f7f1e8" strokeOpacity=".55" strokeWidth="2" />
          </pattern>
          <filter id={`garment-shadow-${safeId}`} x="-30%" y="-20%" width="160%" height="160%">
            <feDropShadow dx="0" dy="9" stdDeviation="8" floodColor="#5d554d" floodOpacity=".2" />
          </filter>
        </defs>
        <g filter={`url(#garment-shadow-${safeId})`} stroke="#222" strokeOpacity=".17" strokeWidth="3" strokeLinejoin="round">
          {garmentType === "dress" ? (
            <>
              <path d="M82 31h76l17 37-21 19 48 126H38L86 87 65 68Z" fill={"url(#fabric-" + safeId + ")"} />
              <path d="M82 31v25q38 20 76 0V31M76 102q44 18 88 0M46 199h148" fill="none" stroke="#f5f1ea" strokeOpacity=".78" strokeWidth="5" />
            </>
          ) : garmentType === "skirt" ? (
            <>
              <path d="M66 48h108l24 160H42Z" fill={"url(#fabric-" + safeId + ")"} />
              <path d="M68 65h104M81 75l-11 119m36-119-4 119m31-119 4 119m25-119 11 119" fill="none" stroke="#f5f1ea" strokeOpacity=".62" strokeWidth="4" />
            </>
          ) : garmentType === "jumpsuit" ? (
            <>
              <path d="M78 29h84l21 43-19 29 18 122h-47l-16-96-16 96H56l18-122-19-29Z" fill={"url(#fabric-" + safeId + ")"} />
              <path d="M81 38v42q39 17 78 0V38M76 102h88M120 102v25m-34 3h27m16 0h27" fill="none" stroke="#f5f1ea" strokeOpacity=".74" strokeWidth="5" />
            </>
          ) : garmentType === "pants" ? (
            <>
              <path d="M55 30h130l13 75-30 126h-47l-3-109-10 109H61L42 105Z" fill={`url(#fabric-${safeId})`} />
              <path d="M58 47h124M120 34v87M72 66v26M169 66v26" fill="none" stroke="#fff" strokeOpacity=".4" strokeWidth="4" />
            </>
          ) : garmentType === "shorts" ? (
            <>
              <path d="M52 32h136l9 103-32 93h-45l-3-77-11 77H65l-32-93Z" fill={`url(#fabric-${safeId})`} />
              <path d="M54 49h132M120 35v115M69 72l35 5m64-5-35 5" fill="none" stroke="#fff" strokeOpacity=".42" strokeWidth="4" />
            </>
          ) : garmentType === "tshirt" ? (
            <>
              <path d="m81 34 39 17 39-17 43 22 32 58-39 18-19-34v134H64V98l-19 34-39-18 32-58Z" fill={`url(#fabric-${safeId})`} />
              <path d="M102 42q18 24 36 0M64 232h112M64 98l19 9m74-9-19 9" fill="none" stroke="#f5f1ea" strokeOpacity=".82" strokeWidth="5" />
              {isSunriseDesign ? (
                <g stroke="none">
                  <circle cx="120" cy="126" r="25" fill="#d98059" />
                  <path d="M93 142q13-18 27 0t27 0" fill="none" stroke="#344d3b" strokeWidth="4" strokeLinecap="round" />
                  <path d="M96 151q12-14 24 0t24 0" fill="none" stroke="#778c70" strokeWidth="3" strokeLinecap="round" />
                  <path d="M105 103v-8m15 6v-10m15 12v-8" stroke="#d98059" strokeWidth="2" strokeLinecap="round" />
                  <text x="120" y="170" fill="#344d3b" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="700" letterSpacing="2" textAnchor="middle">NAWA</text>
                  <text x="120" y="181" fill="#5b6557" fontFamily="Arial, sans-serif" fontSize="5.5" letterSpacing="1" textAnchor="middle">GROW AT YOUR PACE</text>
                </g>
              ) : isOrbitDesign ? (
                <g stroke="none">
                  <circle cx="120" cy="129" r="28" fill="none" stroke="#344d3b" strokeWidth="3" />
                  <ellipse cx="120" cy="129" rx="42" ry="15" fill="none" stroke="#d98059" strokeWidth="2.5" transform="rotate(-28 120 129)" />
                  <circle cx="150" cy="111" r="5" fill="#d98059" />
                  <path d="m120 111 4 10 10 4-10 4-4 10-4-10-10-4 10-4Z" fill="#778c70" />
                  <text x="120" y="174" fill="#344d3b" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="700" letterSpacing="2" textAnchor="middle">ORBIT</text>
                  <text x="120" y="185" fill="#5b6557" fontFamily="Arial, sans-serif" fontSize="5.5" letterSpacing="1" textAnchor="middle">FIND YOUR WAY</text>
                </g>
              ) : (
                <>
                  <rect x="83" y="91" width="74" height="78" rx="3" fill="#f5f0e5" stroke="#214f9a" strokeWidth="6" />
                  <rect x="90" y="98" width="60" height="51" fill="none" stroke="#214f9a" strokeWidth="3" />
                  <path d="m95 142 12-19 11 12 8-10 16 17Z" fill="#214f9a" />
                  <circle cx="119" cy="111" r="5" fill="#214f9a" />
                  <text x="120" y="163" fill="#214f9a" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="700" textAnchor="middle">URBAN</text>
                </>
              )}
            </>
          ) : (
            <>
              <path d="m78 34 42 18 42-18 47 24 27 68-39 17-16-36v122H59V107l-16 36-39-17 27-68Z" fill={isCheckered ? `url(#${patternId})` : `url(#fabric-${safeId})`} />
              <path d="m78 34 42 30 42-30m-42 30v165m-15-157 15 20 15-20" fill="none" stroke="#f5f1ea" strokeOpacity=".82" strokeWidth="5" />
              <path d="M75 125h25v34H75zm65 0h25v34h-25z" fill="#111" fillOpacity=".08" stroke="#f5f1ea" strokeOpacity=".5" strokeWidth="3" />
              {garmentType === "jacket" && <path d="m95 65 25 24 25-24M61 202h118" fill="none" stroke="#f5f1ea" strokeOpacity=".7" strokeWidth="4" />}
              {!isCheckered && [94, 112, 130, 148].map((y) => <circle key={y} cx="120" cy={y} r="2.8" fill="#f5f1ea" stroke="none" />)}
            </>
          )}
        </g>
      </svg>
    </div>
  );
}
