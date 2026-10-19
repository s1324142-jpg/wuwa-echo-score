export type FixedBonusType =
  | "resonanceSkill"
  | "heavyAttack"
  | "normalAttack"
  | "resonanceLiberation"

export type PrimaryStatType = "atk" | "hp" | "def" | "energyRegen"

export type CharacterConfig = {
  id: string
  name: string
  image?: string // キャラクター画像のパス
  primaryStat: PrimaryStatType // 参照ステータス (攻撃/HP/防御)

  scaling: {
    attackPercent?: number
    attackFlat?: number
    hpPercent?: number
    hpFlat?: number
    defPercent?: number
    defFlat?: number
    energyRegen?: number
    critical: number
    criticalDamage: number
  }

  fixedBonuses?: {
    type: FixedBonusType
    multiplier: number
  }[]
}

export const CHARACTERS: CharacterConfig[] = [
  {
    id: "kakaro",
    name: "カカロ",
    image: "/images/IMG_20260124_223038.jpg",
    primaryStat: "atk",
    scaling: {
      critical: 2,
      criticalDamage: 1,
      attackPercent: 1,
      attackFlat: 1
    },
    fixedBonuses: [
      {
        type: "resonanceLiberation",
        multiplier: 0.8
      }
    ]
  },
  {
    id: "anko",
    name: "アンコ",
    image: "/images/anko.jpg",
    primaryStat: "atk",
    scaling: {
      critical: 2,
      criticalDamage: 1,
      attackPercent: 1,
      attackFlat: 1
    },
    fixedBonuses: [
      {
        type: "normalAttack",
        multiplier: 0.5
      }
    ]
  },
  {
    id: "rinyo",
    name: "凌陽",
    image: "/images/rinyo.jpg",
    primaryStat: "atk",
    scaling: {
      critical: 2,
      criticalDamage: 1,
      attackPercent: 1,
      attackFlat: 1
    },
    fixedBonuses: [
      {
        type: "normalAttack",
        multiplier: 0.3
      },
      {
        type: "resonanceSkill",
        multiplier: 0.3
      }
    ]
  },
  {
    id: "kaiseki",
    name: "回折主",
    image: "/images/kaiseki.jpg",
    primaryStat: "atk",
    scaling: {
      critical: 2,
      criticalDamage: 1,
      attackPercent: 1,
      attackFlat: 1
    },
    fixedBonuses: [
      {
        type: "resonanceSkill",
        multiplier: 0.4
      },
      {
        type: "resonanceLiberation",
        multiplier: 0.3
      }
    ]
  },
    {
    id: "syoumetu",
    name: "消滅主",
    image: "/images/syoumetu.jpg",
    primaryStat: "atk",
    scaling: {
      critical: 2,
      criticalDamage: 1,
      attackPercent: 1,
      attackFlat: 1
    },
    fixedBonuses: [
      {
        type: "normalAttack",
        multiplier: 0.3
      },
      {
        type: "resonanceLiberation",
        multiplier: 0.3
      }
    ]
  },
  {
    id: "kidou",
    name: "気動主",
    image: "/images/kidou.jpg",
    primaryStat: "atk",
    scaling: {
      critical: 2,
      criticalDamage: 1,
      attackPercent: 1,
      attackFlat: 1
    },
    fixedBonuses: [
      {
        type: "resonanceSkill",
        multiplier: 0.7
      }
    ]
  },
  {
    id: "aruto",
    name: "アールト",
    image: "/images/aruto.jpg",
    primaryStat: "atk",
    scaling: {
      critical: 2,
      criticalDamage: 1,
      attackPercent: 1,
      attackFlat: 1
    },
    fixedBonuses: [
      {
        type: "normalAttack",
        multiplier: 0.4
      }
    ]
  },
  {
    id: "sika",
    name: "シカ",
    image: "/images/sika.jpg",
    primaryStat: "atk",
    scaling: {
      critical: 2,
      criticalDamage: 1,
      attackPercent: 1,
      attackFlat: 1
    },
    fixedBonuses: [
      {
        type: "resonanceSkill",
        multiplier: 0.5
      },
      {
        type: "resonanceLiberation",
        multiplier: 0.3
      },
    ]
  },
  {
    id: "tankin",
    name: "丹瑾",
    image: "/images/tankin.jpg",
    primaryStat: "atk",
    scaling: {
      critical: 2,
      criticalDamage: 1,
      attackPercent: 1,
      attackFlat: 1
    },
    fixedBonuses: [
      {
        type: "heavyAttack",
        multiplier: 0.4
      },
    ]
  },
  {
    id: "toto",
    name: "灯灯",
    image: "/images/toto.jpg",
    primaryStat: "atk",
    scaling: {
      critical: 2,
      criticalDamage: 1,
      attackPercent: 1,
      attackFlat: 1
    },
    fixedBonuses: [
      {
        type: "normalAttack",
        multiplier: 0.4
      },
    ]
  },
  {
    id: "morutofy",
    name: "モルトフィー",
    image: "/images/morutofy.jpg",
    primaryStat: "atk",
    scaling: {
      critical: 2,
      criticalDamage: 1,
      attackPercent: 1,
      attackFlat: 1
    },
    fixedBonuses: [
      {
        type: "resonanceLiberation",
        multiplier: 0.6
      },
    ]
  },
  {
    id: "sanka",
    name: "散華",
    image: "/images/sanka.jpg",
    primaryStat: "atk",
    scaling: {
      critical: 2,
      criticalDamage: 1,
      attackPercent: 1,
      attackFlat: 1
    },
    fixedBonuses: [
      {
        type: "resonanceSkill",
        multiplier: 0.3
      },
      {
        type: "resonanceLiberation",
        multiplier: 0.3
      }
    ]
  },
  {
    id: "taoki",
    name: "桃折",
    image: "/images/taoki.jpg",
    primaryStat: "def",
    scaling: {
      critical: 2,
      criticalDamage: 1,
      defPercent: 1,
      defFlat: 1
    },
    fixedBonuses: [
      {
        type: "resonanceLiberation",
        multiplier: 0.4
      }
    ]
  },
  {
    id: "jiyan",
    name: "忌炎",
    image: "/images/jiyan.jpg",
    primaryStat: "atk",
    scaling: {
      critical: 2,
      criticalDamage: 1,
      attackPercent: 1,
      attackFlat: 1
    },
    fixedBonuses: [
      {
        type: "heavyAttack",
        multiplier: 0.8
      }
    ]
  },
  {
    id: "jinxi",
    name: "今汐",
    image: "/images/konsi.jpg",
    primaryStat: "atk",
    scaling: {
      critical: 2,
      criticalDamage: 1,
      attackPercent: 1,
      attackFlat: 1
    },
    fixedBonuses: [
      {
        type: "resonanceSkill",
        multiplier: 0.8
      }
    ]
  },
  {
    id: "chori",
    name: "長離",
    image: "/images/chori.jpg",
    primaryStat: "atk",
    scaling: {
      critical: 2,
      criticalDamage: 1,
      attackPercent: 1,
      attackFlat: 1
    },
    fixedBonuses: [
      {
        type: "resonanceSkill",
        multiplier: 0.6
      }
    ]
  },
  {
    id: "souriyou",
    name: "相里要",
    image: "/images/souriyou.jpg",
    primaryStat: "atk",
    scaling: {
      critical: 2,
      criticalDamage: 1,
      attackPercent: 1,
      attackFlat: 1
    },
    fixedBonuses: [
      {
        type: "resonanceLiberation",
        multiplier: 0.6
      }
    ]
  },
  {
    id: "tubaki",
    name: "ツバキ",
    image: "/images/tubaki.jpg",
    primaryStat: "atk",
    scaling: {
      critical: 2,
      criticalDamage: 1,
      attackPercent: 1,
      attackFlat: 1
    },
    fixedBonuses: [
      {
        type: "normalAttack",
        multiplier: 0.6
      }
    ]
  },
  {
    id: "inrin",
    name: "吟霖",
    image: "/images/inrin.jpg",
    primaryStat: "atk",
    scaling: {
      critical: 2,
      criticalDamage: 1,
      attackPercent: 1,
      attackFlat: 1
    },
    fixedBonuses: [
      {
        type: "resonanceSkill",
        multiplier: 0.5
      }
    ]
  },
  {
    id: "orie",
    name: "折枝",
    image: "/images/orie.jpg",
    primaryStat: "atk",
    scaling: {
      critical: 2,
      criticalDamage: 1,
      attackPercent: 1,
      attackFlat: 1
    },
    fixedBonuses: [
      {
        type: "normalAttack",
        multiplier: 0.8
      }
    ]
  },
  {
    id: "karurotta",
    name: "カルロッタ",
    image: "/images/karurotta.jpg",
    primaryStat: "atk",
    scaling: {
      critical: 2,
      criticalDamage: 1,
      attackPercent: 1,
      attackFlat: 1
    },
    fixedBonuses: [
      {
        type: "resonanceSkill",
        multiplier: 0.8
      }
    ]
  },
  {
    id: "rokoko",
    name: "ロココ",
    image: "/images/rokoko.jpg",
    primaryStat: "atk",
    scaling: {
      critical: 2,
      criticalDamage: 1,
      attackPercent: 1,
      attackFlat: 1
    },
    fixedBonuses: [
      {
        type: "heavyAttack",
        multiplier: 0.6
      }
    ]
  },
  {
    id: "fibi",
    name: "フィービー",
    image: "/images/fibi.jpg",
    primaryStat: "atk",
    scaling: {
      critical: 2,
      criticalDamage: 1,
      attackPercent: 1,
      attackFlat: 1
    },
    fixedBonuses: [
      {
        type: "heavyAttack",
        multiplier: 0.4
      }
    ]
  },
  {
    id: "buranto",
    name: "ブラント",
    image: "/images/buranto.jpg",
    primaryStat: "energyRegen",
    scaling: {
      critical: 2,
      criticalDamage: 1,
      energyRegen: 1,
      attackFlat: 1
    },
    fixedBonuses: [
      {
        type: "normalAttack",
        multiplier: 0.7
      }
    ]
  },
  {
    id: "kantarera",
    name: "カンタレラ",
    image: "/images/kantarera.jpg",
    primaryStat: "atk",
    scaling: {
      critical: 2,
      criticalDamage: 1,
      attackPercent: 1,
      attackFlat: 1
    },
    fixedBonuses: [
      {
        type: "normalAttack",
        multiplier: 0.7
      }
    ]
  },
   {
    id: "zannye",
    name: "ザンニー",
    image: "/images/zannye.jpg",
    primaryStat: "atk",
    scaling: {
      critical: 2,
      criticalDamage: 1,
      attackPercent: 1,
      attackFlat: 1
    },
    fixedBonuses: [
      {
        type: "heavyAttack",
        multiplier: 0.7
      }
    ]
  },
  {
    id: "syakonnu",
    name: "シャコンヌ",
    image: "/images/syakonnu.jpg",
    primaryStat: "atk",
    scaling: {
      critical: 2,
      criticalDamage: 1,
      attackPercent: 1,
      attackFlat: 1
    },
    fixedBonuses: [
      {
        type: "resonanceLiberation",
        multiplier: 0.3
      }
    ]
  },
  {
    id: "karutezia",
    name: "カルテジア",
    image: "/images/karutezia.jpg",
    primaryStat: "hp",
    scaling: {
      critical: 2,
      criticalDamage: 1,
      hpPercent: 1,
      hpFlat: 0
    },
    fixedBonuses: [
      {
        type: "resonanceLiberation",
        multiplier: 0.3
      },
      {
        type: "normalAttack",
        multiplier: 0.3
      }
    ]
  },
  {
    id: "rupa",
    name: "ルパ",
    image: "/images/rupa.jpg",
    primaryStat: "atk",
    scaling: {
      critical: 2,
      criticalDamage: 1,
      attackPercent: 1,
      attackFlat: 1
    },
    fixedBonuses: [
      {
        type: "resonanceLiberation",
        multiplier: 0.7
      }
    ]
  },
  {
    id: "hurova",
    name: "フローヴァ",
    image: "/images/hurova.jpg",
    primaryStat: "atk",
    scaling: {
      critical: 2,
      criticalDamage: 1,
      attackPercent: 1,
      attackFlat: 1
    },
    fixedBonuses: [
      {
        type: "resonanceSkill",
        multiplier: 0.5
      }
    ]
  },
  {
    id: "ogasuta",
    name: "オーガスタ",
    image: "/images/ogasuta.jpg",
    primaryStat: "atk",
    scaling: {
      critical: 2,
      criticalDamage: 1,
      attackPercent: 1,
      attackFlat: 1
    },
    fixedBonuses: [
      {
        type: "heavyAttack",
        multiplier: 0.8
      }
    ]
  },
  {
    id: "yuno",
    name: "ユーノ",
    image: "/images/yuno.jpg",
    primaryStat: "atk",
    scaling: {
      critical: 2,
      criticalDamage: 1,
      attackPercent: 1,
      attackFlat: 1
    },
    fixedBonuses: [
      {
        type: "resonanceLiberation",
        multiplier: 0.8
      }
    ]
  },
  {
    id: "garuburena",
    name: "ガルブレーナ",
    image: "/images/garuburena.jpg",
    primaryStat: "atk",
    scaling: {
      critical: 2,
      criticalDamage: 1,
      attackPercent: 1,
      attackFlat: 1
    },
    fixedBonuses: [
      {
        type: "heavyAttack",
        multiplier: 0.3
      }
    ]
  },
  {
    id: "kyuen",
    name: "仇遠",
    image: "/images/kyuen.jpg",
    primaryStat: "atk",
    scaling: {
      critical: 2,
      criticalDamage: 1,
      attackPercent: 1,
      attackFlat: 1
    },
    fixedBonuses: [
      {
        type: "heavyAttack",
        multiplier: 0.6
      }
    ]
  },
  {
    id: "chisa",
    name: "千咲",
    image: "/images/chisa.jpg",
    primaryStat: "atk",
    scaling: {
      critical: 2,
      criticalDamage: 1,
      attackPercent: 1,
      attackFlat: 1
    },
    fixedBonuses: [
      {
        type: "normalAttack",
        multiplier: 0.8
      }
    ]
  },
  {
    id: "rinne",
    name: "リンネー",
    image: "/images/rinne.jpg",
    primaryStat: "atk",
    scaling: {
      critical: 2,
      criticalDamage: 1,
      attackPercent: 1,
      attackFlat: 1
    },
    fixedBonuses: [
      {
        type: "normalAttack",
        multiplier: 0.6
      }
    ]
  },
  {
    id: "eimesu",
    name: "エイメス",
    image: "/images/eimesu.jpg",
    primaryStat: "atk",
    scaling: {
      critical: 2,
      criticalDamage: 1,
      attackPercent: 1,
      attackFlat: 0
    },
    fixedBonuses: [
      {
        type: "resonanceLiberation",
        multiplier: 0.8
      }
    ]
  },
  {
    id: "hiyuki",
    name: "緋雪",
    image: "/images/hiyuki.jpg",
    primaryStat: "atk",
    scaling: {
      critical: 2,
      criticalDamage: 1,
      attackPercent: 1,
      attackFlat: 0
    },
    fixedBonuses: [
      {
        type: "resonanceLiberation",
        multiplier: 0.7
      }
    ]
  },
  {
    id: "sin",
    name: "心",
    image: "/images/sin.jpg",
    primaryStat: "atk",
    scaling: {
      critical: 2,
      criticalDamage: 1,
      attackPercent: 1,
      attackFlat: 1
    },
    fixedBonuses: [
      {
        type: "resonanceSkill",
        multiplier: 0.8
      }
    ]
  },
]
