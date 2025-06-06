(function () {
  function hexToRgb(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3)
      hex = hex
        .split('')
        .map((c) => c + c)
        .join('');
    const num = parseInt(hex, 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
  }

  function parseColor(value) {
    if (!value) return null;
    value = value.trim().toLowerCase();
    if (value.startsWith('#')) return hexToRgb(value);
    const match = value.match(/rgba?\(([^)]+)\)/);
    if (match) {
      return match[1]
        .split(',')
        .map((v) => parseFloat(v.trim()))
        .slice(0, 3);
    }
    return null;
  }

  function getBrightness([r, g, b]) {
    return (r * 299 + g * 587 + b * 114) / 1000;
  }

  function needsInversion(rgb) {
    if (!rgb) return false;
    const brightness = getBrightness(rgb);

    return brightness > 200 || brightness < 70;
  }

  function invertColor([r, g, b]) {
    return `rgb(${255 - r}, ${255 - g}, ${255 - b})`;
  }

  const colorProps = [
    'color',
    'background',
    'background-color',
    'border',
    'border-color',
    'border-top-color',
    'border-right-color',
    'border-bottom-color',
    'border-left-color',
    'outline-color',
    'text-shadow',
    'box-shadow',
  ];

  const colorRegex = /#(?:[0-9a-f]{3}){1,2}\b|rgba?\([^)]+\)/gi;

  function processStyleObject(style) {
    for (const prop of style) {
      if (
        !colorProps.includes(prop) &&
        !prop.includes('color') &&
        !prop.includes('shadow')
      )
        continue;

      const original = style.getPropertyValue(prop);
      const priority = style.getPropertyPriority(prop);
      if (!original || typeof original !== 'string') continue;

      const newValue = original.replace(colorRegex, (match) => {
        const rgb = parseColor(match);
        return needsInversion(rgb) ? invertColor(rgb) : match;
      });

      if (original !== newValue) {
        style.setProperty(prop, newValue, priority);
      }
    }
  }

  function processStyleSheets() {
    for (const sheet of document.styleSheets) {
      let rules;
      try {
        rules = sheet.cssRules;
      } catch (e) {
        continue;
      }
      if (!rules) continue;

      for (const rule of rules) {
        if (rule.type === CSSRule.STYLE_RULE && rule.style) {
          processStyleObject(rule.style);
        }

        if (rule.cssRules) {
          for (const subRule of rule.cssRules) {
            if (subRule.style) processStyleObject(subRule.style);
          }
        }
      }
    }
  }

  function processInlineStyles() {
    for (const el of document.querySelectorAll('[style]')) {
      processStyleObject(el.style);
    }
  }

  processStyleSheets();
  processInlineStyles();

  document.documentElement.style.visibility = 'visible';
})();
