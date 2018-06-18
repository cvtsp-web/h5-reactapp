
export default function camera(index=1) {
	const camera =plus.camera.getCamera(index);
	
	return {
		camera,
		captureImage: camera.captureImage,
		startVideoCapture: camera.startVideoCapture,
		stopVideoCapture: camera.stopVideoCapture
	}
}
