/** Extra search keywords (city names etc.) not present in the port names. */
export const PORT_KEYWORDS: Record<string, string> = {
  jebelAli: 'Dubai دبي',
  ambarli: 'Istanbul İstanbul إسطنبول اسطنبول',
  kocaeli: 'İzmit Izmit'
};

export const PORTS = [
  {id: 'ambarli', country: 'tr'},
  {id: 'mersin', country: 'tr'},
  {id: 'izmir', country: 'tr'},
  {id: 'gemlik', country: 'tr'},
  {id: 'aliaga', country: 'tr'},
  {id: 'kocaeli', country: 'tr'},
  {id: 'jebelAli', country: 'ae'},
  {id: 'jeddah', country: 'sa'},
  {id: 'dammam', country: 'sa'},
  {id: 'hamad', country: 'qa'},
  {id: 'shuwaikh', country: 'kw'},
  {id: 'umQasr', country: 'iq'},
  {id: 'aqaba', country: 'jo'},
  {id: 'alexandria', country: 'eg'},
  {id: 'portSaid', country: 'eg'},
  {id: 'hamburg', country: 'de'},
  {id: 'rotterdam', country: 'nl'},
  {id: 'antwerp', country: 'be'},
  {id: 'valencia', country: 'es'},
  {id: 'piraeus', country: 'gr'},
  {id: 'constanta', country: 'ro'},
  {id: 'shanghai', country: 'cn'},
  {id: 'ningbo', country: 'cn'},
  {id: 'singapore', country: 'sg'},
  {id: 'nhavaSheva', country: 'in'}
] as const;

export const CONTAINER_TYPES = [
  {id: 'dc20', name: "20' DC"},
  {id: 'dc40', name: "40' DC"},
  {id: 'hc40', name: "40' HC"},
  {id: 'rf20', name: "20' Reefer"},
  {id: 'rf40', name: "40' Reefer"},
  {id: 'ot', name: 'Open Top'},
  {id: 'fr', name: 'Flat Rack'}
] as const;

/** Schematic (non-geographic) node positions for the route diagram, viewBox 800x380. */
export const NODES: Record<string, {x: number; y: number}> = {
  ambarli: {x: 330, y: 92},
  gemlik: {x: 262, y: 128},
  izmir: {x: 196, y: 172},
  mersin: {x: 372, y: 190},
  hamburg: {x: 120, y: 52},
  alexandria: {x: 270, y: 306},
  jeddah: {x: 470, y: 312},
  umQasr: {x: 560, y: 168},
  jebelAli: {x: 640, y: 262},
  shanghai: {x: 724, y: 84}
};

/** Order matches messages `routes.items`. */
export const ROUTES = [
  {from: 'mersin', to: 'jebelAli'},
  {from: 'ambarli', to: 'jeddah'},
  {from: 'mersin', to: 'umQasr'},
  {from: 'izmir', to: 'hamburg'},
  {from: 'gemlik', to: 'alexandria'},
  {from: 'ambarli', to: 'shanghai'}
] as const;

export function routePath(from: string, to: string, bend: number) {
  const a = NODES[from];
  const b = NODES[to];
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  // perpendicular offset, always bowing "upwards"
  let nx = -dy / len;
  let ny = dx / len;
  if (ny > 0) {
    nx = -nx;
    ny = -ny;
  }
  const cx = mx + nx * len * bend;
  const cy = my + ny * len * bend;
  return `M${a.x} ${a.y} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${b.x} ${b.y}`;
}
