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
    | "logout"
    | "bell"
    | "bell2"
    | "dream";

const sounds: Partial<Record<SoundKey, HTMLAudioElement>> = {};

export function initSounds() {

    const hover = new Audio("/sounds/hover.wav");
    hover.preload = "auto";
    hover.load();

    const blob = new Audio("/sounds/blob.wav");
    blob.preload = "auto";
    blob.load();

    const click = new Audio("/sounds/clickclick.wav");
    click.preload = "auto";
    click.load();

    const bookHover = new Audio("/sounds/bookHover.wav");
    bookHover.preload = "auto";
    bookHover.load();
    const error = new Audio("/sounds/error.wav");
    error.preload = "auto";
    error.load();

    const bookPick = new Audio("/sounds/bookPick.wav");
    bookPick.preload = "auto";
    bookPick.load();

    const bookClose = new Audio("/sounds/bookClose.wav");
    bookClose.preload = "auto";
    bookClose.load();

    const bookFlip = new Audio("/sounds/bookFlip.wav");
    bookFlip.preload = "auto";
    bookFlip.load();
    
    if (typeof window === "undefined") return;

    sounds.drum = new Audio("/sounds/drum.mp3")
    sounds.hover = hover;
    sounds.smallClick = new Audio("/sounds/click.wav")
    sounds.click = click;
    sounds.back = new Audio("/sounds/back.mp3");
    sounds.blob = blob;
    sounds.whosh = new Audio("/sounds/whosh.mp3");
    sounds.granted = new Audio("/sounds/granted.wav");
    sounds.granted2 = new Audio("/sounds/granted2.mp3");
    sounds.snap = new Audio("/sounds/snap.wav");
    sounds.bookHover = bookHover;
    sounds.bookPick = bookPick;
    sounds.bookClose = bookClose;
    sounds.bookFlip = bookFlip;
    sounds.accessDenied = new Audio("/sounds/accessDenied.wav");
    sounds.error = error;
    sounds.loading = new Audio("/sounds/loading.wav")
    sounds.loading2 = new Audio("/sounds/loading2.mp3")
    sounds.logout = new Audio("/sounds/logout.mp3")
    sounds.bell = new Audio("/sounds/bell.mp3")
    sounds.bell2 = new Audio("/sounds/bell-2.mp3")
    sounds.dream = new Audio("/sounds/dream.wav")

}

let soundEnabled = true;

export function setSoundEnabled(enabled: boolean) {
    soundEnabled = enabled;
}

export function playSound(key: SoundKey) {
    if (!soundEnabled) return;

    const sound = sounds[key];
    if (!sound) return;

    sound.currentTime = 0;
    sound.play().catch(() => { });
}
export function playSoundDelay(first: SoundKey, delay: number) {
    if (!soundEnabled) return;
    const sound = sounds[first];
    if (!sound) return;

    sound.currentTime = 0;

    setTimeout(() => {
        sound.play().catch(() => { });
    }, delay);
}

export function playSoundAt(key: SoundKey, volumn: number) {
    if (!soundEnabled) return;
    const sound = sounds[key];
    if (!sound) return;

    sound.currentTime = 0;
    sound.volume = volumn
    sound.play().catch(() => { });
}

export function playLoopSoundAt(key: SoundKey, delay: number, volumn: number) {
    if (!soundEnabled) return;
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
    if (!soundEnabled) return;
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
    if (!soundEnabled) return;
    const sound = sounds[key];
    if (!sound) return;

    sound.onended = null;
    sound.pause();
    sound.currentTime = 0;
}
