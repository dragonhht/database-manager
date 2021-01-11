package utils

import (
	"crypto/aes"
	"crypto/md5"
	"encoding/base64"
)

func AESEncrypt(src []byte, key []byte) (encrypted []byte) {
	cipher, _ := aes.NewCipher(generateKey(key))
	length := (len(src) + aes.BlockSize) / aes.BlockSize
	plain := make([]byte, length*aes.BlockSize)
	copy(plain, src)
	pad := byte(len(plain) - len(src))
	for i := len(src); i < len(plain); i++ {
		plain[i] = pad
	}
	encrypted = make([]byte, len(plain))

	for bs, be := 0, cipher.BlockSize(); bs <= len(src); bs, be = bs+cipher.BlockSize(), be+cipher.BlockSize() {
		cipher.Encrypt(encrypted[bs:be], plain[bs:be])
	}

	return encrypted
}

func AESDecrypt(encrypted []byte, key []byte) (decrypted []byte) {
	cipher, _ := aes.NewCipher(generateKey(key))
	decrypted = make([]byte, len(encrypted))
	for bs, be := 0, cipher.BlockSize(); bs < len(encrypted); bs, be = bs+cipher.BlockSize(), be+cipher.BlockSize() {
		cipher.Decrypt(decrypted[bs:be], encrypted[bs:be])
	}

	trim := 0
	if len(decrypted) > 0 {
		trim = len(decrypted) - int(decrypted[len(decrypted)-1])
	}

	return decrypted[:trim]
}

func generateKey(key []byte) (genKey []byte) {
	genKey = make([]byte, 16)
	copy(genKey, key)
	for i := 16; i < len(key); {
		for j := 0; j < 16 && i < len(key); j, i = j+1, i+1 {
			genKey[j] ^= key[i]
		}
	}
	return genKey
}

// 加密为base64
func EnAesCode(content []byte, key []byte) string {
	result := AESEncrypt(content, key)
	return base64.StdEncoding.EncodeToString(result)
}

// 从base64解密
func DeAesCode(content string, key []byte) ([]byte, error) {
	pwdByte, err := base64.StdEncoding.DecodeString(content)
	if err != nil {
		return nil, err
	}
	return AESDecrypt(pwdByte, key), nil
}

// Md5 Md5加密
func Md5(content []byte) []byte {
	m := md5.New()
	m.Write(content)
	return m.Sum(nil)
}
