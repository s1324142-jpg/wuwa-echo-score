import { EchoStats } from "./types"
import { CharacterConfig } from "./characters"

export function calcEchoScore(
    stats: EchoStats,
    character: CharacterConfig
): number {
    const s = character.scaling

    // 参照ステータス（攻撃/HP/防御）に応じたスコア計算
    let mainStatScore = 0
    if (character.primaryStat === "hp") {
        const weightPercent = s.hpPercent ?? s.attackPercent ?? 0
        const weightFlat = s.hpFlat ?? s.attackFlat ?? 0
        mainStatScore = stats.hpPercent * weightPercent + (stats.hpFlat / 10) * weightFlat
    } else if (character.primaryStat === "def") {
        const weightPercent = s.defPercent ?? s.attackPercent ?? 0
        const weightFlat = s.defFlat ?? s.attackFlat ?? 0
        mainStatScore = stats.defPercent * weightPercent + (stats.defFlat / 10) * weightFlat
    } else if (character.primaryStat === "energyRegen") {
        const weight = s.energyRegen ?? 0
        mainStatScore = stats.energyRegen * weight
    } else {
        // デフォルトは攻撃
        const weightPercent = s.attackPercent ?? 0
        const weightFlat = s.attackFlat ?? 0
        mainStatScore = stats.attackPercent * weightPercent + (stats.attackFlat / 10) * weightFlat
    }

    let score =
        stats.critical * s.critical +
        stats.criticalDamage * s.criticalDamage +
        mainStatScore

    // 固定値（キャラ依存のダメージアップ）
    if (character.fixedBonuses && character.fixedBonuses.length > 0) {
        character.fixedBonuses.forEach(bonus => {
            let base = 0
            switch (bonus.type) {
                case "resonanceSkill":
                    base = stats.resonanceSkill
                    break
                case "heavyAttack":
                    base = stats.heavyAttack
                    break
                case "normalAttack":
                    base = stats.normalAttack
                    break
                case "resonanceLiberation":
                    base = stats.resonanceLiberation
                    break
            }
            score += base * bonus.multiplier
        })
    }

    return Math.round(score * 10) / 10
}


export function calcTotalScore(
    echoes: EchoStats[],
    character: CharacterConfig
): number {
    const total = echoes.reduce(
        (sum, echo) => sum + calcEchoScore(echo, character),
        0
    )
    return Math.round(total * 10) / 10
}

export type Rank = "SS" | "S" | "A" | "B" | "C"

export function getRank(score: number): Rank {
    if (score >= 200) return "SS"
    if (score >= 180) return "S"
    if (score >= 150) return "A"
    if (score >= 120) return "B"
    return "C"
}

export function getRankColor(rank: Rank): string {
    switch (rank) {
        case "SS": return "#fbbf24" // gold
        case "S": return "#a855f7"  // purple
        case "A": return "#3b82f6"  // blue
        case "B": return "#10b981"  // green
        case "C": return "#94a3b8"  // gray
    }
}
