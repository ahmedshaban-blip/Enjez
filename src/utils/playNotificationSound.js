// src/utils/playNotificationSound.js
let audio;

export const playNotificationSound = () => {
    try {
        if (!audio) {
            audio = new Audio("/notification.mp3");
        }

        audio.currentTime = 0;
        audio
            .play()
            .then(() => {
                console.log("[sound] playback started");
            })
            .catch((err) => {
                console.error("[sound] play() failed:", err);
            });
    } catch (err) {
        console.error("[sound] Error playing notification sound:", err);
    }
};
