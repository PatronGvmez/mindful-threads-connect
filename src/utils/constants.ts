
export const POST_CATEGORIES = [
  { value: 'gbv_trauma', label: 'Gender-Based Violence (GBV) Trauma' },
  { value: 'academic_stress', label: 'Academic Stress' },
  { value: 'suicidal_thoughts', label: 'Suicidal Thoughts' },
  { value: 'depression_anxiety', label: 'Depression and Anxiety' },
  { value: 'addiction_recovery', label: 'Addiction and Recovery' },
  { value: 'general_support', label: 'General Support' },
  { value: 'other', label: 'Other' },
] as const;

export type PostCategoryValue = typeof POST_CATEGORIES[number]['value'];

