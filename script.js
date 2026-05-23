document.addEventListener('DOMContentLoaded', () => {
    
    const daysDisplay = document.getElementById('days-left');
    const detailedDisplay = document.getElementById('detailed-left');
    const todayDisplay = document.getElementById('today-date');

    const targetDate = new Date(2028, 0, 15, 0, 0, 0);
    const dayOfWeekStr = ["日", "月", "火", "水", "木", "金", "土"];

    function updateCountdown() {
        const now = new Date();

        // 今日の日付と曜日を表示
        const y = now.getFullYear();
        const m = now.getMonth() + 1;
        const d = now.getDate();
        const w = dayOfWeekStr[now.getDay()];
        todayDisplay.textContent = `今日は：${y}年${m}月${d}日(${w})`;

        const difference = targetDate - now;

        if (difference <= 0) {
            daysDisplay.textContent = "0";
            detailedDisplay.textContent = "0年 0か月 0日";
            return;
        }

        // 総日数の計算
        const oneDayMs = 24 * 60 * 60 * 1000;
        const daysLeft = Math.ceil(difference / oneDayMs);
        daysDisplay.textContent = daysLeft;

        // 年月日の分解計算
        let currentYear = now.getFullYear();
        let currentMonth = now.getMonth();
        let currentDate = now.getDate();

        let years = targetDate.getFullYear() - currentYear;
        let months = targetDate.getMonth() - currentMonth;
        let days = targetDate.getDate() - currentDate;

        if (days < 0) {
            const daysInPreviousMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0).getDate();
            days += daysInPreviousMonth;
            months--;
        }
        if (months < 0) {
            months += 12;
            years--;
        }

        detailedDisplay.textContent = `${years}年 ${months}か月 ${days}日`;
    }

    updateCountdown();
    // 1分ごとに更新（日付が変わった時にすぐ反映されるように）
    setInterval(updateCountdown, 60000);
});