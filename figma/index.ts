import { importFromFigma, parseColors } from '@iconify/tools'

const result = await importFromFigma({
  prefix: 'nimiq',
  file: process.env.FIGMA_FILE_ID as string,
  token: process.env.FIGMA_TOKEN as string,
  depth: 2,
  ifModifiedSince: '2021-01-01',
  iconNameForNode: node => node.name.toLocaleLowerCase(),
})

if (result === 'not_modified')
  throw new Error('Figma file not modified since last import')

const iconSet = result.iconSet;

// Check colors in icons
await iconSet.forEach(async (name) => {
    const svg = iconSet.toSVG(name);
    if (!svg) {
        return;
    }

    await parseColors(svg, {
        // Change default color to 'currentColor'
        defaultColor: 'currentColor',

        // Callback to parse each color
        callback: (attr, colorStr) => {
            switch (colorStr.toLowerCase()) {
                case '#2e4454':
                    // Change to currentColor
                    return 'currentColor';

                case 'none':
                    return colorStr;
            }

            // Should not happen
            console.error(`Unexpected ${attr} "${colorStr}" in ${name}`);
            return colorStr;
        },
    });

    // Update icon in icon set
    iconSet.fromSVG(name, svg);
});

await Bun.write('icons.json', JSON.stringify(iconSet.export(), null, 2));
