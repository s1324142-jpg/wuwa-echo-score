"use client"

import { useRef, useState } from "react"
import html2canvas from "html2canvas"
import { CHARACTERS, CharacterConfig } from "../lib/characters"
import { calcEchoScore, calcTotalScore, getRank, getRankColor } from "../lib/score"
import { EchoStats } from "../lib/types"
import { parseAIText } from "../lib/parser"

const emptyEcho: EchoStats = {
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
}

const STAT_LABELS: Record<keyof EchoStats, string> = {
  critical: "クリティカル率",
  criticalDamage: "クリダメ",
  attackPercent: "攻撃%",
  defPercent: "防御%",
  hpPercent: "HP%",
  energyRegen: "共鳴効率",
  attackFlat: "攻撃実数",
  hpFlat: "HP実数",
  defFlat: "防御実数",
  normalAttack: "通常攻撃",
  heavyAttack: "重撃",
  resonanceSkill: "共鳴スキル",
  resonanceLiberation: "共鳴解放"
}

export default function Page() {
  const [characterId, setCharacterId] = useState(CHARACTERS[0].id)
  const [echoes, setEchoes] = useState<EchoStats[]>(
    Array.from({ length: 5 }, () => ({ ...emptyEcho }))
  )
  const [rawText, setRawText] = useState("")
  const [showVideo, setShowVideo] = useState(false)

  const resultRef = useRef<HTMLDivElement>(null)

  const character = CHARACTERS.find(
    c => c.id === characterId
  ) as CharacterConfig

  const updateEcho = (
    index: number,
    key: keyof EchoStats,
    value: number
  ) => {
    const next = [...echoes]
    next[index] = {
      ...next[index],
      [key]: value
    }
    setEchoes(next)
  }

  const handleParse = () => {
    if (!rawText.trim()) return
    const result = parseAIText(rawText)
    setCharacterId(result.characterId)
    setEchoes(result.echoes)
  }

  const downloadImage = async () => {
    if (!resultRef.current) return
    const canvas = await html2canvas(resultRef.current, {
      backgroundColor: "#1e1b4b",
      scale: 2
    })
    const link = document.createElement("a")
    link.href = canvas.toDataURL("image/png")
    link.download = `wuwa_score_${character.name}.png`
    link.click()
  }

  if (!character) return <div>Character not found</div>

  const totalScore = calcTotalScore(echoes, character)
  const totalRank = getRank(totalScore)

  return (
    <main className="p-6 space-y-6 bg-zinc-50 min-h-screen text-black">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-zinc-900 flex items-center gap-3">
            <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
            鳴潮 音骸評価ツール
          </h1>
          <button
            onClick={() => setShowVideo(true)}
            className="flex items-center gap-2 bg-white border border-zinc-200 px-4 py-2 rounded-xl text-sm font-bold text-zinc-700 hover:bg-zinc-50 transition-all shadow-sm active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
            使い方動画
          </button>
        </div>

        <div className="bg-blue-50 border border-blue-100 p-5 rounded-2xl space-y-2">
          <h2 className="font-bold text-blue-900 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            AIテキスト入力の準備
          </h2>
          <p>AIテキスト入力には、公式Discord等で生成されたステータス画像が必要です。</p>
          <p>
            以下のリンクにアクセスし、ステータス画像をアップロードして出力された解析内容をコピー＆ペーストしてください。
          </p>
          <a
            href="https://gemini.google.com/share/ad7b3f4756bf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-blue-600 hover:text-blue-800 underline font-medium transition-colors"
          >
            https://gemini.google.com/share/ad7b3f4756bf
          </a>
        </div>



        {/* AIテキスト貼り付けセクション */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-zinc-800 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              AI出力テキストから一括入力
            </h2>
            <button
              onClick={handleParse}
              className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95 text-sm"
            >
              解析して反映
            </button>
          </div>
          <textarea
            className="w-full h-32 border border-zinc-200 rounded-xl p-4 text-sm bg-zinc-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
            placeholder="ここにAIの出力結果を貼り付けてください（キャラ名: {キャラ名} ... 【音骸1】...）"
            value={rawText}
            onChange={e => setRawText(e.target.value)}
          />
        </section>

        <h2>★手動入力も可能です　　AI入力は数値があっているか確認してください</h2>
        {/* 入力セクション */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200">
          <div className="flex items-center gap-4 mb-8">
            <label className="font-bold text-zinc-700">対象キャラクター：</label>
            <select
              value={characterId}
              onChange={e => setCharacterId(e.target.value)}
              className="border border-zinc-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            >
              {CHARACTERS.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {echoes.map((echo, i) => (
              <div key={i} className="space-y-4 p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                <h3 className="font-bold text-zinc-800 border-b pb-2">音骸 {i + 1}</h3>
                <div className="grid grid-cols-1 gap-x-2 gap-y-1">
                  <Input label="クリティカル率" value={echo.critical} onChange={v => updateEcho(i, "critical", v)} />
                  <Input label="クリティカルダメージ" value={echo.criticalDamage} onChange={v => updateEcho(i, "criticalDamage", v)} />
                  <Input label="攻撃％" value={echo.attackPercent} onChange={v => updateEcho(i, "attackPercent", v)} />
                  <Input label="防御％" value={echo.defPercent} onChange={v => updateEcho(i, "defPercent", v)} />
                  <Input label="HP％" value={echo.hpPercent} onChange={v => updateEcho(i, "hpPercent", v)} />
                  <Input label="共鳴効率" value={echo.energyRegen} onChange={v => updateEcho(i, "energyRegen", v)} />
                  <Input label="攻撃実数" value={echo.attackFlat} onChange={v => updateEcho(i, "attackFlat", v)} />
                  <Input label="HP実数" value={echo.hpFlat} onChange={v => updateEcho(i, "hpFlat", v)} />
                  <Input label="防御実数" value={echo.defFlat} onChange={v => updateEcho(i, "defFlat", v)} />
                  <Input label="通常攻撃" value={echo.normalAttack} onChange={v => updateEcho(i, "normalAttack", v)} />
                  <Input label="重撃" value={echo.heavyAttack} onChange={v => updateEcho(i, "heavyAttack", v)} />
                  <Input label="共鳴スキル" value={echo.resonanceSkill} onChange={v => updateEcho(i, "resonanceSkill", v)} />
                  <Input label="共鳴解放" value={echo.resonanceLiberation} onChange={v => updateEcho(i, "resonanceLiberation", v)} />
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* プレビュー兼画像保存エリア */}
        <div className="flex justify-center">
          <div
            ref={resultRef}
            style={{
              width: "1000px",
              height: "560px",
              backgroundImage: "linear-gradient(135deg, #1e1b4b 0%, #1e1b4b 100%)",
              color: "#ffffff",
              padding: "32px",
              borderRadius: "16px",
              position: "relative",
              overflow: "hidden",
              fontFamily: "sans-serif"
            }}
          >
            {/* 背景の装飾 */}
            <div style={{ position: "absolute", top: "-100px", left: "-100px", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(0,0,0,0) 70%)", pointerEvents: "none" }}></div>

            {/* 上部エリア */}
            <div style={{ display: "flex", gap: "24px", height: "320px", marginBottom: "20px" }}>
              {/* キャラクター画像エリア */}
              <div style={{ flex: "0 0 350px", position: "relative", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                {character.image ? (
                  <img
                    src={character.image}
                    alt={character.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <div style={{ fontSize: "2rem", fontWeight: "bold", opacity: "0.2" }}>{character.name}</div>
                )}
                <div style={{ position: "absolute", bottom: "16px", left: "16px", zIndex: 1, textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>
                  <div style={{ fontSize: "2.5rem", fontWeight: "900" }}>{character.name}</div>
                  <div style={{ fontSize: "1rem", opacity: "0.7" }}>Lv.90 / 共鳴 10</div>
                </div>
              </div>

              {/* ステータスと総合スコア */}
              <div style={{ flex: "1", display: "flex", flexDirection: "column", gap: "16px" }}>
                {/* 簡易ステータス */}
                <div style={{ flex: "1", backgroundColor: "rgba(255,255,255,0.03)", borderRadius: "12px", padding: "20px", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>

                  </div>
                </div>

                {/* 総合スコアパネル */}
                <div style={{ height: "140px", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", padding: "0 32px", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontSize: "1.125rem", color: "#94a3b8", fontWeight: "600" }}>総合スコア</div>
                    <div style={{ fontSize: "1rem", color: "#64748b" }}>音骸スコア計算機</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                    <div style={{ fontSize: "4.5rem", fontWeight: "900", letterSpacing: "-2px" }}>{totalScore.toFixed(1)}</div>
                    <div style={{
                      width: "80px",
                      height: "80px",
                      backgroundColor: getRankColor(totalRank),
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "3rem",
                      fontWeight: "900",
                      color: "#1e1b4b",
                      boxShadow: `0 0 20px ${getRankColor(totalRank)}aa`
                    }}>{totalRank}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 下部カードエリア */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "12px" }}>
              {echoes.map((echo, i) => {
                const score = calcEchoScore(echo, character)
                const rank = getRank(score * 4) // 個別は合計換算でランク付け

                // 0以外のステータスを抽出
                const nonZeroStats = (Object.entries(echo) as [keyof EchoStats, number][])
                  .filter(([_, value]) => value > 0)

                return (
                  <div key={i} style={{ backgroundColor: "rgba(255,255,255,0.03)", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", padding: "12px", display: "flex", flexDirection: "column" }}>
                    <div style={{ fontSize: "0.75rem", color: "#94a3b8", display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                      <span>音骸 {i + 1}</span>
                      <span style={{ color: getRankColor(rank), fontWeight: "bold" }}>{rank}</span>
                    </div>

                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2px" }}>
                      {nonZeroStats.length > 0 ? (
                        nonZeroStats.map(([key, value]) => (
                          <div key={key} style={{ fontSize: "0.7rem", display: "flex", justifyContent: "space-between" }}>
                            <span style={{ opacity: 0.7 }}>{STAT_LABELS[key]}</span>
                            <span>{value.toFixed(1)}{key.toLowerCase().includes("percent") || ["critical", "criticalDamage", "energyRegen", "normalAttack", "heavyAttack", "resonanceSkill", "resonanceLiberation"].includes(key) ? "%" : ""}</span>
                          </div>
                        ))
                      ) : (
                        <div style={{ fontSize: "0.7rem", opacity: 0.3, textAlign: "center", marginTop: "10px" }}>No Stats</div>
                      )}
                    </div>

                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", marginTop: "8px", paddingTop: "8px", textAlign: "right", fontSize: "1rem", fontWeight: "bold" }}>
                      <span style={{ fontSize: "0.7rem", opacity: "0.5", marginRight: "4px" }}>Score</span>
                      {score.toFixed(1)}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="flex justify-center pb-20">
          <button
            onClick={downloadImage}
            className="group relative flex items-center gap-3 bg-zinc-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-zinc-800 transition-all shadow-xl hover:shadow-zinc-300 active:scale-95 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v1M16 8l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            結果を画像として保存
          </button>
        </div>
      </div>
      {/* 使い方動画モーダル */}
      {showVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowVideo(false)}
        >
          <div
            className="bg-zinc-900 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl relative"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-zinc-800">
              <h3 className="text-white font-bold flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
                使い方ガイド動画
              </h3>
              <button
                onClick={() => setShowVideo(false)}
                className="text-white/60 hover:text-white p-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="aspect-video bg-black flex items-center justify-center">
              {/* 動画ファイルがある場合は src="/tutorial.mp4" 等に差し替え */}
              <video
                controls
                autoPlay
                className="w-full h-full"
                poster="/images/konsi.jpg"
              >
                <source src="/tutorial.mp4" type="video/mp4" />
                お使いのブラウザは動画タグをサポートしていません。
              </video>
            </div>
            <div className="p-4 bg-zinc-800 text-white/80 text-sm">
              <p>※動画が表示されない場合は、public/tutorial.mp4 の配置を確認してください。</p>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "8px" }}>
      <span style={{ fontSize: "0.875rem", color: "#cbd5e1" }}>{label}</span>
      <span style={{ fontSize: "1rem", fontWeight: "bold" }}>{value}</span>
    </div>
  )
}

function Input({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <label className="flex flex-col text-xs gap-1">
      <span className="text-zinc-500 font-medium">{label}</span>
      <input
        type="number"
        value={value}
        step="0.1"
        onChange={e => onChange(Number(e.target.value))}
        className="border border-zinc-200 rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm bg-white"
      />
    </label>
  )
}
