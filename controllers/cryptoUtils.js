const crypto = require('crypto');
require('dotenv').config();

const key = crypto.createHash('sha256').update(process.env.SECRET_KEY || '').digest();

const encrypt = (text) => {
  const iv = crypto.randomBytes(16);
  
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(text, 'utf8');
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  
  const result = iv.toString('hex') + ':' + encrypted.toString('hex');
  return result;
};

const decrypt = (encryptedText) => {  
  if (!encryptedText || typeof encryptedText !== 'string') {
    throw new Error('Texto cifrado inválido');
  }
  
  const parts = encryptedText.split(':');
  if (parts.length !== 2) {
    throw new Error('Formato de texto cifrado inválido');
  }
 
  const iv = Buffer.from(parts[0], 'hex');
  const encrypted = Buffer.from(parts[1], 'hex');
  
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(encrypted);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  
  const result = decrypted.toString('utf8');
  return result;
};

const testEncryption = () => {
  const testText = '123456789101';
  try {
    const encrypted = encrypt(testText);
    const decrypted = decrypt(encrypted);
    console.log('✅ Prueba exitosa:', testText === decrypted);
    return true;
  } catch (error) {
    console.error('❌ Error en prueba:', error.message);
    return false;
  }
};

module.exports = { encrypt, decrypt, testEncryption };