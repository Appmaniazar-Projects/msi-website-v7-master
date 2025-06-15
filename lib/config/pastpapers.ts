// lib/config/pastpapers.ts

const S3_BUCKET_URL = 'https://msi-resources.s3.af-south-1.amazonaws.com';
const PAST_PAPERS_BASE = 'MSI PAST PAPERS';

export const PAPER_TYPES = ['november', 'june', 'march', 'february', 'memo'] as const;

export interface S3PastPaperPath {
  subject: string;
  grade: number | string;
  category: string; // e.g., 'November Papers', 'Memos', etc.
  filename: string;
}

export function generatePastPaperUrl({
  subject,
  grade,
  category,
  filename,
}: S3PastPaperPath): string {
  const gradeStr = typeof grade === 'number' ? `Grade ${grade}` : `Grade ${grade.toUpperCase()}`;
  const fullPath = `${PAST_PAPERS_BASE}/${subject}/${gradeStr}/${category}/${filename}`;
  const encodedPath = encodeURIComponent(fullPath).replace(/%2F/g, '/');
  return `${S3_BUCKET_URL}/${encodedPath}`;
}
