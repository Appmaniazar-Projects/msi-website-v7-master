const S3_BUCKET_URL = 'https://msi-resources.s3.af-south-1.amazonaws.com';
const CURRICULUM_BASE = 'MSI CURRICULUM MATERIAL';

interface S3PathConfig {
  subject: string;
  grade: number;
  category: string;
  filename: string;
}

export function generateS3Url({ subject, grade, category, filename }: S3PathConfig): string {
  // Ensure proper URL encoding for spaces and special characters
  const path = `${CURRICULUM_BASE}/${subject}/GRADE ${grade}/${category}/${filename}`;
  const encodedPath = encodeURIComponent(path).replace(/%2F/g, '/');
  return `${S3_BUCKET_URL}/${encodedPath}`;
}