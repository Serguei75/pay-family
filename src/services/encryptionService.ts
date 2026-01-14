/**
 * Client-Side Encryption Service
 * AES-256-GCM for all sensitive data
 * NO data stored unencrypted
 * GDPR Compliant: Only user controls decryption key
 */

import { Document } from '../types.ts';

interface EncryptedData {
  ciphertext: string; // hex encoded
  iv: string; // hex encoded
  salt: string; // hex encoded
  tag: string; // hex encoded
}

const ALGORITHM = 'AES-GCM';
const KEY_LENGTH = 256; // bits
const ITERATIONS = 100000; // PBKDF2 iterations
const SALT_LENGTH = 16; // bytes
const IV_LENGTH = 12; // bytes
const TAG_LENGTH = 128; // bits

/**
 * Derive encryption key from password using PBKDF2
 */
async function deriveKey(
  password: string,
  salt: Uint8Array
): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const passwordKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      hash: 'SHA-256',
      iterations: ITERATIONS,
    },
    passwordKey,
    { name: ALGORITHM, length: KEY_LENGTH },
    false,
    ['encrypt', 'decrypt']
  );
}

/**
 * Encrypt data with AES-256-GCM
 */
export async function encryptData(
  data: string,
  password: string
): Promise<EncryptedData> {
  try {
    // Generate random salt and IV
    const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
    const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));

    // Derive encryption key
    const key = await deriveKey(password, salt);

    // Encrypt data
    const encoder = new TextEncoder();
    const encrypted = await crypto.subtle.encrypt(
      {
        name: ALGORITHM,
        iv,
      },
      key,
      encoder.encode(data)
    );

    // Extract tag (last 16 bytes)
    const encryptedArray = new Uint8Array(encrypted);
    const ciphertext = encryptedArray.slice(0, -TAG_LENGTH / 8);
    const tag = encryptedArray.slice(-TAG_LENGTH / 8);

    return {
      ciphertext: bufferToHex(ciphertext),
      iv: bufferToHex(iv),
      salt: bufferToHex(salt),
      tag: bufferToHex(tag),
    };
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt data');
  }
}

/**
 * Decrypt data with AES-256-GCM
 */
export async function decryptData(
  encryptedData: EncryptedData,
  password: string
): Promise<string> {
  try {
    // Convert hex strings back to buffers
    const salt = hexToBuffer(encryptedData.salt);
    const iv = hexToBuffer(encryptedData.iv);
    const ciphertext = hexToBuffer(encryptedData.ciphertext);
    const tag = hexToBuffer(encryptedData.tag);

    // Derive key
    const key = await deriveKey(password, salt);

    // Combine ciphertext and tag
    const combined = new Uint8Array(ciphertext.length + tag.length);
    combined.set(ciphertext);
    combined.set(tag, ciphertext.length);

    // Decrypt
    const decrypted = await crypto.subtle.decrypt(
      { name: ALGORITHM, iv },
      key,
      combined
    );

    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt data - wrong password or corrupted data');
  }
}

/**
 * Encrypt documents array
 */
export async function encryptDocuments(
  documents: Document[],
  password: string
): Promise<EncryptedData> {
  const jsonString = JSON.stringify(documents);
  return encryptData(jsonString, password);
}

/**
 * Decrypt documents array
 */
export async function decryptDocuments(
  encryptedData: EncryptedData,
  password: string
): Promise<Document[]> {
  const jsonString = await decryptData(encryptedData, password);
  return JSON.parse(jsonString);
}

/**
 * Store encrypted data in localStorage
 */
export async function storeEncryptedInLocalStorage(
  key: string,
  data: string,
  password: string
): Promise<void> {
  const encrypted = await encryptData(data, password);
  localStorage.setItem(key, JSON.stringify(encrypted));
}

/**
 * Retrieve encrypted data from localStorage
 */
export async function retrieveEncryptedFromLocalStorage(
  key: string,
  password: string
): Promise<string | null> {
  const stored = localStorage.getItem(key);
  if (!stored) return null;

  try {
    const encrypted = JSON.parse(stored) as EncryptedData;
    return decryptData(encrypted, password);
  } catch (error) {
    console.error('Failed to decrypt from localStorage:', error);
    return null;
  }
}

/**
 * Utility: Convert buffer to hex string
 */
function bufferToHex(buffer: Uint8Array): string {
  return Array.from(buffer)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Utility: Convert hex string to buffer
 */
function hexToBuffer(hex: string): Uint8Array {
  const buffer = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    buffer[i / 2] = parseInt(hex.substr(i, 2), 16);
  }
  return buffer;
}

/**
 * Generate secure random password for local storage
 */
export function generateSecurePassword(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return bufferToHex(array);
}

export const encryptionService = {
  encryptData,
  decryptData,
  encryptDocuments,
  decryptDocuments,
  storeEncryptedInLocalStorage,
  retrieveEncryptedFromLocalStorage,
  generateSecurePassword,
};
