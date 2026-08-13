// Datos de partida para migrar UNA VEZ a Firestore (ver migrar.html). Después de migrar,
// el catálogo ya no lee este archivo — la fuente real pasa a ser Firestore.
// Lo dejamos como respaldo/referencia.
// "featured: true" hace que aparezca en la selección destacada del home.
const PRODUCTOS = [
  {
    id: 1,
    name: "Ambre Nocturne",
    gender: "Hombre",
    family: "Amaderado especiado",
    ml: 100,
    available: true,
    featured: true,
    colorA: "#c6a15b",
    colorB: "#e8d6a0",
    tags: ["Cedro", "Vainilla", "Tabaco"],
    description: "Una fragancia envolvente que abre con especias cálidas y desciende hacia un corazón de cedro y ámbar gris, cerrando con un fondo profundo de vainilla y tabaco. Pensada para el atardecer y las noches largas.",
    notes: {
      salida: ["Bergamota", "Pimienta rosa", "Cardamomo"],
      corazon: ["Cedro", "Ámbar gris", "Incienso"],
      fondo: ["Vainilla", "Tabaco", "Almizcle"]
    }
  },
  {
    id: 2,
    name: "Fleur de Soie",
    gender: "Mujer",
    family: "Floral afrutado",
    ml: 100,
    available: true,
    featured: true,
    colorA: "#e8d6a0",
    colorB: "#c6a15b",
    tags: ["Jazmín", "Pera", "Almizcle"],
    description: "Un ramo luminoso de jazmín y azahar sobre un fondo suave de almizcle y sándalo. Fresca, ligera y femenina, ideal para el día a día.",
    notes: {
      salida: ["Pera", "Bergamota", "Mandarina"],
      corazon: ["Jazmín", "Flor de azahar", "Lirio"],
      fondo: ["Almizcle", "Sándalo", "Vainilla"]
    }
  },
  {
    id: 3,
    name: "Santal Infini",
    gender: "Unisex",
    family: "Amaderado ámbar",
    ml: 100,
    available: false,
    featured: true,
    colorA: "#8a7143",
    colorB: "#e8d6a0",
    tags: ["Sándalo", "Bergamota", "Ámbar"],
    description: "Sándalo cremoso envuelto en resinas cálidas y un toque especiado. Una fragancia unisex, suave y persistente, perfecta para cualquier ocasión.",
    notes: {
      salida: ["Bergamota", "Pimienta blanca", "Cardamomo"],
      corazon: ["Sándalo", "Iris", "Incienso"],
      fondo: ["Ámbar", "Almizcle blanco", "Haba tonka"]
    }
  },
  {
    id: 4,
    name: "Cuir & Fumée",
    gender: "Hombre",
    family: "Cuero especiado",
    ml: 100,
    available: true,
    featured: false,
    colorA: "#5c4128",
    colorB: "#c6a15b",
    tags: ["Cuero", "Humo", "Pimienta negra"],
    description: "Cuero curtido y humo de incienso sobre un fondo amaderado profundo. Intensa, misteriosa y con carácter — para quien no pasa desapercibido.",
    notes: {
      salida: ["Pimienta negra", "Enebro", "Bergamota"],
      corazon: ["Cuero", "Incienso", "Cardamomo"],
      fondo: ["Humo", "Vetiver", "Ámbar"]
    }
  },
  {
    id: 5,
    name: "Poudre Dorée",
    gender: "Mujer",
    family: "Floral polvoso",
    ml: 100,
    available: true,
    featured: false,
    colorA: "#d9c290",
    colorB: "#8a7143",
    tags: ["Iris", "Almendra", "Vainilla"],
    description: "Iris polvoso y flor de almendro sobre una base cálida de vainilla y almizcle. Elegante y envolvente, con ese acabado 'segunda piel'.",
    notes: {
      salida: ["Bergamota", "Mandarina", "Pimienta rosa"],
      corazon: ["Iris", "Violeta", "Flor de almendro"],
      fondo: ["Almendra", "Vainilla", "Almizcle"]
    }
  },
  {
    id: 6,
    name: "Vétiver Sauvage",
    gender: "Unisex",
    family: "Amaderado cítrico",
    ml: 100,
    available: true,
    featured: false,
    colorA: "#b8935a",
    colorB: "#f3ead8",
    tags: ["Vetiver", "Cítricos", "Musgo"],
    description: "Vetiver verde y terroso abierto con cítricos frescos, sobre un fondo de musgo y cedro. Natural, vibrante y muy versátil.",
    notes: {
      salida: ["Cítricos", "Bergamota", "Limón"],
      corazon: ["Vetiver", "Geranio", "Salvia"],
      fondo: ["Musgo", "Ámbar", "Cedro"]
    }
  }
];