export interface DamageResult {
  damage_detected: boolean
  similarity_score: number
  damage_percentage: number
  damage_count: number
  damage_types: string[]
  severity: string
  message: string
  error?: string
}
