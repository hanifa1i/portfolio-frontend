type SoundKey =
    | "drum"
    | "hover"
    | "click"
    | "back"
    | "blob"
    | "whosh"
    | "granted2"
    | "bookHover"
    | "bookPick"
    | "bookClose"
    | "bookFlip"
    | "accessDenied"
    | "error"
    | "loading2"
    | "logout"
    | "bell";

const sounds: Partial<Record<SoundKey, HTMLAudioElement>> = {};

export function initSounds() {
    if (typeof window === "undefined") return;

    const hover = new Audio("/sounds/hover.wav");
    hover.preload = "auto";
    hover.load();

    const blob = new Audio("/sounds/blob.wav");
    blob.preload = "auto";
    blob.load();

    const click = new Audio("/sounds/clickclick.wav");
    click.preload = "auto";
    click.load();

    const whosh = new Audio("/sounds/whosh.wav");
    whosh.preload = "auto";
    whosh.load();

    const drum = new Audio("/sounds/drum.wav");
    drum.preload = "auto";
    drum.load();

    const bookHover = new Audio("/sounds/bookHover.wav");
    bookHover.preload = "auto";
    bookHover.load();

    const bell = new Audio("/sounds/bell.wav");
    bell.preload = "auto";
    bell.load();

    const error = new Audio("/sounds/error.wav");
    error.preload = "auto";
    error.load();

    const back = new Audio("/sounds/back.wav");
    back.preload = "auto";
    back.load();

    const granted = new Audio("/sounds/granted.wav");
    granted.preload = "auto";
    granted.load();

    const loading = new Audio("/sounds/loading.wav");
    loading.preload = "auto";
    loading.load();

    const logout = new Audio("/sounds/logout.wav");
    logout.preload = "auto";
    logout.load();

    const accessDenied = new Audio("/sounds/accessDenied.wav");
    accessDenied.preload = "auto";
    accessDenied.load();

    const bookPick = new Audio("/sounds/bookPick.wav");
    bookPick.preload = "auto";
    bookPick.load();

    const bookClose = new Audio("/sounds/bookClose.wav");
    bookClose.preload = "auto";
    bookClose.load();

    const bookFlip = new Audio("/sounds/bookFlip.wav");
    bookFlip.preload = "auto";
    bookFlip.load();
    

    sounds.drum = drum;
    sounds.hover = hover;
    sounds.click = click;
    sounds.back = back;
    sounds.blob = blob;
    sounds.whosh = whosh;
    sounds.granted2 = granted;
    sounds.bookHover = bookHover;
    sounds.bookPick = bookPick;
    sounds.bookClose = bookClose;
    sounds.bookFlip = bookFlip;
    sounds.accessDenied = accessDenied;
    sounds.error = error;
    sounds.loading2 = loading;
    sounds.logout = logout
    sounds.bell = bell;
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
