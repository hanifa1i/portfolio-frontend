type SoundKey =
    | "drum"
    | "hover"
    | "smallClick"
    | "click"
    | "back"
    | "blob"
    | "whosh"
    | "granted"
    | "granted2"
    | "snap"
    | "bookHover"
    | "bookPick"
    | "bookClose"
    | "bookFlip"
    | "accessDenied"
    | "error"
    | "loading"
    | "loading2"
    | "logout";

const sounds: Partial<Record<SoundKey, HTMLAudioElement>> = {};

export function initSounds() {
    if (typeof window === "undefined") return;

    sounds.drum = new Audio("/sounds/drum.mp3")
    sounds.hover = new Audio("/sounds/hover4.mp3");
    sounds.smallClick = new Audio("/sounds/click.wav")
    sounds.click = new Audio("/sounds/clickclick.mp3");
    sounds.back = new Audio("/sounds/back.mp3");
    sounds.blob = new Audio("/sounds/blob.mp3");
    sounds.whosh = new Audio("/sounds/whosh.mp3");
    sounds.granted = new Audio("/sounds/granted.wav");
    sounds.granted2 = new Audio("/sounds/granted2.mp3");
    sounds.snap = new Audio("/sounds/snap.wav");
    sounds.bookHover = new Audio("/sounds/bookHover.wav");
    sounds.bookPick = new Audio("/sounds/bookPick.wav");
    sounds.bookClose = new Audio("/sounds/bookClose.wav");
    sounds.bookFlip = new Audio("/sounds/bookFlip.wav");
    sounds.accessDenied = new Audio("/sounds/accessDenied.wav");
    sounds.error = new Audio("/sounds/error.mp3");
    sounds.loading = new Audio("/sounds/loading.wav")
    sounds.loading2 = new Audio("/sounds/loading2.mp3")
    sounds.logout = new Audio("/sounds/logout.mp3")
}

export function playSound(key: SoundKey) {
    const sound = sounds[key];
    if (!sound) return;

    sound.currentTime = 0;
    sound.play().catch(() => { });
}

export function playSoundAt(key: SoundKey, volumn: number) {
    const sound = sounds[key];
    if (!sound) return;

    sound.currentTime = 0;
    sound.volume = volumn
    sound.play().catch(() => { });
}

export function playLoopSoundAt(key: SoundKey, delay: number, volumn: number) {
    const sound = sounds[key];
    if (!sound) return;

    sound.currentTime = 0;
    sound.volume = volumn
    const playAgain = () => {
        setTimeout(() => {
            sound.currentTime = 0;
            sound.play().catch(() => { });
        }, delay);
    };

    sound.onended = playAgain;
    sound.play().catch(() => { });
}

export function playSequential(first: SoundKey, second: SoundKey, delay: number) {
    const sound = sounds[first];
    if (!sound) return;

    sound.currentTime = 0;

    sound.onended = () => {
        setTimeout(() => {
            playSound(second);
        }, delay);
    };
    sound.play();
}

export function stopSound(key: SoundKey) {
    const sound = sounds[key];
    if (!sound) return;

    sound.onended = null;
    sound.pause();
    sound.currentTime = 0;
}
