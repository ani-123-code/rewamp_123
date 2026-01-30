// Predefined chemistry scores based on Flownetics validated data
export interface ChemistryScore {
  name: string;
  score: number;
  aliases?: string[]; // Alternative names or spellings
}

// Chemistry scores mapping
export const CHEMISTRY_SCORES: ChemistryScore[] = [
  { name: 'Nitration', score: 8 },
  { name: 'Diazotization', score: 8.5, aliases: ['Diazotisation', 'Diazotisation reaction'] },
  { name: 'Condensation', score: 9 },
  { name: 'Cyclization', score: 9, aliases: ['Cyclalization', 'Cyclisation', 'Ring closure'] },
  { name: 'Decarboxylation', score: 9 },
  { name: 'Hydrogenation', score: 6 },
  { name: 'Reductive amination', score: 8.5, aliases: ['Reductive Amination', 'Reductive alkylation'] },
  { name: 'Esterification', score: 7, aliases: ['Esterfication', 'Ester formation'] },
  { name: 'Friedel-Crafts alkylation', score: 1, aliases: ['FC alkylation', 'Friedel Crafts alkylation', 'F-C alkylation'] },
  { name: 'Grignard reaction', score: 5, aliases: ['Grignard', 'Grignard addition', 'Grignard reagent'] },
  { name: 'n-Butyl lithium', score: 5, aliases: ['n-Butyllithium', 'Butyl lithium', 'nBuLi', 'n-BuLi'] },
  { name: 'Cyclopropanation', score: 8, aliases: ['Cyclopropanisation', 'Cyclopropane formation'] },
  { name: 'Diels-Alder reaction', score: 2, aliases: ['Diels Alder', 'Diels-Alder', 'Diels Alder reaction', 'DA reaction'] },
  { name: 'High temperature', score: 8, aliases: ['High temp', 'High temp reaction', 'Elevated temperature'] },
  { name: 'Chlorination', score: 5 },
  { name: 'Fluorination', score: 2, aliases: ['Flurination', 'Fluorination reaction'] },
  { name: 'Epoxidation', score: 1 },
  { name: 'N-oxide formation', score: 8, aliases: ['N-oxide', 'N oxide formation', 'Nitrogen oxide'] },
  { name: 'Vilsmeier-Haack', score: 9, aliases: ['Vilsmler hack', 'Vilsmeier Haack', 'Vilsmeier-Haack reaction', 'Vilsmeier reaction'] },
  { name: 'Iodination', score: 7 },
  { name: 'Oxidation reaction using H2O2', score: 6, aliases: ['H2O2 oxidation', 'Hydrogen peroxide oxidation', 'Peroxide oxidation'] },
  { name: 'Aminolysis', score: 6 },
  { name: 'Dean-Stark reaction', score: 0, aliases: ['Dean startk reactions', 'Dean Stark', 'Dean-Stark', 'Azeotropic water removal'] },
  { name: 'Reaction with fast settling solids', score: 0, aliases: ['Fast settling solids', 'Fast settling solid', 'Reaction with solids', 'Solid settling'] },
];

/**
 * Normalizes a chemistry name for comparison
 */
function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s]/g, '') // Remove special characters
    .replace(/\s+/g, ' ') // Normalize whitespace
    .replace(/\breaction\b/gi, '') // Remove "reaction" word
    .replace(/\breactions\b/gi, '')
    .trim();
}

/**
 * Calculates similarity between two strings using Levenshtein distance
 */
function calculateSimilarity(str1: string, str2: string): number {
  const s1 = normalizeName(str1);
  const s2 = normalizeName(str2);
  
  if (s1 === s2) return 1;
  
  const longer = s1.length > s2.length ? s1 : s2;
  const shorter = s1.length > s2.length ? s2 : s1;
  
  if (longer.length === 0) return 1;
  
  const distance = levenshteinDistance(s1, s2);
  return 1 - distance / longer.length;
}

/**
 * Calculates Levenshtein distance between two strings
 */
function levenshteinDistance(str1: string, str2: string): number {
  const matrix: number[][] = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}

/**
 * Finds exact or similar match for a chemistry name
 */
export function findChemistryScore(input: string): { score: number; matchedName: string; confidence: 'exact' | 'high' | 'medium' | 'low' | 'none' } | null {
  const normalizedInput = normalizeName(input);
  
  // First, try exact match
  for (const chem of CHEMISTRY_SCORES) {
    const normalized = normalizeName(chem.name);
    if (normalized === normalizedInput || normalized.includes(normalizedInput) || normalizedInput.includes(normalized)) {
      return {
        score: chem.score,
        matchedName: chem.name,
        confidence: 'exact'
      };
    }
    
    // Check aliases
    if (chem.aliases) {
      for (const alias of chem.aliases) {
        const normalizedAlias = normalizeName(alias);
        if (normalizedAlias === normalizedInput || normalizedAlias.includes(normalizedInput) || normalizedInput.includes(normalizedAlias)) {
          return {
            score: chem.score,
            matchedName: chem.name,
            confidence: 'exact'
          };
        }
      }
    }
  }
  
  // If no exact match, try fuzzy matching
  let bestMatch: { chemistry: ChemistryScore; similarity: number } | null = null;
  
  for (const chem of CHEMISTRY_SCORES) {
    const similarity = calculateSimilarity(input, chem.name);
    
    if (!bestMatch || similarity > bestMatch.similarity) {
      bestMatch = { chemistry: chem, similarity };
    }
    
    // Check aliases
    if (chem.aliases) {
      for (const alias of chem.aliases) {
        const similarity = calculateSimilarity(input, alias);
        if (!bestMatch || similarity > bestMatch.similarity) {
          bestMatch = { chemistry: chem, similarity };
        }
      }
    }
  }
  
  if (bestMatch && bestMatch.similarity > 0.6) {
    const confidence = bestMatch.similarity > 0.85 ? 'high' : bestMatch.similarity > 0.75 ? 'medium' : 'low';
    return {
      score: bestMatch.chemistry.score,
      matchedName: bestMatch.chemistry.name,
      confidence
    };
  }
  
  return null;
}

/**
 * Gets nearby scores for similar reactions (within ±1.5 score range)
 */
export function getNearbyScores(score: number): ChemistryScore[] {
  return CHEMISTRY_SCORES.filter(chem => 
    Math.abs(chem.score - score) <= 1.5 && chem.score !== score
  ).slice(0, 3); // Return top 3 similar scores
}

/**
 * Gets all chemistry scores for reference
 */
export function getAllChemistryScores(): ChemistryScore[] {
  return CHEMISTRY_SCORES;
}
