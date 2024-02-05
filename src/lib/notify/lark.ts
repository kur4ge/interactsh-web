/* eslint-disable no-bitwise */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
import format from "date-fns/format"

const COLOR_LIST = [
  'blue', 'wathet', 'turquoise', 'green', 'yellow', 'orange', 'red',
  'carmine', 'violet', 'purple', 'indigo', 'grey', 'default'
]

function crc32(input: string): number {
  const crcTable: number[] = [];
  const poly = 0xedb88320;

  for (let i = 0; i < 256; i++) {
    let crc = i;
    for (let j = 0; j < 8; j++) {
      crc = (crc & 1 ? (crc >>> 1) ^ poly : crc >>> 1);
    }
    crcTable[i] = crc >>> 0;
  }

  let crc = 0xffffffff;
  for (let i = 0; i < input.length; i++) {
    const byte = input.charCodeAt(i) & 0xff;
    crc = (crc >>> 8) ^ crcTable[(crc ^ byte) & 0xff];
  }

  return (crc ^ 0xffffffff) >>> 0;
}

function processLarkData(item: any): string {
  const color = COLOR_LIST[crc32(item['unique-id']) % COLOR_LIST.length]
  return JSON.stringify(
    {
      msg_type: "interactive",
      card: {
        config: {
          "wide_screen_mode": true
        },
        elements: [
          {
            tag: "markdown",
            content: `🤩 Received **${item.protocol.toUpperCase()}** interaction from **[${item['remote-address']}](https://ipinfo.io/${item['remote-address']})**`
          },
          {
            tag: "hr"
          },
          {
            tag: "div",
            fields: [
              {
                is_short: true,
                text: {
                  tag: "plain_text",
                  content: item['raw-request']
                }
              }
            ]
          },
          {
            tag: "note",
            elements: [
              {
                tag: "img",
                img_key: "img_v3_027p_aa8e432c-27d9-4302-9fc9-fc5408a988bg",
                alt: {
                  tag: "plain_text",
                  content: "Interactsh"
                }
              },
              {
                tag: "plain_text",
                content: `${item['full-id']} at ${format(new Date(item.timestamp), "yyyy-MM-dd hh:mm:ss")}`
              }
            ]
          }
        ],
        header: {
          template: color,
          title: {
            content: `[${item.protocol.toUpperCase()}] ${item['unique-id']}`,
            tag: "plain_text"
          }
        }
      }
    }
  )
}

export default processLarkData;
