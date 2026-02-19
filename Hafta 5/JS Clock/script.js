    let username = prompt("Lütfen adınızı girin");
    document.getElementById("myName").innerHTML = username;

    function showTime(){
        let date = new Date;
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        let days = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
        let d = days[date.getDay()];

        hour = (hour < 10) ? "0" + hour : hour;
        minute = (minute < 10) ? "0" + minute : minute;
        second = (second < 10) ? "0" + second : second;
        
        let totalTime = hour + ":" + minute + ":" + second + " "+ d;
        document.getElementById("myClock").innerHTML = totalTime;

        setTimeout(showTime, 1000);
    }

    showTime();