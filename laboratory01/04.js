const currentTime = () => {
    // I want to `npm i strftime` but it's not allowed :D

    const current = new Date();
    const hour = current.getHours();
    const minute = current.getMinutes();
    const second = current.getSeconds();
    const ampm = hour >= 12 ? "PM" : "AM";
    const hours = hour % 12;

    const hoursFormatted = hours ? hours : 12;
    const minutesFormatted = minute < 10 ? `0${minute}` : minute;
    const secondsFormatted = second < 10 ? `0${second}` : second;
    const dayFormatted = current.toLocaleDateString("en-US", {weekday: "long"});
    return (
        `Today is: ${dayFormatted}. ` +
        `Current time is: ${hoursFormatted}${ampm}:${minutesFormatted}:${secondsFormatted}`
    );
}


console.log(
    currentTime() // Today is: Tuesday. Current time is: 10PM:30:38
)
