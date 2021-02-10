import NodeRSA from 'node-rsa'

export default function encryptCreds({ noControl, password }, publicKey) {
	const key = new NodeRSA(publicKey)
	const controlNum = key.encrypt(noControl, 'base64')
	const controlPwd = key.encrypt(password, 'base64')
	return { controlNum, controlPwd }
}
