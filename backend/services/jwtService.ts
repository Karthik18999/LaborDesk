/**
 * JWT Authentication Service (HMAC SHA-256 Web Crypto API)
 * Next.js Edge & Node.js production-ready JSON Web Token generator & validator.
 */

const JWT_SECRET = process.env.JWT_SECRET || 'labordesk_enterprise_jwt_secret_key_2026_secure';

export interface JwtPayload {
  userId?: string;
  email: string;
  role: 'admin' | 'company';
  name: string;
  companyName?: string;
  iat?: number;
  exp?: number;
}

function base64UrlEncode(str: string): string {
  const base64 = btoa(str);
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return atob(base64);
}

async function getHmacKey(secret: string): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

/**
 * Sign a new JWT token for authenticated users
 * Default expiration: 24 Hours (86,400 seconds)
 */
export async function signJwtToken(payload: Omit<JwtPayload, 'iat' | 'exp'>, expiresInSeconds = 86400): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const fullPayload: JwtPayload = {
    ...payload,
    iat: now,
    exp: now + expiresInSeconds,
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(fullPayload));
  const dataToSign = `${encodedHeader}.${encodedPayload}`;

  const key = await getHmacKey(JWT_SECRET);
  const encoder = new TextEncoder();
  const signatureBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(dataToSign));
  
  const signatureArray = Array.from(new Uint8Array(signatureBuffer));
  const binaryString = signatureArray.map((byte) => String.fromCharCode(byte)).join('');
  const encodedSignature = base64UrlEncode(binaryString);

  return `${dataToSign}.${encodedSignature}`;
}

/**
 * Verify and decode an incoming JWT token
 */
export async function verifyJwtToken(token: string): Promise<{ valid: boolean; payload?: JwtPayload; error?: string }> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return { valid: false, error: 'Malformed JWT token string structure' };
    }

    const [encodedHeader, encodedPayload, encodedSignature] = parts;
    const dataToSign = `${encodedHeader}.${encodedPayload}`;

    const key = await getHmacKey(JWT_SECRET);
    const encoder = new TextEncoder();
    
    const signatureBinary = base64UrlDecode(encodedSignature);
    const signatureUint8 = new Uint8Array(signatureBinary.length);
    for (let i = 0; i < signatureBinary.length; i++) {
      signatureUint8[i] = signatureBinary.charCodeAt(i);
    }

    const isValidSignature = await crypto.subtle.verify(
      'HMAC',
      key,
      signatureUint8,
      encoder.encode(dataToSign)
    );

    if (!isValidSignature) {
      return { valid: false, error: 'Invalid JWT signature signature check failed' };
    }

    const payload: JwtPayload = JSON.parse(base64UrlDecode(encodedPayload));
    const now = Math.floor(Date.now() / 1000);

    if (payload.exp && payload.exp < now) {
      return { valid: false, error: 'JWT token has expired' };
    }

    return { valid: true, payload };
  } catch (err) {
    return { valid: false, error: 'Failed to parse or verify JWT token' };
  }
}
