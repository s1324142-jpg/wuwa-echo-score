import { EchoStats } from "./types"
import { CHARACTERS } from "./characters"

const getValue = (block: string, label: string): number => {
    const m = block.match(new RegExp(`${label}:\\s*([0-9.]+)`))
    return m ? Number(m[1]) : 0
}

export function parseAIText(text: string): {
    characterId: string
    echoes: EchoStats[]
} {
    const charMatch = text.match(/キャラ名:\s*(.+)/)
    const charName = charMatch?.[1]?.trim() ?? ""

    const character =
        CHARACTERS.find(c => c.name === charName) ?? CHARACTERS[0]

    const blocks = text.split(/【音骸[1-5]】/).slice(1)

    const echoes: EchoStats[] = blocks.map(block => ({
        critical: getValue(block, "クリティカル率"),
        criticalDamage: getValue(block, "クリティカルダメージ"),
        attackPercent: getValue(block, "攻撃％"),
        defPercent: getValue(block, "防御％"),
        hpPercent: getValue(block, "HP％"),
        energyRegen: getValue(block, "共鳴効率"),

        attackFlat: getValue(block, "攻撃実数"),
        hpFlat: getValue(block, "HP実数"),
        defFlat: getValue(block, "防御実数"),

        normalAttack: getValue(block, "通常攻撃"),
        heavyAttack: getValue(block, "重撃"),
        resonanceSkill: getValue(block, "共鳴スキル"),
        resonanceLiberation: getValue(block, "共鳴解放")
    }))

    while (echoes.length < 5) {
        echoes.push({
            critical: 0,
            criticalDamage: 0,
            attackPercent: 0,
            defPercent: 0,
            hpPercent: 0,
            energyRegen: 0,
            attackFlat: 0,
            hpFlat: 0,
            defFlat: 0,
            normalAttack: 0,
            heavyAttack: 0,
            resonanceSkill: 0,
            resonanceLiberation: 0
        })
    }

    return {
        characterId: character.id,
        echoes: echoes.slice(0, 5)
    }
}

