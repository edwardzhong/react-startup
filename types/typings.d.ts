declare module "*.html" {
	const content: string;
	export default content;
}

declare module 'blockly' {
	const content: { [key: string]: any };
	export = content;
}

interface Window {
	DeviceList: { [key: string]: any[] };
	Stage: { [key: string]: any };
	stageEvent: { [key: string]: any };
	StageEvent: { [key: string]: any };
	Sprite: { [key: string]: any };
	Rect: { [key: string]: any };
	ConnectBox: { [key: string]: any };
	ConnectServer: { [key: string]: any };
	Curtain: { [key: string]: any };
	Light: { [key: string]: any };
	sleep: (i: number) => void;
	updateSprite: (data: { [key: string]: any }) => void;
	connectStick: () => void;
	connectCamera: () => void;
	capture: () => string;
	disConnectCamera: () => void;
	screenShot: () => void;
	magicPen: () => void;
	logInfo: (info: { [key: string]: any }) => void;
	showError: (obj: any) => void;
	showSucc: (obj: any) => void;
	showWran: (obj: any) => void;
	loadScriptString: (id: string, code: string, type: string) => void;
}
